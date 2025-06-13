
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ResumeTemplateToggle({ 
  selectedTemplate,
  onTemplateChange 
}: { 
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}) {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design',
      preview: '📄'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout',
      preview: '📋'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Eye-catching design for creative roles',
      preview: '🎨'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map(template => (
          <Card
            key={template.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-orange-500 bg-orange-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="text-center space-y-2">
              <div className="text-4xl">{template.preview}</div>
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
              <Button
                variant={selectedTemplate === template.id ? "default" : "outline"}
                size="sm"
                className="w-full"
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
