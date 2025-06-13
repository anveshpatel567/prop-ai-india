
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { useDebouncedValue } from '@/features/common/hooks/useDebouncedValue';

export function SearchInputBar({ 
  onSearch,
  onAiSearch,
  placeholder = "Search properties..." 
}: { 
  onSearch: (query: string) => void;
  onAiSearch: (query: string) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState<string>('');
  const { debouncedValue } = useDebouncedValue(query, 300);

  React.useEffect(() => {
    if (debouncedValue && debouncedValue.length > 2) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleManualSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleAiSearch = () => {
    if (query.trim()) {
      onAiSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualSearch();
    }
  };

  return (
    <div className="flex gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      <Button
        onClick={handleManualSearch}
        disabled={!query.trim()}
        variant="outline"
        className="px-6"
      >
        Search
      </Button>
      
      <Button
        onClick={handleAiSearch}
        disabled={!query.trim()}
        className="flex items-center gap-2 px-6"
      >
        <Sparkles className="h-4 w-4" />
        AI Search
      </Button>
    </div>
  );
}
