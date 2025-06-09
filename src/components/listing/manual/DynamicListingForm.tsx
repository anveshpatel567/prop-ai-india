
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, X, FileText } from 'lucide-react';
import { useListingBuilder } from '@/hooks/useListingBuilder';
import { FieldConfig } from '@/types/listing/manual';

export const DynamicListingForm: React.FC = () => {
  const { fields, formData, templates, addField, removeField, updateFieldValue, applyTemplate } = useListingBuilder();
  const [newFieldType, setNewFieldType] = useState<FieldConfig['type']>('text');
  const [newFieldLabel, setNewFieldLabel] = useState('');

  const handleAddField = () => {
    if (newFieldLabel.trim() && fields.length < 250) {
      addField({
        name: newFieldLabel.toLowerCase().replace(/\s+/g, '_'),
        type: newFieldType,
        label: newFieldLabel,
        required: false
      });
      setNewFieldLabel('');
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData.custom_fields[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            placeholder={field.placeholder}
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            placeholder={field.placeholder}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => updateFieldValue(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'toggle':
        return (
          <Switch
            checked={value || false}
            onCheckedChange={(checked) => updateFieldValue(field.id, checked)}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dynamic Listing Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Start with a template</Label>
            <div className="flex gap-2 flex-wrap">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => applyTemplate(template.id)}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto scroll-mb-2">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">{field.label}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeField(field.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Add New Field */}
          {fields.length < 250 && (
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Label>Field Label</Label>
                    <Input
                      value={newFieldLabel}
                      onChange={(e) => setNewFieldLabel(e.target.value)}
                      placeholder="Enter field name"
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select value={newFieldType} onValueChange={(val) => setNewFieldType(val as FieldConfig['type'])}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="toggle">Toggle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddField} disabled={!newFieldLabel.trim()}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Field
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-sm text-gray-500 text-center">
            {fields.length}/250 fields used
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
