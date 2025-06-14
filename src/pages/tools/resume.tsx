
import React from "react";
import { ResumeBuilderMain } from "@/features/resume-builder/ResumeBuilderMain";

const ResumeToolsPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-purple-50 py-8 px-2">
    <div className="max-w-2xl mx-auto">
      <ResumeBuilderMain />
    </div>
  </div>
);

export default ResumeToolsPage;
