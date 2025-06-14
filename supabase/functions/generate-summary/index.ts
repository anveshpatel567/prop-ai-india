
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { resumeId } = await req.json();
    // TODO: fetch extracted_text from resume_uploads, call OpenAI, create summary row
    const summary = "Sample GPT summary of the resume.";
    const response = {
      id: "mock-id",
      resume_id: resumeId,
      user_id: "mock-user",
      summary,
      status: "completed",
      error_message: null,
      credits_used: 50,
      created_at: new Date().toISOString(),
    };
    return new Response(JSON.stringify(response), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
