
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ResumeSummaryRow } from "./types/index";
import { SummaryCard } from "./components/SummaryCard";

export function AdminSummaryReviewPanel(): JSX.Element {
  const [rows, setRows] = useState<ResumeSummaryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("resume_summaries")
      .select("*")
      .then(({ data }) => {
        setRows((data as ResumeSummaryRow[]) || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!rows.length) return <div>No summaries found.</div>;
  return (
    <div>
      <h2 className="font-bold mb-3">AI Resume Summaries (Admin View)</h2>
      {rows.map((row) => (
        <div key={row.id} className="bg-white border rounded p-3 mb-3 shadow">
          <SummaryCard summary={row.summary} />
          <div className="text-sm mt-2">Credits: {row.credits_used}</div>
          <div className="text-xs text-muted-foreground mb-2">Status: {row.status}</div>
        </div>
      ))}
    </div>
  );
}
