
import React from 'react';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface BrochureFileUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

export const BrochureFileUpload: React.FC<BrochureFileUploadProps> = ({
  selectedFile,
  onFileSelect
}) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileSelect(file || null);
  };

  return (
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
  );
};
