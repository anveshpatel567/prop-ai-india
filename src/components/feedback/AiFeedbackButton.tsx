
import React, { useState } from 'react';
import { usePersonalizationFeedback } from '@/hooks/usePersonalizationFeedback';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { useMountReady } from '@/hooks/useMountReady';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AiFeedbackButtonProps {
  featureName: string;
  variant?: 'outline' | 'ghost';
}

export default function AiFeedbackButton({ featureName, variant = 'outline' }: AiFeedbackButtonProps) {
  const isReady = useMountReady();
  const { user } = useAuth();
  const { submitFeedback, loading } = usePersonalizationFeedback();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'positive' | 'negative' | 'neutral' | null>(null);
  const [notes, setNotes] = useState('');

  // Don't render until mounted and user is available
  if (!isReady || !user) return null;

  const handleSubmit = async () => {
    if (!user?.id || !selectedType) return;

    await submitFeedback(user.id, featureName, selectedType, notes);
    setIsOpen(false);
    setSelectedType(null);
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size="sm">
          💭 Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Feature Feedback</DialogTitle>
          <DialogDescription>
            Help us improve the {featureName} feature with your feedback
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How was your experience?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 justify-center">
              <Button
                variant={selectedType === 'positive' ? 'default' : 'outline'}
                onClick={() => setSelectedType('positive')}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                Positive
              </Button>
              <Button
                variant={selectedType === 'neutral' ? 'default' : 'outline'}
                onClick={() => setSelectedType('neutral')}
                className="flex items-center gap-2"
              >
                <Minus className="h-4 w-4" />
                Neutral
              </Button>
              <Button
                variant={selectedType === 'negative' ? 'default' : 'outline'}
                onClick={() => setSelectedType('negative')}
                className="flex items-center gap-2"
              >
                <ThumbsDown className="h-4 w-4" />
                Negative
              </Button>
            </div>
            
            <Textarea
              placeholder="Tell us more about your experience (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedType || loading}
              >
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
