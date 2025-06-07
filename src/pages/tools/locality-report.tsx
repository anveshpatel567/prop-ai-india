
import React from 'react';
import { useLocalityReport } from '@/hooks/useLocalityReport';
import LocalityReportForm from '@/components/locality/LocalityReportForm';
import LocalityReportPreview from '@/components/locality/LocalityReportPreview';

export default function LocalityReportPage() {
  const { data } = useLocalityReport();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            📍 AI Locality Report Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get comprehensive AI-powered insights about any locality including infrastructure, amenities, market trends, and growth potential.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <LocalityReportForm />
          
          {data && (
            <LocalityReportPreview report={data} />
          )}
        </div>
      </div>
    </div>
  );
}
