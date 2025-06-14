
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ResumeUploadRow } from "./types/index";
import { ResumeSection } from "./components/ResumeSection";

export function AdminResumeReviewPanel(): JSX.Element {
  const [rows, setRows] = useState<ResumeUploadRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.from("resume_uploads")
      .select("*")
      .then(({ data }) => {
        setRows((data as ResumeUploadRow[]) || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!rows.length) return <div>No resumes found.</div>;
  return (
    <div>
      <h2 className="font-bold mb-3">Resume Uploads (Admin View)</h2>
      {rows.map((row) => (
        <div key={row.id} className="bg-white border rounded p-3 mb-3 shadow">
          <ResumeSection section="File Name" content={row.file_name} />
          <ResumeSection section="Status" content={row.status} />
          <ResumeSection section="Extracted Text" content={row.extracted_text || "-"} />
        </div>
      ))}
    </div>
  );
}
