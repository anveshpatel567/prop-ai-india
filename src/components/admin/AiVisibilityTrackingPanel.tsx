
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function AiVisibilityTrackingPanel(): JSX.Element {
  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-bold text-orange-600 mb-2">AI Visibility Tracking</h2>
        <p className="text-sm text-gray-500">Track how AI panels are being viewed or interacted with.</p>
      </CardContent>
    </Card>
  );
}
