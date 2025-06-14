
import React from "react";
type SummaryCardProps = { summary: string };
export function SummaryCard({ summary }: SummaryCardProps): JSX.Element {
  return (
    <div className="bg-purple-50 rounded p-4 border text-[#2d0000] shadow">
      <h3 className="font-semibold mb-2 text-[#4a148c] text-base">AI Resume Summary</h3>
      <div className="whitespace-pre-line text-sm">{summary}</div>
    </div>
  );
}
