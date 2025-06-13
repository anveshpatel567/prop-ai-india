
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';

export function AdminUserUsageFilters({ 
  filters,
  onFiltersChange 
}: { 
  filters: {
    search: string;
    status: string;
    tool: string;
    dateFrom: Date | null;
    dateTo: Date | null;
    minCredits: number;
    maxCredits: number;
  };
  onFiltersChange: (newFilters: typeof filters) => void;
}) {
  const toolOptions = [
    'AI Resume Builder',
    'Agent Matcher',
    'SEO Schema Generator',
    'Smart Listing',
    'Pricing Suggestions',
    'Locality Reports'
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const updateFilter = (key: string, value: string | number | Date | null) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      search: '',
      status: '',
      tool: '',
      dateFrom: null,
      dateTo: null,
      minCredits: 0,
      maxCredits: 10000
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4" />
          <h3 className="font-medium">Filter Users</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <Input
              placeholder="Email or name..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Top Tool</label>
            <Select value={filters.tool} onValueChange={(value) => updateFilter('tool', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All tools" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All tools</SelectItem>
                {toolOptions.map(tool => (
                  <SelectItem key={tool} value={tool}>
                    {tool}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {filters.dateFrom ? format(filters.dateFrom, 'MMM dd') : 'From'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom || undefined}
                    onSelect={(date) => updateFilter('dateFrom', date || null)}
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {filters.dateTo ? format(filters.dateTo, 'MMM dd') : 'To'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo || undefined}
                    onSelect={(date) => updateFilter('dateTo', date || null)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Min Credits Used</label>
            <Input
              type="number"
              min="0"
              value={filters.minCredits}
              onChange={(e) => updateFilter('minCredits', Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Max Credits Used</label>
            <Input
              type="number"
              min="0"
              value={filters.maxCredits}
              onChange={(e) => updateFilter('maxCredits', Number(e.target.value))}
            />
          </div>
        </div>

        <Button variant="outline" onClick={handleClearFilters} className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
}
