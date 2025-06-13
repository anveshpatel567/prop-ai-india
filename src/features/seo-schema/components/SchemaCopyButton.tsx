
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export function SchemaCopyButton({ 
  schema,
  variant = "outline" 
}: { 
  schema: string;
  variant?: "outline" | "default" | "ghost";
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(schema);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy schema:', error);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = schema;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleCopy}
      className="flex items-center gap-2"
      disabled={copied}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy Schema</span>
        </>
      )}
    </Button>
  );
}
