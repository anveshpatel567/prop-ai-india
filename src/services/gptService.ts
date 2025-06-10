
interface GptResponse {
  success: boolean;
  content: string;
  error?: string;
}

const getApiKey = (): string | null => {
  // Check for environment variable
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  // Development mode logging
  if (import.meta.env.DEV) {
    console.log('🔧 DEVELOPMENT MODE - GPT API Key Check:', apiKey ? 'Found ✅' : 'Missing ❌');
    if (!apiKey) {
      console.warn('⚠️ GPT API key missing - Add VITE_OPENAI_API_KEY to .env file');
    }
  }
  
  if (!apiKey) {
    console.warn('⚠️ OpenAI GPT API key missing. Add VITE_OPENAI_API_KEY to .env file');
    return null;
  }
  
  return apiKey;
};

export async function fetchGpt4oResponse(prompt: string): Promise<GptResponse> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    const errorMessage = '⚠️ GPT API key not set. Please add VITE_OPENAI_API_KEY to your .env file.';
    
    // Development mode - show detailed error
    if (import.meta.env.DEV) {
      console.error('🚨 DEVELOPMENT MODE - GPT API Key Missing:', {
        prompt: prompt.substring(0, 50) + '...',
        env: import.meta.env.MODE,
        key_present: !!import.meta.env.VITE_OPENAI_API_KEY
      });
    }
    
    return {
      success: false,
      content: errorMessage,
      error: 'Missing OpenAI API key'
    };
  }

  try {
    // Development mode - log request details
    if (import.meta.env.DEV) {
      console.log('🔧 DEVELOPMENT MODE - GPT Request:', {
        model: 'gpt-4o-mini',
        prompt_length: prompt.length,
        api_key_present: true
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using gpt-4o-mini as it's faster and more cost-effective
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant for a real estate platform.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      // Development mode - detailed error logging
      if (import.meta.env.DEV) {
        console.error('🚨 DEVELOPMENT MODE - GPT API Error:', {
          status: response.status,
          error: errorData,
          prompt: prompt.substring(0, 50) + '...'
        });
      }
      
      return {
        success: false,
        content: 'AI service temporarily unavailable',
        error: `API responded with ${response.status}: ${errorData.error?.message || 'Unknown error'}`
      };
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    
    if (!content) {
      return {
        success: false,
        content: 'No response from AI',
        error: 'Empty response from OpenAI'
      };
    }

    // Development mode - log successful response
    if (import.meta.env.DEV) {
      console.log('✅ DEVELOPMENT MODE - GPT Response Success:', {
        response_length: content.length,
        tokens_used: data.usage?.total_tokens || 'unknown'
      });
    }

    return {
      success: true,
      content: content.trim()
    };
  } catch (err) {
    console.error('GPT API call failed:', err);
    
    // Development mode - detailed error logging
    if (import.meta.env.DEV) {
      console.error('🚨 DEVELOPMENT MODE - GPT Network Error:', {
        error: err instanceof Error ? err.message : 'Unknown error',
        prompt: prompt.substring(0, 50) + '...'
      });
    }
    
    return {
      success: false,
      content: 'AI temporarily unavailable',
      error: err instanceof Error ? err.message : 'Unknown error'
    };
  }
}

export async function testGptConnection(): Promise<boolean> {
  const result = await fetchGpt4oResponse('Say "Hello, API is working!" if you can read this.');
  
  // Development mode - log connection test result
  if (import.meta.env.DEV) {
    console.log('🔧 DEVELOPMENT MODE - GPT Connection Test:', result.success ? 'PASSED ✅' : 'FAILED ❌');
  }
  
  return result.success;
}

export function isApiKeyConfigured(): boolean {
  const hasKey = !!import.meta.env.VITE_OPENAI_API_KEY;
  
  // Development mode - log key status
  if (import.meta.env.DEV) {
    console.log('🔧 DEVELOPMENT MODE - API Key Status:', hasKey ? 'Configured ✅' : 'Missing ❌');
  }
  
  return hasKey;
}
