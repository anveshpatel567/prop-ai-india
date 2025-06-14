
import { supabase } from "@/lib/supabaseClient";
import { ResumeUploadRow } from "../types/index";

export function useResumeParse() {
  async function parseResume(resumeId: string): Promise<ResumeUploadRow> {
    const { data, error } = await supabase.functions.invoke("parse-resume", {
      body: { resumeId }
    });
    if (error || !data) throw new Error(error?.message || "Parsing failed");
    return data as ResumeUploadRow;
  }
  return { parseResume };
}
