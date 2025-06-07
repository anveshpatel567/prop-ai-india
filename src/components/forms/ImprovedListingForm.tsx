
import React, { useState } from 'react';
import { GlowButton } from '@/components/common/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, CheckCircle, XCircle } from 'lucide-react';
import { useParsedBrochure } from '@/hooks/useParsedBrochure';
import { useToast } from '@/hooks/use-toast';

export const ImprovedListingForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { parseBrochure, parsing, parsedData, submitParsedListing, submitting } = useParsedBrochure();
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 50MB",
          variant: "destructive"
        });
        return;
      }
      setFile(uploadedFile);
    }
  };

  const handleParseFile = async () => {
    if (!file) return;
    
    try {
      const text = await file.text();
      await parseBrochure(text);
      toast({
        title: "Brochure parsed successfully!",
        description: "Review the extracted data below and make any necessary edits.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Parsing failed",
        description: "Unable to parse the brochure. Please try manual entry.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitParsed = async () => {
    if (!parsedData) return;
    
    const success = await submitParsedListing(parsedData);
    if (success) {
      toast({
        title: "Listing created successfully!",
        description: "Your property has been listed.",
        variant: "default"
      });
    } else {
      toast({
        title: "Failed to create listing",
        description: "Please check your data and try again.",
        variant: "destructive"
      });
    }
  };

  if (!parsedData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-orange-400 transition-colors">
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="brochure-upload"
            />
            <label htmlFor="brochure-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 font-['Rajdhani']">Upload Property Brochure</h3>
                <p className="text-gray-500 font-['DM_Sans']">Drop your file here or click to browse</p>
                <p className="text-sm text-gray-400 mt-2 font-['DM_Sans']">Supports PDF, TXT, DOC, DOCX (max 50MB)</p>
              </div>
            </label>
          </div>
          
          {file && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium font-['DM_Sans']">{file.name}</span>
                </div>
                <GlowButton onClick={handleParseFile} disabled={parsing} size="sm">
                  {parsing ? 'Parsing...' : 'Parse with AI'}
                </GlowButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-['Rajdhani']">Review Parsed Data</h2>
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="text-sm font-['DM_Sans']">AI parsing completed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Property Title</Label>
          <Input
            id="title"
            value={parsedData.title || ''}
            onChange={(e) => parsedData && (parsedData.title = e.target.value)}
            placeholder="e.g., Luxury 3BHK Apartment"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={parsedData.city || ''}
            onChange={(e) => parsedData && (parsedData.city = e.target.value)}
            placeholder="e.g., Mumbai, Delhi"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={parsedData.description || ''}
          onChange={(e) => parsedData && (parsedData.description = e.target.value)}
          placeholder="Property description..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            value={parsedData.price || ''}
            onChange={(e) => parsedData && (parsedData.price = Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area_sqft">Area (sq ft)</Label>
          <Input
            id="area_sqft"
            type="number"
            value={parsedData.area_sqft || ''}
            onChange={(e) => parsedData && (parsedData.area_sqft = Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={parsedData.bedrooms || ''}
            onChange={(e) => parsedData && (parsedData.bedrooms = Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <GlowButton 
          onClick={handleSubmitParsed} 
          disabled={submitting}
          className="flex-1"
        >
          {submitting ? 'Creating Listing...' : 'Create Listing'}
        </GlowButton>
        <GlowButton 
          variant="outline"
          onClick={() => window.location.reload()}
          className="px-8"
        >
          Start Over
        </GlowButton>
      </div>
    </div>
  );
};
