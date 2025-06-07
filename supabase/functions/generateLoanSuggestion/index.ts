
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { income_monthly, tenure_years, interest_rate } = await req.json();
    
    console.log('Received loan optimization request:', { income_monthly, tenure_years, interest_rate });

    // Calculate EMI and loan amount using standard formula
    const monthlyRate = interest_rate / 100 / 12;
    const totalMonths = tenure_years * 12;
    const maxEMI = Math.floor(income_monthly * 0.5); // 50% of income as max EMI
    
    // Calculate maximum loan amount based on EMI formula
    // EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
    // Rearranging: P = EMI × [(1+R)^N - 1] / [R × (1+R)^N]
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const maxLoanAmount = Math.floor(maxEMI * (factor - 1) / (monthlyRate * factor));
    
    console.log('Calculated loan details:', { maxEMI, maxLoanAmount });

    let suggestion = "Based on your financial profile, this appears to be a suitable loan structure.";
    
    // Generate AI suggestion if OpenAI key is available
    if (openAIApiKey) {
      try {
        const aiPrompt = `As a financial advisor, provide a brief home loan suggestion for someone with:
- Monthly Income: ₹${income_monthly.toLocaleString()}
- Loan Tenure: ${tenure_years} years
- Interest Rate: ${interest_rate}%
- Calculated Max EMI: ₹${maxEMI.toLocaleString()}
- Calculated Max Loan Amount: ₹${maxLoanAmount.toLocaleString()}

Give practical advice about down payment, loan amount optimization, and financial planning in 2-3 sentences.`;

        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a helpful financial advisor specializing in home loans in India. Provide practical, actionable advice.' },
              { role: 'user', content: aiPrompt }
            ],
            max_tokens: 200,
          }),
        });

        const aiData = await aiResponse.json();
        if (aiData.choices && aiData.choices[0]) {
          suggestion = aiData.choices[0].message.content;
        }
      } catch (aiError) {
        console.error('AI generation error:', aiError);
      }
    }

    // Get user ID from auth header
    const authHeader = req.headers.get('authorization');
    let userId = null;
    
    if (authHeader) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const token = authHeader.replace('Bearer ', '');
      const { data: userData } = await supabase.auth.getUser(token);
      userId = userData.user?.id;
    }

    const result = {
      id: crypto.randomUUID(),
      income_monthly,
      tenure_years,
      interest_rate,
      loan_amount: maxLoanAmount,
      emi: maxEMI,
      suggestion,
      created_at: new Date().toISOString()
    };

    // Save to database if user is authenticated
    if (userId) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase
        .from('ai_loan_queries')
        .insert({
          user_id: userId,
          income_monthly,
          tenure_years,
          interest_rate,
          loan_amount: maxLoanAmount,
          emi: maxEMI,
          suggestion
        });
    }

    console.log('Loan optimization completed successfully');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generateLoanSuggestion function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
