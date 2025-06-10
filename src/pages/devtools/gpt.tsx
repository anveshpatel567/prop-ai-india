
import React from 'react';
import { GptApiTester } from '@/components/devtools/GptApiTester';

const DevtoolsGpt: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">GPT API Development Tools</h1>
        <GptApiTester />
      </div>
    </div>
  );
};

export default DevtoolsGpt;
