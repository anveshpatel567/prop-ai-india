
import React from "react";

export function ResumeBuilderLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="bg-gradient-to-br from-white via-orange-50 to-purple-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}
