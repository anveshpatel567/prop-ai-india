
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface AiPanelSearchProps {
  onFilterChange: (filteredPanels: string[]) => void;
  allPanels: string[];
}

export function AiPanelSearch({ onFilterChange, allPanels }: AiPanelSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPanels = useMemo(() => {
    if (!searchTerm.trim()) {
      return allPanels;
    }

    const term = searchTerm.toLowerCase();
    return allPanels.filter(panel => 
      panel.toLowerCase().includes(term) ||
      panel.replace(/([A-Z])/g, ' $1').toLowerCase().includes(term)
    );
  }, [searchTerm, allPanels]);

  React.useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFilterChange(filteredPanels);
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [filteredPanels, onFilterChange]);

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search AI panels..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
