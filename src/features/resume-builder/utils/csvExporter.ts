
import type { ResumeUploadRow } from "../types/index";

export function exportResumesToCsv(resumes: ResumeUploadRow[], filename = "resumes.csv"): void {
  const header = ["file_name", "status", "created_at"];
  const rows = resumes.map(resume =>
    [resume.file_name, resume.status, resume.created_at].map(v => `"${v ?? ""}"`).join(",")
  );
  const csvString = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
