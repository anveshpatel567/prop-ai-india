
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Zap, Save, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SeoOverride {
  id: string;
  path: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  source: string;
  created_at: string;
}

export const SeoAuditPanel: React.FC = () => {
  const [overrides, setOverrides] = useState<SeoOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOverride, setEditingOverride] = useState<SeoOverride | null>(null);
  const [formData, setFormData] = useState({
    path: '',
    title: '',
    description: '',
    keywords: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchOverrides();
  }, []);

  const fetchOverrides = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_seo_overrides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOverrides(data || []);
    } catch (error) {
      console.error('Error fetching SEO overrides:', error);
      toast({
        title: "Error",
        description: "Failed to fetch SEO overrides.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAiSuggestion = async (path: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generateSeoMetadata', {
        body: { path }
      });

      if (error) throw error;

      if (data) {
        setFormData({
          path,
          title: data.title || '',
          description: data.description || '',
          keywords: data.keywords || ''
        });
        
        toast({
          title: "AI Suggestion Generated",
          description: "AI has generated SEO metadata suggestions.",
        });
      }
    } catch (error) {
      console.error('Error generating AI suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI suggestions.",
        variant: "destructive",
      });
    }
  };

  const saveOverride = async () => {
    try {
      const { error } = await supabase
        .from('ai_seo_overrides')
        .upsert({
          id: editingOverride?.id,
          path: formData.path,
          title: formData.title,
          description: formData.description,
          keywords: formData.keywords,
          source: editingOverride ? 'manual' : 'manual'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "SEO override saved successfully.",
      });

      setEditingOverride(null);
      setFormData({ path: '', title: '', description: '', keywords: '' });
      fetchOverrides();
    } catch (error) {
      console.error('Error saving override:', error);
      toast({
        title: "Error",
        description: "Failed to save SEO override.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (override?: SeoOverride) => {
    if (override) {
      setEditingOverride(override);
      setFormData({
        path: override.path,
        title: override.title || '',
        description: override.description || '',
        keywords: override.keywords || ''
      });
    } else {
      setEditingOverride(null);
      setFormData({ path: '', title: '', description: '', keywords: '' });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-6 w-6 text-orange-500" />
            <CardTitle>SEO Audit & Override Management</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchOverrides}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => openEditModal()}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Add Override
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingOverride ? 'Edit SEO Override' : 'Create SEO Override'}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Page Path</label>
                    <div className="flex gap-2">
                      <Input
                        value={formData.path}
                        onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                        placeholder="/property/123 or /search"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => generateAiSuggestion(formData.path)}
                        variant="outline"
                        disabled={!formData.path}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        AI Suggest
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Page title for search engines"
                      maxLength={60}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.title.length}/60 characters
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description for search engines"
                      maxLength={160}
                      rows={3}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.description.length}/160 characters
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Keywords</label>
                    <Input
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={saveOverride}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Override
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Path</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overrides.map((override) => (
              <TableRow key={override.id}>
                <TableCell className="font-mono text-sm">{override.path}</TableCell>
                <TableCell className="max-w-xs truncate">{override.title}</TableCell>
                <TableCell>
                  <Badge variant={override.source === 'gpt' ? 'default' : 'secondary'}>
                    {override.source === 'gpt' ? 'AI Generated' : 'Manual'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(override.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => openEditModal(override)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit SEO Override</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Page Path</label>
                          <Input
                            value={formData.path}
                            onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                            placeholder="/property/123 or /search"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Meta Title</label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Page title for search engines"
                            maxLength={60}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Meta Description</label>
                          <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description for search engines"
                            maxLength={160}
                            rows={3}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Keywords</label>
                          <Input
                            value={formData.keywords}
                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            placeholder="keyword1, keyword2, keyword3"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={saveOverride}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {overrides.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No SEO overrides found. Create one to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
