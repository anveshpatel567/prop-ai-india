
import { supabase } from "@/lib/supabaseClient";
import { ResumeSummaryRow } from "../types/index";

export function useResumeSummary() {
  async function generateSummary(resumeId: string): Promise<ResumeSummaryRow> {
    const { data, error } = await supabase.functions.invoke("generate-summary", {
      body: { resumeId }
    });
    if (error || !data) throw new Error(error?.message || "Summary failed");
    return data as ResumeSummaryRow;
  }
  return { generateSummary };
}
