
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SeoSchemaCardProps {
  jsonld: string;
  createdAt: string;
}

export default function SeoSchemaCard({ jsonld, createdAt }: SeoSchemaCardProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonld);
    toast({
      title: "Copied!",
      description: "JSON-LD schema copied to clipboard",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-500" />
            <CardTitle>SEO Schema (JSON-LD)</CardTitle>
          </div>
          <Badge variant="secondary">
            {new Date(createdAt).toLocaleDateString()}
          </Badge>
        </div>
        <CardDescription>
          Generated JSON-LD schema markup for improved SEO
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Schema
            </Button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(JSON.parse(jsonld), null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
