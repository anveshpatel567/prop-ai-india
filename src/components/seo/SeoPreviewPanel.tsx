
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useSeoPreview } from '@/hooks/useSeoPreview';
import { Search, RefreshCw, Eye, Code, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SeoPreviewPanel: React.FC = () => {
  const [path, setPath] = useState('/');
  const [entityId, setEntityId] = useState('');
  const { loading, previewData, generatePreview, regenerateMetadata } = useSeoPreview();

  const handlePreview = () => {
    generatePreview(path, entityId || undefined);
  };

  const handleRegenerate = () => {
    regenerateMetadata(path, entityId || undefined);
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Search className="mr-2 h-5 w-5" />
            SEO Preview Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Page Path</label>
              <Input
                placeholder="/property/123 or /search"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="border-orange-200 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Entity ID (Optional)</label>
              <Input
                placeholder="Property ID, listing ID..."
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
                className="border-orange-200 focus:border-orange-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handlePreview}
              disabled={loading || !path}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <Eye className="mr-2 h-4 w-4" />
              {loading ? 'Generating...' : 'Preview SEO'}
            </Button>
            
            <Button 
              onClick={handleRegenerate}
              disabled={loading || !path}
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      {previewData && (
        <Tabs defaultValue="preview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Search Preview</TabsTrigger>
            <TabsTrigger value="opengraph">OpenGraph</TabsTrigger>
            <TabsTrigger value="jsonld">JSON-LD</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-blue-600" />
                  Google Search Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="space-y-1">
                    <div className="text-sm text-green-700">
                      https://freeproplist.com{path}
                    </div>
                    <div className="text-lg text-blue-600 hover:underline cursor-pointer">
                      {previewData.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {previewData.description}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {previewData.keywords.split(',').map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opengraph">
            <Card>
              <CardHeader>
                <CardTitle>OpenGraph Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border max-w-md">
                  <div className="aspect-video bg-gradient-to-r from-orange-400 to-red-500 rounded mb-3 flex items-center justify-center text-white font-bold">
                    FreePropList
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-sm line-clamp-2">
                      {previewData.openGraph.title}
                    </div>
                    <div className="text-xs text-gray-600 line-clamp-2">
                      {previewData.openGraph.description}
                    </div>
                    <div className="text-xs text-gray-500">
                      freeproplist.com
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jsonld">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  JSON-LD Schema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={JSON.stringify(previewData.jsonLd, null, 2)}
                  readOnly
                  className="min-h-[200px] font-mono text-sm"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
