"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { FilePreview } from "./FilePreview";

interface FileUploaderProps {
  files: File[];
  onFilesSelect: (files: File[]) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
  maxFiles?: number;
}

export function FileUploader({
  files,
  onFilesSelect,
  onRemove,
  disabled = false,
  maxFiles = 10,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (newFiles: File[]) => {
    if (disabled) return;

    const remainingSlots = maxFiles - files.length;

    if (remainingSlots <= 0) return;

    const filesToAdd = newFiles.slice(0, remainingSlots);

    onFilesSelect([...files, ...filesToAdd]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    addFiles(selectedFiles);

    // Allows selecting the same files again
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = Array.from(event.dataTransfer.files);

    addFiles(droppedFiles);
  };

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* FILE PREVIEWS */}

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {files.map((file, index) => (
            <FilePreview
              key={`${file.name}-${file.lastModified}-${index}`}
              file={file}
              onRemove={() => onRemove(index)}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      {/* UPLOAD AREA */}

      {files.length < maxFiles && (
        <div
          onDragOver={(event) => {
            event.preventDefault();

            if (!disabled) {
              setIsDragging(true);
            }
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          onClick={openFilePicker}
          className={`
            cursor-pointer rounded-2xl border-2 border-dashed
            p-8 text-center transition
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
            }
            ${disabled ? "cursor-not-allowed opacity-50" : ""}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            hidden
            multiple
            disabled={disabled}
            accept={[
              "image/*",
              "video/*",
              "application/pdf",
              ".zip",
              ".doc",
              ".docx",
              ".xls",
              ".xlsx",
            ].join(",")}
            onChange={handleInputChange}
          />

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
            📎
          </div>

          <h3 className="mt-3 font-medium text-gray-900">Add attachments</h3>

          <p className="mt-1 text-sm text-gray-500">
            Drag & drop or click to browse
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {files.length}/{maxFiles} files selected
          </p>
        </div>
      )}
    </div>
  );
}
