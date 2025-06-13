
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

export function SchemaAiSuggestButton({ 
  onSuggest,
  disabled = false 
}: { 
  onSuggest: (suggestions: {
    businessName: string;
    description: string;
    address: string;
    phone: string;
    website: string;
  }) => void;
  disabled?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAiSuggest = async () => {
    setIsLoading(true);
    
    try {
      // Simulate AI processing - in real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI suggestions based on current page context
      const suggestions = {
        businessName: "Prime Real Estate Solutions",
        description: "Leading real estate agency specializing in residential and commercial properties with expert guidance and personalized service.",
        address: "123 Business District, Mumbai, Maharashtra 400001, India",
        phone: "+91-9876543210",
        website: window.location.origin
      };
      
      onSuggest(suggestions);
    } catch (error) {
      console.error('AI suggestion failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAiSuggest}
      disabled={disabled || isLoading}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Generating suggestions...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          <span>AI Auto-Fill</span>
        </>
      )}
    </Button>
  );
}
