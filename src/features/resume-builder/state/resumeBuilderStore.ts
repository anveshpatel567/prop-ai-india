
import { create } from "zustand";
import type { ResumeUploadRow, ResumeSummaryRow } from "../types/index";

type ResumeBuilderState = {
  upload: ResumeUploadRow | null;
  summary: ResumeSummaryRow | null;
  setUpload: (row: ResumeUploadRow | null) => void;
  setSummary: (row: ResumeSummaryRow | null) => void;
};

export const useResumeBuilderStore = create<ResumeBuilderState>((set) => ({
  upload: null,
  summary: null,
  setUpload: (upload) => set({ upload }),
  setSummary: (summary) => set({ summary }),
}));
