
import React, { useEffect, useState } from 'react';
import { usePromptTags } from '@/hooks/usePromptTags';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Tag, Plus } from 'lucide-react';

export function AiPromptTaggingPanel(): JSX.Element {
  const { user } = useAuth();
  const { tags, loading, fetchPromptTags, addPromptTag } = usePromptTags();
  const [featureFilter, setFeatureFilter] = useState('all');
  const [newTag, setNewTag] = useState({
    promptId: '',
    featureArea: '',
    tags: ''
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPromptTags();
    }
  }, [user?.role]);

  useEffect(() => {
    fetchPromptTags(featureFilter);
  }, [featureFilter]);

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
          <p>Loading prompt tags...</p>
        </CardContent>
      </Card>
    );
  }

  const handleAddTag = async () => {
    if (!newTag.promptId || !newTag.featureArea || !newTag.tags) return;
    
    const tagArray = newTag.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    await addPromptTag(newTag.promptId, newTag.featureArea, tagArray);
    
    setNewTag({ promptId: '', featureArea: '', tags: '' });
  };

  const uniqueFeatures = Array.from(new Set(tags.map(tag => tag.feature_area)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          AI Prompt Tagging ({tags.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={featureFilter}
              onChange={(e) => setFeatureFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="all">All Features</option>
              {uniqueFeatures.map((feature) => (
                <option key={feature} value={feature}>{feature}</option>
              ))}
            </select>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-3">Add New Tag</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Prompt ID"
                value={newTag.promptId}
                onChange={(e) => setNewTag({...newTag, promptId: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="text"
                placeholder="Feature Area"
                value={newTag.featureArea}
                onChange={(e) => setNewTag({...newTag, featureArea: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newTag.tags}
                onChange={(e) => setNewTag({...newTag, tags: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                onClick={handleAddTag}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          {tags.length === 0 ? (
            <p className="text-gray-500">No prompt tags found.</p>
          ) : (
            <div className="space-y-3">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">{tag.feature_area}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">ID: {tag.prompt_id}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(tag.tagged_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tag.tags.map((tagName, index) => (
                      <Badge key={index} className="bg-gray-100 text-gray-700">
                        {tagName}
                      </Badge>
                    ))}
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
