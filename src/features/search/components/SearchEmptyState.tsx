
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';

export function SearchEmptyState({ 
  onAiSuggest,
  onClearFilters 
}: { 
  onAiSuggest: () => void;
  onClearFilters: () => void;
}) {
  return (
    <Card className="text-center py-16">
      <CardContent className="space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
          <Search className="h-10 w-10 text-orange-500" />
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Properties Found
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto mb-6">
            We couldn't find any properties matching your search criteria. 
            Try adjusting your filters or let our AI help you find better matches.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onAiSuggest} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Get AI Suggestions
          </Button>
          <Button variant="outline" onClick={onClearFilters}>
            Clear All Filters
          </Button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Try using broader search terms or expand your price range 
            to see more results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
