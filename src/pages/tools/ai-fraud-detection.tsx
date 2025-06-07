
import React from 'react';
import { FraudFlaggingPanel } from '@/components/ai/FraudFlaggingPanel';

export default function AiFraudDetectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Fraud Detection</h1>
          <p className="text-gray-600">
            Use AI to identify and flag potentially fraudulent property listings
          </p>
        </div>

        <FraudFlaggingPanel />
      </div>
    </div>
  );
}
