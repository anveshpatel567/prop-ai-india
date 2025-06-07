
import React, { useEffect, useState } from 'react';
import { usePromptTemplates } from '@/hooks/usePromptTemplates';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Tag } from 'lucide-react';

export function PromptTemplateManager(): JSX.Element {
  const { user } = useAuth();
  const { templates, loading, fetchTemplates, createTemplate } = usePromptTemplates();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    template: '',
    category: ''
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTemplates();
    }
  }, [user?.role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTemplate(formData);
    setFormData({ title: '', template: '', category: '' });
    setShowForm(false);
  };

  if (!user || user.role !== 'admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Access restricted to administrators only.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading prompt templates...</p>
        </CardContent>
      </Card>
    );
  }

  const categories = Array.from(new Set(templates.map(t => t.category).filter(Boolean)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            AI Prompt Templates ({templates.length})
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Template
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {showForm && (
            <form onSubmit={handleSubmit} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Content Generation, Analysis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                  <Textarea
                    value={formData.template}
                    onChange={(e) => setFormData({...formData, template: e.target.value})}
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Create Template</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}

          <div className="flex gap-2 mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Categories: {categories.length}
            </Badge>
          </div>

          {templates.length === 0 ? (
            <p className="text-gray-500">No prompt templates found.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    {category}
                  </h4>
                  {templates
                    .filter(template => template.category === category)
                    .map((template) => (
                      <div key={template.id} className="border border-gray-200 p-4 rounded-lg ml-6">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{template.title}</h5>
                          <span className="text-xs text-gray-500">
                            {new Date(template.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded font-mono">
                          {template.template.length > 200 
                            ? template.template.substring(0, 200) + '...'
                            : template.template
                          }
                        </div>
                      </div>
                    ))}
                </div>
              ))}
              
              {/* Templates without category */}
              {templates.filter(template => !template.category).map((template) => (
                <div key={template.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{template.title}</h5>
                    <span className="text-xs text-gray-500">
                      {new Date(template.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded font-mono">
                    {template.template.length > 200 
                      ? template.template.substring(0, 200) + '...'
                      : template.template
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
