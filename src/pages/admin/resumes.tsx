
import React from "react";
import { AdminResumeReviewPanel } from "@/features/resume-builder/AdminResumeReviewPanel";
import { AdminSummaryReviewPanel } from "@/features/resume-builder/AdminSummaryReviewPanel";

export default function AdminResumePage(): JSX.Element {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Resume Management (Admin)</h1>
      <AdminResumeReviewPanel />
      <div className="mt-8" />
      <AdminSummaryReviewPanel />
    </div>
  );
}
