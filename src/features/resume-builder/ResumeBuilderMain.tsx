
import React, { useState } from "react";
import type { ResumeUploadRow, ResumeSummaryRow } from "./types/index";
import { ResumeUploadPanel } from "@/features/resume-builder/ResumeUploadPanel";
import { ResumePreviewPanel } from "@/features/resume-builder/ResumePreviewPanel";
import { ResumeSummaryOutput } from "@/features/resume-builder/ResumeSummaryOutput";
import { useResumeParse } from "./hooks/useResumeParse";
import { useResumeSummary } from "./hooks/useResumeSummary";
import { Button } from "@/components/ui/button";

export function ResumeBuilderMain(): JSX.Element {
  const [uploaded, setUploaded] = useState<ResumeUploadRow | null>(null);
  const [parsed, setParsed] = useState<ResumeUploadRow | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [parseStatus, setParseStatus] = useState<"idle"|"loading"|"done"|"error">("idle");
  const [summaryStatus, setSummaryStatus] = useState<"idle"|"loading"|"done"|"error">("idle");
  const [parseError, setParseError] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const { parseResume } = useResumeParse();
  const { generateSummary } = useResumeSummary();

  const handleUpload = (resume: ResumeUploadRow) => {
    setUploaded(resume);
    setParsed(null);
    setSummary(null);
    setParseStatus("idle");
    setSummaryStatus("idle");
    setParseError(null);
    setSummaryError(null);
  };

  async function onParseClick() {
    if (!uploaded) return;
    setParseStatus("loading");
    setParseError(null);
    try {
      const parsed = await parseResume(uploaded.id);
      setParsed(parsed);
      setParseStatus("done");
    } catch (err) {
      setParseError((err as Error).message);
      setParseStatus("error");
    }
  }

  async function onSummarizeClick() {
    if (!parsed) return;
    setSummaryStatus("loading");
    setSummaryError(null);
    try {
      const summary = await generateSummary(parsed.id);
      setSummary(summary?.summary || null);
      setSummaryStatus("done");
    } catch (err) {
      setSummaryError((err as Error).message);
      setSummaryStatus("error");
    }
  }

  return (
    <div>
      <ResumeUploadPanel onUploaded={handleUpload} />
      {uploaded && (
        <>
          <ResumePreviewPanel resume={parsed ?? uploaded} />
          <div className="flex gap-2 mb-4">
            <Button onClick={onParseClick} disabled={parseStatus==="loading"}>Parse Resume</Button>
            <Button onClick={onSummarizeClick} disabled={!parsed || summaryStatus==="loading"}>
              Generate AI Summary
            </Button>
          </div>
          <ResumeSummaryOutput
            summary={summary}
            status={summaryStatus}
            error={summaryError}
          />
        </>
      )}
    </div>
  );
}
