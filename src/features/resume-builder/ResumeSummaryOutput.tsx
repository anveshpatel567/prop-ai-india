
import React from "react";
import type { ResumeSummaryOutputProps } from "./types/index";
import { SummaryCard } from "./components/SummaryCard";

export function ResumeSummaryOutput({ summary, status, error }: ResumeSummaryOutputProps): JSX.Element {
  if (status === "loading") {
    return <div className="text-center text-muted-foreground">Generating summary...</div>;
  }
  if (status === "error" && error) {
    return <div className="p-2 bg-red-50 text-red-600 rounded">{error}</div>;
  }
  if (summary) {
    return <SummaryCard summary={summary} />;
  }
  return <div className="text-muted-foreground text-center">No summary generated yet.</div>;
}
