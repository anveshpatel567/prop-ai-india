
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function SearchPagination({ 
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange 
}: { 
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);
  
  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push(-1); // Ellipsis marker
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push(-1); // Ellipsis marker
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600">
        Showing {startResult}-{endResult} of {totalResults} results
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getVisiblePages().map((page, index) => (
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          )
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
