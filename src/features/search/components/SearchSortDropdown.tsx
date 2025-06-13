
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

export function SearchSortDropdown({ 
  sortBy,
  sortOrder,
  onSortChange 
}: { 
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}) {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', orders: [] },
    { value: 'price', label: 'Price', orders: ['asc', 'desc'] },
    { value: 'date', label: 'Date Added', orders: ['desc', 'asc'] },
    { value: 'area', label: 'Area', orders: ['desc', 'asc'] },
    { value: 'location', label: 'Location', orders: ['asc', 'desc'] }
  ];

  const currentOption = sortOptions.find(opt => opt.value === sortBy);
  const showOrderToggle = currentOption && currentOption.orders.length > 0;

  const handleSortChange = (value: string) => {
    const option = sortOptions.find(opt => opt.value === value);
    if (option) {
      const defaultOrder = option.orders[0] || 'desc';
      onSortChange(value, defaultOrder);
    }
  };

  const toggleSortOrder = () => {
    if (showOrderToggle) {
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      onSortChange(sortBy, newOrder);
    }
  };

  const getSortLabel = () => {
    if (sortBy === 'relevance') return 'Relevance';
    
    const option = sortOptions.find(opt => opt.value === sortBy);
    const orderLabel = sortOrder === 'asc' ? 'Low to High' : 'High to Low';
    
    return `${option?.label} (${orderLabel})`;
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by">
            {getSortLabel()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {showOrderToggle && (
        <button
          onClick={toggleSortOrder}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          <ArrowUpDown 
            className={`h-4 w-4 transition-transform ${
              sortOrder === 'desc' ? 'rotate-180' : ''
            }`} 
          />
        </button>
      )}
    </div>
  );
}
