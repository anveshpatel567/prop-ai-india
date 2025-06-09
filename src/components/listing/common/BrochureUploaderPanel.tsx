
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, FileText, Check, X, Edit } from 'lucide-react';
import { useParsedBrochure } from '@/hooks/useParsedBrochure';
import { ParsedBrochureField } from '@/types/listing/brochure';

export const BrochureUploaderPanel: React.FC = () => {
  const { parsing, parsedData, parseBrochure } = useParsedBrochure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'manual' | 'ai'>('ai');
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleParseBrochure = async () => {
    if (!selectedFile) return;

    if (mode === 'ai') {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target?.result as string;
          await parseBrochure(text);
        };
        reader.readAsText(selectedFile);
      } catch (error) {
        console.error('Error parsing brochure:', error);
      }
    }
  };

  const updateFieldStatus = (fieldName: string, status: ParsedBrochureField['status']) => {
    // This would update the field status in the hook
    console.log(`Updating ${fieldName} to ${status}`);
  };

  const handleEditField = (fieldName: string, value: any) => {
    setEditingField(fieldName);
    setEditValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const saveEdit = (fieldName: string) => {
    updateFieldStatus(fieldName, 'edited');
    setEditingField(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Brochure Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Selection */}
          <div className="flex gap-4">
            <Button
              variant={mode === 'manual' ? 'default' : 'outline'}
              onClick={() => setMode('manual')}
            >
              Manual Upload Only
            </Button>
            <Button
              variant={mode === 'ai' ? 'default' : 'outline'}
              onClick={() => setMode('ai')}
            >
              AI Parse & Extract
            </Button>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="brochure-upload"
            />
            <label htmlFor="brochure-upload" className="cursor-pointer">
              <span className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : 'Click to upload brochure (PDF, DOC, TXT)'}
              </span>
            </label>
          </div>

          {/* AI Parse Button */}
          {mode === 'ai' && selectedFile && (
            <Button
              onClick={handleParseBrochure}
              disabled={parsing}
              className="w-full"
            >
              {parsing ? 'Parsing...' : 'Parse with AI'}
            </Button>
          )}

          {/* Parsed Results */}
          {parsedData && parsedData.parsed_fields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Extracted Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedData.parsed_fields.map((field) => (
                    <div key={field.field_name} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <div className="font-medium">{field.field_name}</div>
                        {editingField === field.field_name ? (
                          <div className="flex gap-2 mt-2">
                            <Input
                              value={editValues[field.field_name] || field.extracted_value}
                              onChange={(e) => setEditValues(prev => ({ ...prev, [field.field_name]: e.target.value }))}
                            />
                            <Button size="sm" onClick={() => saveEdit(field.field_name)}>
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-gray-600">
                            {field.status === 'edited' ? editValues[field.field_name] : field.extracted_value}
                          </div>
                        )}
                        <Badge variant="secondary" className="mt-1">
                          {Math.round(field.confidence_score * 100)}% confidence
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditField(field.field_name, field.extracted_value)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateFieldStatus(field.field_name, 'accepted')}
                          className={field.status === 'accepted' ? 'bg-green-100' : ''}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateFieldStatus(field.field_name, 'rejected')}
                          className={field.status === 'rejected' ? 'bg-red-100' : ''}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legal Agreement */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreement"
              checked={agreementAccepted}
              onCheckedChange={(checked) => setAgreementAccepted(checked as boolean)}
            />
            <Label htmlFor="agreement" className="text-sm leading-5">
              I confirm that this listing complies with the RERA Act and FreePropList terms of service.
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full"
            disabled={!agreementAccepted || (mode === 'ai' && !parsedData)}
          >
            Submit Listing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
