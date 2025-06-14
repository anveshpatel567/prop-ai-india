
import React from "react";
type ResumeStatBoxProps = { label: string; value: string };
export function ResumeStatBox({ label, value }: ResumeStatBoxProps): JSX.Element {
  return (
    <div className="bg-orange-100 rounded px-4 py-1 text-xs font-medium mr-2">{label}: <span className="text-gray-900">{value}</span></div>
  );
}
