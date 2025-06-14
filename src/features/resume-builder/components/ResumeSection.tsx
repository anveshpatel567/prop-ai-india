
import React from "react";
type ResumeSectionProps = { section: string; content: string; };
export function ResumeSection({ section, content }: ResumeSectionProps): JSX.Element {
  return (
    <div className="mb-2">
      <div className="text-xs font-medium text-[#ff4500]">{section}</div>
      <div className="bg-[#fff7f0] rounded p-2 text-sm">{content}</div>
    </div>
  );
}
