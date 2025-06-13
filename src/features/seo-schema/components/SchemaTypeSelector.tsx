
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export function SchemaTypeSelector({ 
  selectedType,
  onTypeChange 
}: { 
  selectedType: string;
  onTypeChange: (type: string) => void;
}) {
  const schemaTypes = [
    {
      value: 'LocalBusiness',
      label: 'Local Business',
      description: 'For real estate agencies and offices',
      complexity: 'Easy'
    },
    {
      value: 'RealEstateAgent',
      label: 'Real Estate Agent',
      description: 'For individual agent profiles',
      complexity: 'Easy'
    },
    {
      value: 'Product',
      label: 'Property Listing',
      description: 'For individual property pages',
      complexity: 'Medium'
    },
    {
      value: 'Organization',
      label: 'Organization',
      description: 'For company information',
      complexity: 'Easy'
    },
    {
      value: 'WebSite',
      label: 'Website',
      description: 'For main website pages',
      complexity: 'Easy'
    },
    {
      value: 'FAQPage',
      label: 'FAQ Page',
      description: 'For frequently asked questions',
      complexity: 'Medium'
    },
    {
      value: 'Article',
      label: 'Article/Blog',
      description: 'For blog posts and articles',
      complexity: 'Medium'
    },
    {
      value: 'BreadcrumbList',
      label: 'Breadcrumbs',
      description: 'For navigation breadcrumbs',
      complexity: 'Hard'
    }
  ];

  const selectedSchema = schemaTypes.find(type => type.value === selectedType);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Schema Type
        </label>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select schema type" />
          </SelectTrigger>
          <SelectContent>
            {schemaTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSchema && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">{selectedSchema.label}</h4>
            <Badge 
              variant="secondary" 
              className={getComplexityColor(selectedSchema.complexity)}
            >
              {selectedSchema.complexity}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{selectedSchema.description}</p>
        </div>
      )}
    </div>
  );
}
