
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { useAiQualityEnhancer } from '@/hooks/useAiQualityEnhancer';

interface QualityEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingData: any;
  onApplySuggestions: (suggestions: any[]) => void;
}

export const QualityEnhancerModal: React.FC<QualityEnhancerModalProps> = ({
  isOpen,
  onClose,
  listingData,
  onApplySuggestions
}) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const { analyzing, suggestions, analyzeQuality } = useAiQualityEnhancer();

  const handleAnalyze = async () => {
    try {
      await analyzeQuality(listingData);
    } catch (error) {
      console.error('Quality analysis failed:', error);
    }
  };

  const toggleSuggestion = (suggestionId: string) => {
    setSelectedSuggestions(prev =>
      prev.includes(suggestionId)
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const applySuggestions = () => {
    const selectedItems = suggestions.filter(s => selectedSuggestions.includes(s.id));
    onApplySuggestions(selectedItems);
    onClose();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Quality Enhancer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!suggestions.length && !analyzing && (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 mx-auto text-purple-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Enhance Your Listing Quality</h3>
              <p className="text-gray-600 mb-4">
                Get AI-powered suggestions to improve your listing and attract more buyers.
              </p>
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-gradient-to-r from-purple-500 to-pink-600"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Quality (100 Credits)
                  </>
                )}
              </Button>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-purple-600 mb-4" />
              <p className="text-gray-600">Analyzing your listing quality...</p>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Quality Suggestions</h3>
                <Badge variant="outline">
                  {suggestions.length} suggestions found
                </Badge>
              </div>

              <div className="grid gap-4">
                {suggestions.map((suggestion) => (
                  <Card
                    key={suggestion.id}
                    className={`cursor-pointer transition-all ${
                      selectedSuggestions.includes(suggestion.id)
                        ? 'ring-2 ring-purple-500 bg-purple-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleSuggestion(suggestion.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                          {suggestion.type === 'improvement' ? (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {suggestion.field} Enhancement
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={getSeverityColor(suggestion.severity)}
                        >
                          {suggestion.severity} priority
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        {suggestion.reason}
                      </p>
                      <div className="text-sm">
                        <strong>Suggested:</strong> {suggestion.suggested_value}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={applySuggestions}
                  disabled={selectedSuggestions.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600"
                >
                  Apply {selectedSuggestions.length} Suggestions
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
