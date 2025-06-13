
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Check, Loader2 } from 'lucide-react';

export function ResumeSaveToProfileButton({ 
  resumeData,
  onSaveComplete,
  disabled = false 
}: { 
  resumeData: {
    id: string;
    content: string;
    templateId: string;
    generatedAt: string;
  };
  onSaveComplete: (success: boolean) => void;
  disabled?: boolean;
}) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Simulate API call to save resume to user profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, this would save to Supabase
      console.log('Saving resume to profile:', resumeData);
      
      setIsSaved(true);
      onSaveComplete(true);
      
      // Reset saved state after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
      
    } catch (error) {
      console.error('Failed to save resume:', error);
      onSaveComplete(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={disabled || isSaving || isSaved}
      className="flex items-center gap-2"
    >
      {isSaving ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving to Profile...</span>
        </>
      ) : isSaved ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span>Saved to Profile!</span>
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          <span>Save to Profile</span>
        </>
      )}
    </Button>
  );
}
