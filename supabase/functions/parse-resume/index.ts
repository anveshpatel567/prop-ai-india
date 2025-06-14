
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
    // TODO: Fetch resume file_url from DB, download file, parse to text (pdf/doc/txt parser libs)
    // For now, mock extracted text:
    const extracted_text = "Parsed text of the resume file (this should be set by real parser).";
    // TODO: update resume_uploads with extracted_text
    // Here, just return the mock structure:
    const parsed = {
      id: resumeId,
      user_id: "mock",
      file_url: "mock",
      extracted_text,
      file_name: "mock.pdf",
      status: "parsed",
      error_message: null,
      created_at: new Date().toISOString(),
    };
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
