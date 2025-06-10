
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Camera, Video, Sparkles } from 'lucide-react';
import { AiToolGate } from '@/components/common/AiToolGate';
import { useAiVideoGeneration } from '@/hooks/useAiVideoGeneration';

interface PhotosStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const PhotosStep: React.FC<PhotosStepProps> = ({ data, onDataChange, onNext }) => {
  const [photos, setPhotos] = useState<File[]>(data.photos || []);
  const [generating, setGenerating] = useState(false);
  const { generateVideo, isGenerating } = useAiVideoGeneration();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = [...photos, ...files].slice(0, 20); // Max 20 photos
    setPhotos(newPhotos);
    onDataChange({ photos: newPhotos });
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onDataChange({ photos: newPhotos });
  };

  const handleVideoGeneration = async () => {
    try {
      await generateVideo({
        listing_data: data,
        photos: photos
      });
    } catch (error) {
      console.error('Video generation failed:', error);
    }
  };

  const canProceed = photos.length > 0;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Property Photos & Media</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Photos *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </span>
                </Button>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Upload up to 20 high-quality photos (JPG, PNG)
              </p>
            </div>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Property ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <AiToolGate
            toolName="video_generator"
            toolTitle="AI Video Generator"
          >
            <Card className="border-2 border-dashed border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Sparkles className="h-5 w-5" />
                  AI Video Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Create a professional property video using AI with your uploaded photos.
                </p>
                <Button
                  onClick={handleVideoGeneration}
                  disabled={isGenerating || photos.length === 0}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                >
                  <Video className="h-4 w-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate Video (100 Credits)'}
                </Button>
                {photos.length === 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Upload photos first to generate video
                  </p>
                )}
              </CardContent>
            </Card>
          </AiToolGate>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">Photo Tips:</h4>
            <ul className="text-sm text-orange-600 space-y-1">
              <li>• Take photos in good lighting</li>
              <li>• Include all rooms and amenities</li>
              <li>• Show the exterior and common areas</li>
              <li>• Add photos of nearby landmarks</li>
              <li>• First photo will be the cover image</li>
            </ul>
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600"
      >
        Continue to Review
      </Button>
    </div>
  );
};
