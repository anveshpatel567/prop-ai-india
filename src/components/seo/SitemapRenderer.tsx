
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Globe, Download, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SitemapRenderer: React.FC = () => {
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const generateSitemap = async () => {
    setLoading(true);
    setStatus('idle');
    
    try {
      const response = await fetch('/api/sitemap.xml');
      if (!response.ok) throw new Error('Failed to generate sitemap');
      
      const content = await response.text();
      setSitemapContent(content);
      setLastGenerated(new Date());
      setStatus('success');
      
      toast({
        title: "Sitemap Generated",
        description: "Sitemap has been successfully generated and is ready for preview.",
      });
    } catch (error) {
      console.error('Error generating sitemap:', error);
      setStatus('error');
      toast({
        title: "Error",
        description: "Failed to generate sitemap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadSitemap = () => {
    if (!sitemapContent) return;
    
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copySitemapUrl = () => {
    const sitemapUrl = `${window.location.origin}/api/sitemap.xml`;
    navigator.clipboard.writeText(sitemapUrl);
    toast({
      title: "URL Copied",
      description: "Sitemap URL has been copied to clipboard.",
    });
  };

  const StatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Globe className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-orange-500" />
            <CardTitle>Sitemap Generator</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon />
            {lastGenerated && (
              <Badge variant="secondary">
                Last: {lastGenerated.toLocaleString()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={generateSitemap}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Globe className="h-4 w-4 mr-2" />
            )}
            Generate Sitemap
          </Button>
          
          <Button 
            onClick={copySitemapUrl}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            Copy URL
          </Button>
          
          {sitemapContent && (
            <Button 
              onClick={downloadSitemap}
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </div>

        {sitemapContent && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Sitemap Preview</h3>
            <Textarea
              value={sitemapContent}
              readOnly
              className="h-64 font-mono text-xs"
              placeholder="Generated sitemap will appear here..."
            />
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p><strong>Public URL:</strong> {window.location.origin}/api/sitemap.xml</p>
          <p><strong>Cache TTL:</strong> 24 hours</p>
          <p><strong>Includes:</strong> Homepage, Property listings, Static pages</p>
        </div>
      </CardContent>
    </Card>
  );
};
