
import React from 'react';
import { BrochureMatchSuggestions } from '@/components/ai/BrochureMatchSuggestions';

export default function BrochureMatcherPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Brochure Matcher</h1>
          <p className="text-gray-600">
            Upload property brochures and get AI-powered matching suggestions
          </p>
        </div>

        <BrochureMatchSuggestions />
      </div>
    </div>
  );
}
