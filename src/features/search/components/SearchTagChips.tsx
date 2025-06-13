
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export function SearchTagChips({ 
  tags,
  onRemoveTag,
  onClearAll 
}: { 
  tags: Array<{
    id: string;
    label: string;
    value: string;
    type: string;
  }>;
  onRemoveTag: (tagId: string) => void;
  onClearAll: () => void;
}) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Active filters:</span>
      
      {tags.map(tag => (
        <Badge 
          key={tag.id} 
          variant="secondary" 
          className="flex items-center gap-1 pr-1"
        >
          <span className="text-xs">{tag.label}</span>
          <button
            onClick={() => onRemoveTag(tag.id)}
            className="hover:bg-gray-300 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${tag.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      {tags.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
