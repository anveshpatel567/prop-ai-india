
import React from 'react';
import { TitleChainVisualizer } from '@/components/ai/TitleChainVisualizer';

export default function TitleChainPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Title Chain Visualizer</h1>
          <p className="text-gray-600">
            Generate visual representations of property title chains using AI
          </p>
        </div>

        <TitleChainVisualizer />
      </div>
    </div>
  );
}
