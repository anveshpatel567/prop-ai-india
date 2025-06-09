
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Search, Trash } from 'lucide-react';
import { SavedSearch } from '@/types/negotiation';

interface SavedSearchCardProps {
  search: SavedSearch;
  onToggleAlert?: (id: string, enabled: boolean) => void;
  onDelete?: (id: string) => void;
  onExecute?: (filters: string) => void;
}

export const SavedSearchCard: React.FC<SavedSearchCardProps> = ({
  search,
  onToggleAlert,
  onDelete,
  onExecute
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{search.search_name}</CardTitle>
          <Badge variant={search.alert_enabled ? 'default' : 'secondary'}>
            {search.alert_enabled ? 'Active' : 'Paused'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Filters: {search.filters}
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onExecute?.(search.filters)}
            variant="outline"
            size="sm"
            className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            <Search className="h-4 w-4 mr-1" />
            Search Now
          </Button>
          
          <Button
            onClick={() => onToggleAlert?.(search.id, !search.alert_enabled)}
            variant="outline"
            size="sm"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            {search.alert_enabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
          </Button>
          
          <Button
            onClick={() => onDelete?.(search.id)}
            variant="outline"
            size="sm"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
