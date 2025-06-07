
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function AiPromptTuningLogPanel(): JSX.Element {
  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-bold text-orange-600 mb-2">Prompt Tuning Logs</h2>
        <p className="text-sm text-gray-500">Detailed tuning history of GPT prompts will appear here.</p>
      </CardContent>
    </Card>
  );
}
