
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useFollowupVariants } from '@/hooks/useFollowupVariants';
import { useCreditStatus } from '@/hooks/useCreditStatus';
import { MessageSquare, Clock, Send, Sparkles } from 'lucide-react';
import { AiCreditTooltip } from '@/components/ai/AiCreditTooltip';
import { toast } from '@/hooks/use-toast';

interface FollowupVariantsPanelProps {
  leadId: string;
  leadContext: string;
}

export const FollowupVariantsPanel: React.FC<FollowupVariantsPanelProps> = ({
  leadId,
  leadContext
}) => {
  const [customContext, setCustomContext] = useState(leadContext);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [scheduledTime, setScheduledTime] = useState('');
  
  const { 
    loading, 
    variants, 
    generateVariants, 
    getVariantsForLead, 
    scheduleVariant,
    markAsSent 
  } = useFollowupVariants();
  
  const { userCredits } = useCreditStatus();

  useEffect(() => {
    getVariantsForLead(leadId);
  }, [leadId]);

  const handleGenerateVariants = async () => {
    try {
      await generateVariants(leadId, customContext, 3);
      toast({
        title: "Variants Generated",
        description: "3 follow-up variants have been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate variants. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSchedule = async () => {
    if (!selectedVariant || !scheduledTime) return;
    
    try {
      await scheduleVariant(selectedVariant, scheduledTime);
      toast({
        title: "Follow-up Scheduled",
        description: "The follow-up message has been scheduled successfully.",
      });
      setSelectedVariant(null);
      setScheduledTime('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule follow-up. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSendNow = async (variantId: string) => {
    try {
      await markAsSent(variantId);
      toast({
        title: "Message Sent",
        description: "Follow-up message has been sent successfully.",
      });
      // In a real implementation, you'd also trigger the actual message sending
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getVariantColor = (variant: string) => {
    switch (variant) {
      case 'professional': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'friendly': return 'bg-green-100 text-green-800 border-green-200';
      case 'value': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Follow-up Variants
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Context for AI Generation
            </label>
            <Textarea
              value={customContext}
              onChange={(e) => setCustomContext(e.target.value)}
              placeholder="Provide context about the lead, property interest, previous interactions..."
              className="border-orange-200 focus:border-orange-500"
              rows={3}
            />
          </div>
          
          <AiCreditTooltip
            credits_required={30}
            tool_name="Follow-up Variants"
            user_credits={userCredits}
          >
            <Button
              onClick={handleGenerateVariants}
              disabled={loading || !customContext.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {loading ? 'Generating...' : 'Generate 3 Variants (30 credits)'}
            </Button>
          </AiCreditTooltip>
        </CardContent>
      </Card>

      {variants.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Generated Variants</h3>
          
          {variants.map((variant, index) => (
            <Card key={variant.id || index} className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getVariantColor(variant.variant)}>
                      {variant.variant}
                    </Badge>
                    {variant.sent_at && (
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        Sent
                      </Badge>
                    )}
                    {variant.is_scheduled && !variant.sent_at && (
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        Scheduled
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {variant.created_at && new Date(variant.created_at).toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {variant.message}
                  </p>
                </div>
                
                {!variant.sent_at && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSendNow(variant.id!)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Send className="mr-1 h-3 w-3" />
                      Send Now
                    </Button>
                    
                    <Button
                      onClick={() => setSelectedVariant(variant.id!)}
                      size="sm"
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      Schedule
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedVariant && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Schedule Follow-up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Schedule Date & Time
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-2 border border-blue-200 rounded-md focus:border-blue-500 focus:outline-none"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleSchedule}
                disabled={!scheduledTime}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Schedule Message
              </Button>
              <Button
                onClick={() => {
                  setSelectedVariant(null);
                  setScheduledTime('');
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
