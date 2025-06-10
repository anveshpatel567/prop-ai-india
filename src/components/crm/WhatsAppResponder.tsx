
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Copy, Send } from 'lucide-react';
import { useCreditGate } from '@/context/CreditGateContext';
import { useWallet } from '@/context/WalletContext';
import { supabase } from '@/integrations/supabase/client';

interface WhatsAppResponderProps {
  leadData: any;
  context?: string;
}

export const WhatsAppResponder: React.FC<WhatsAppResponderProps> = ({
  leadData,
  context
}) => {
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [customContext, setCustomContext] = useState(context || '');
  
  const { checkToolAccess, logToolAttempt } = useCreditGate();
  const { deductCredits } = useWallet();

  const generateResponse = async () => {
    const access = checkToolAccess('whatsapp_responder');
    await logToolAttempt('whatsapp_responder', access.canAccess);

    if (!access.canAccess) {
      alert(access.reason);
      return;
    }

    setLoading(true);
    try {
      const success = await deductCredits(access.creditsRequired, 'WhatsApp Responder');
      if (!success) {
        throw new Error('Failed to deduct credits');
      }

      const { data, error } = await supabase.functions.invoke('ai/whatsapp-responder', {
        body: { 
          lead_data: leadData,
          context: customContext 
        }
      });

      if (error) throw error;

      setGeneratedResponse(data.response);

      // Log the response
      await supabase.from('ai_whatsapp_responses').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        lead_id: leadData.id,
        context: customContext,
        generated_response: data.response,
        credits_used: access.creditsRequired
      });

    } catch (error) {
      console.error('WhatsApp response generation failed:', error);
      alert('Response generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedResponse);
    alert('Response copied to clipboard!');
  };

  const openWhatsApp = () => {
    const phone = leadData.phone?.replace(/[^\d]/g, '');
    const message = encodeURIComponent(generatedResponse);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h3 className="font-medium">WhatsApp Auto-Responder</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Additional Context (Optional)</label>
          <Textarea
            placeholder="Add any specific context for the response..."
            value={customContext}
            onChange={(e) => setCustomContext(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button 
          onClick={generateResponse}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate AI Response (8 Credits)'}
        </Button>

        {generatedResponse && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Generated Response:</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                <p className="whitespace-pre-wrap">{generatedResponse}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button 
                onClick={openWhatsApp}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send via WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
