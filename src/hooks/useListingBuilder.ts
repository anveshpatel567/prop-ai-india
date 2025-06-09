
import { useState, useCallback } from 'react';
import { FieldConfig, ListingTemplate, DynamicListingData } from '@/types/listing/manual';

const defaultTemplates: ListingTemplate[] = [
  {
    id: 'residential',
    name: 'Residential Property',
    category: 'residential',
    fields: [
      { id: 'bedrooms', name: 'bedrooms', type: 'number', label: 'Bedrooms', required: true },
      { id: 'bathrooms', name: 'bathrooms', type: 'number', label: 'Bathrooms', required: true },
      { id: 'area_sqft', name: 'area_sqft', type: 'number', label: 'Area (sq ft)', required: true },
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial Property',
    category: 'commercial',
    fields: [
      { id: 'floor_count', name: 'floor_count', type: 'number', label: 'Number of Floors', required: false },
      { id: 'parking_spaces', name: 'parking_spaces', type: 'number', label: 'Parking Spaces', required: false },
    ]
  }
];

export const useListingBuilder = () => {
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [formData, setFormData] = useState<DynamicListingData>({
    basic_fields: {},
    custom_fields: {}
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const addField = useCallback((fieldConfig: Omit<FieldConfig, 'id'>) => {
    const newField: FieldConfig = {
      ...fieldConfig,
      id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setFields(prev => [...prev, newField]);
  }, []);

  const removeField = useCallback((fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId));
    setFormData(prev => {
      const newData = { ...prev };
      delete newData.custom_fields[fieldId];
      return newData;
    });
  }, []);

  const updateFieldValue = useCallback((fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      custom_fields: {
        ...prev.custom_fields,
        [fieldId]: value
      }
    }));
  }, []);

  const applyTemplate = useCallback((templateId: string) => {
    const template = defaultTemplates.find(t => t.id === templateId);
    if (template) {
      setFields(template.fields);
      setSelectedTemplate(templateId);
      setFormData({
        basic_fields: {},
        custom_fields: {}
      });
    }
  }, []);

  return {
    fields,
    formData,
    selectedTemplate,
    addField,
    removeField,
    updateFieldValue,
    applyTemplate,
    templates: defaultTemplates
  };
};
