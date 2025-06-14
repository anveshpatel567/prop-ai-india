
export function validateResume(file: File): string | null {
  if (!["pdf", "doc", "docx", "txt"].includes(file.name.split(".").pop()?.toLowerCase() || "")) {
    return "Unsupported file type.";
  }
  if (file.size > 5 * 1024 * 1024) {
    return "File too large (max 5MB).";
  }
  return null;
}
