
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useStorageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (
    file: File,
    bucket: string,
    path: string
  ): Promise<{ url: string | null; error: string | null }> => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) {
        return { url: null, error: error.message };
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploadProgress(100);
      return { url: publicUrl, error: null };
    } catch (error) {
      return { url: null, error: 'Upload failed' };
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadPhotos = async (files: File[]) => {
    const results = [];
    for (let i = 0; i < files.length; i++) {
      const result = await uploadFile(files[i], 'property-photos', 'listings');
      results.push(result);
      setUploadProgress(((i + 1) / files.length) * 100);
    }
    return results;
  };

  const uploadBrochure = async (file: File) => {
    return uploadFile(file, 'brochures', 'uploads');
  };

  const uploadVideo = async (file: File) => {
    return uploadFile(file, 'videos', 'listings');
  };

  return {
    uploading,
    uploadProgress,
    uploadFile,
    uploadPhotos,
    uploadBrochure,
    uploadVideo
  };
};
