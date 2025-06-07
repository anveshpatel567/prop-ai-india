
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TitleChainEvent } from '@/hooks/useTitleChain';
import { Clock, FileText } from 'lucide-react';

interface TitleChainTimelineProps {
  events: TitleChainEvent[];
}

export default function TitleChainTimeline({ events }: TitleChainTimelineProps) {
  if (events.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No title chain events found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-500" />
          <CardTitle>Property Title Chain Timeline</CardTitle>
        </div>
        <CardDescription>
          Chronological history of property ownership and legal events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative">
              {index < events.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200" />
              )}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{event.event_label}</h3>
                    <Badge variant="outline">
                      {new Date(event.event_date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
