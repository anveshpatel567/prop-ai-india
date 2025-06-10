
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, X, Edit } from 'lucide-react';

interface ParsedField {
  field: string;
  value: string;
  confidence: number;
}

interface BrochureParsedDataProps {
  parsedFields: ParsedField[];
}

export const BrochureParsedData: React.FC<BrochureParsedDataProps> = ({
  parsedFields
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const handleEditField = (fieldName: string, value: string) => {
    setEditingField(fieldName);
    setEditValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const saveEdit = (fieldName: string) => {
    setEditingField(null);
    console.log(`Saved edit for ${fieldName}:`, editValues[fieldName]);
  };

  if (!parsedFields || parsedFields.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Extracted Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {parsedFields.map((field, index) => (
            <div key={field.field || index} className="flex items-center justify-between p-3 border rounded">
              <div className="flex-1">
                <div className="font-medium">{field.field}</div>
                {editingField === field.field ? (
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={editValues[field.field] || field.value}
                      onChange={(e) => setEditValues(prev => ({ ...prev, [field.field]: e.target.value }))}
                    />
                    <Button size="sm" onClick={() => saveEdit(field.field)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    {editValues[field.field] || field.value}
                  </div>
                )}
                <Badge variant="secondary" className="mt-1">
                  {Math.round(field.confidence * 100)}% confidence
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditField(field.field, field.value)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-green-100"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
