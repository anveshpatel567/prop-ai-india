
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useCreditGate } from '@/context/CreditGateContext';
import { useWallet } from '@/context/WalletContext';
import { supabase } from '@/integrations/supabase/client';

interface QualitySuggestion {
  field: string;
  current_value: string;
  suggested_value: string;
  reason: string;
  confidence: number;
}

interface QualityEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingData: any;
  onApplySuggestions: (suggestions: QualitySuggestion[]) => void;
}

export const QualityEnhancerModal: React.FC<QualityEnhancerModalProps> = ({
  isOpen,
  onClose,
  listingData,
  onApplySuggestions
}) => {
  const [suggestions, setSuggestions] = useState<QualitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  
  const { checkToolAccess, logToolAttempt } = useCreditGate();
  const { deductCredits } = useWallet();

  const generateSuggestions = async () => {
    const access = checkToolAccess('quality_enhancer');
    await logToolAttempt('quality_enhancer', access.canAccess);

    if (!access.canAccess) {
      alert(access.reason);
      return;
    }

    setLoading(true);
    try {
      const success = await deductCredits(access.creditsRequired, 'Quality Enhancer');
      if (!success) {
        throw new Error('Failed to deduct credits');
      }

      const { data, error } = await supabase.functions.invoke('ai/quality-enhancer', {
        body: { listing_data: listingData }
      });

      if (error) throw error;

      setSuggestions(data.suggestions || []);

      // Log the enhancement
      await supabase.from('ai_quality_suggestions').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        listing_id: listingData.id,
        original_data: listingData,
        suggestions: data.suggestions,
        credits_used: access.creditsRequired
      });

    } catch (error) {
      console.error('Quality enhancement failed:', error);
      alert('Quality enhancement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSuggestion = (field: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const applySuggestions = () => {
    const selectedSuggestionData = suggestions.filter(s => 
      selectedSuggestions.includes(s.field)
    );
    onApplySuggestions(selectedSuggestionData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Quality Enhancement Suggestions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div className="text-center py-8">
              <Button 
                onClick={generateSuggestions}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? 'Analyzing...' : 'Generate AI Suggestions (100 Credits)'}
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium capitalize">{suggestion.field.replace('_', ' ')}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {Math.round(suggestion.confidence * 100)}% confidence
                        </Badge>
                        <Button
                          size="sm"
                          variant={selectedSuggestions.includes(suggestion.field) ? "default" : "outline"}
                          onClick={() => toggleSuggestion(suggestion.field)}
                        >
                          {selectedSuggestions.includes(suggestion.field) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-600 mb-1">Current:</p>
                        <p className="bg-gray-50 p-2 rounded">{suggestion.current_value}</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-600 mb-1">Suggested:</p>
                        <p className="bg-green-50 p-2 rounded">{suggestion.suggested_value}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Reason:</strong> {suggestion.reason}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={applySuggestions}
                  disabled={selectedSuggestions.length === 0}
                >
                  Apply {selectedSuggestions.length} Suggestion(s)
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
