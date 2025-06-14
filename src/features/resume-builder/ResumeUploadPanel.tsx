
import React from "react";
import type { ResumeUploadPanelProps } from "./types/index";
import { FileDropzone } from "@/components/ui/FileDropzone";
import { Button } from "@/components/ui/button";
import { ErrorBox } from "@/components/ui/ErrorBox";
import { useResumeUpload } from "./hooks/useResumeUpload";

export function ResumeUploadPanel({ onUploaded }: ResumeUploadPanelProps): JSX.Element {
  const { uploading, error, handleUpload } = useResumeUpload({ onUploaded });

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <h2 className="text-lg font-semibold mb-2 text-[#2d0000]">Upload Resume File</h2>
      <FileDropzone
        accept={[".pdf", ".doc", ".docx", ".txt"]}
        disabled={uploading}
        onDrop={handleUpload}
      />
      {error && <ErrorBox message={error} />}
      <p className="text-xs text-muted-foreground mt-3">
        Supported: PDF, DOC, DOCX, TXT. Max 5MB.
      </p>
    </div>
  );
}
