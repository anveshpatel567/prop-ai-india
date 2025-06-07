
import React from 'react';
import { Lightbulb, BarChart } from 'lucide-react';

export function AiInsightsSection(): JSX.Element {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-cyan-500" />
          <h2 className="text-xl font-semibold">Developer AI Summary</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Get a comprehensive overview of AI system performance, usage patterns, and technical metrics.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="/admin/developer-ai-summary"
            className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-md hover:bg-cyan-100 transition"
          >
            View Summary
          </a>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center gap-2 mb-4">
          <BarChart className="h-5 w-5 text-slate-500" />
          <h2 className="text-xl font-semibold">AI Insights & Oversight</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Monitor AI system health, debug logs, and trust feedback in real-time.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="/admin/ai-insights"
            className="px-4 py-2 bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 transition"
          >
            View AI Insights
          </a>
        </div>
      </div>
    </>
  );
}
