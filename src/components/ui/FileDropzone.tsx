
import React, { useRef } from "react";
type FileDropzoneProps = {
  accept: string[];
  onDrop: (file: File) => void;
  disabled?: boolean;
};
export function FileDropzone({ accept, onDrop, disabled }: FileDropzoneProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onDrop(file);
  };

  const onDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onDrop(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={onDropFile}
      onDragOver={e => e.preventDefault()}
      className={
        `border-2 border-dashed border-[#ff4500] rounded-lg p-4 cursor-pointer bg-[#fff7f0] hover:bg-orange-100 text-[#2d0000] text-center ${disabled ? "opacity-60 cursor-not-allowed" : ""}`
      }
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept.join(",")}
        style={{ display: "none" }}
        onChange={onInputChange}
        disabled={disabled}
      />
      <div>Click or drag and drop resume file here</div>
    </div>
  );
}
