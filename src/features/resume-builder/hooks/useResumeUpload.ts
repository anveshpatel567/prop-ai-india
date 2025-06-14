
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ResumeUploadRow } from "../types/index";
import { useUserSession } from "@/hooks/useUserSession";

type UseResumeUploadProps = {
  onUploaded: (resume: ResumeUploadRow) => void;
};

export function useResumeUpload({ onUploaded }: UseResumeUploadProps) {
  const { user } = useUserSession();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    if (!user) {
      setError("Not logged in.");
      return;
    }
    setUploading(true);
    setError(null);
    
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!["pdf", "doc", "docx", "txt"].includes(ext || "")) {
        setError("Unsupported file type.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File too large (max 5MB).");
        return;
      }
      const filePath = `resumes/${user.id}/${Date.now()}-${file.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("uploads")
        .upload(filePath, file);
      if(storageError) {
        setError(storageError.message);
        return;
      }
      const url = supabase.storage.from("uploads").getPublicUrl(filePath).data.publicUrl;
      const { data: insertData, error: insertErr } = await supabase
        .from("resume_uploads")
        .insert([{
          user_id: user.id,
          file_url: url,
          file_name: file.name,
          status: "uploaded"
        }])
        .select("*")
        .single();
      if(insertErr || !insertData){
        setError(insertErr?.message || "Insert failed");
        return;
      }
      onUploaded(insertData as ResumeUploadRow);
    } catch(e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, handleUpload };
}
