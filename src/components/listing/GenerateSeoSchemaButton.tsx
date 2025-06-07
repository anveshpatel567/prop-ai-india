
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSeoSchema } from '@/hooks/useSeoSchema';
import { Loader2, Code } from 'lucide-react';

interface GenerateSeoSchemaButtonProps {
  listingId: string;
  onGenerated?: () => void;
}

export default function GenerateSeoSchemaButton({ listingId, onGenerated }: GenerateSeoSchemaButtonProps) {
  const { generateSchema, loading } = useSeoSchema();

  const handleGenerate = async () => {
    await generateSchema(listingId);
    if (onGenerated) onGenerated();
  };

  return (
    <Button 
      onClick={handleGenerate} 
      disabled={loading}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating SEO Schema...
        </>
      ) : (
        <>
          <Code className="mr-2 h-4 w-4" />
          Generate SEO Schema
        </>
      )}
    </Button>
  );
}
