
import React from "react";
import type { ResumePreviewPanelProps } from "./types/index";
import { ResumeSection } from "./components/ResumeSection";
import { ResumeStatBox } from "./components/ResumeStatBox";

export function ResumePreviewPanel({ resume }: ResumePreviewPanelProps): JSX.Element {
  if (!resume) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <div className="mb-2 flex gap-4">
        <ResumeStatBox label="File Name" value={resume.file_name} />
        <ResumeStatBox label="Status" value={resume.status} />
      </div>
      {resume.extracted_text ? (
        <ResumeSection
          section="Resume Text"
          content={resume.extracted_text}
        />
      ) : (
        <div className="text-sm text-muted-foreground">No resume text extracted.</div>
      )}
    </div>
  );
}
