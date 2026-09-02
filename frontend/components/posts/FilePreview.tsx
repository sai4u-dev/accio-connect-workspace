"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export function FilePreview({
  file,
  onRemove,
  disabled = false,
}: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isPdf = file.type === "application/pdf";

  useEffect(() => {
    if (!isImage && !isVideo) return;

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, isImage, isVideo]);

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-white">
      {/* IMAGE */}

      {isImage && previewUrl && (
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={previewUrl}
            alt={file.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {/* VIDEO */}

      {isVideo && previewUrl && (
        <div className="aspect-square bg-black">
          <video
            src={previewUrl}
            className="h-full w-full object-cover"
            controls
          />
        </div>
      )}

      {/* PDF */}

      {isPdf && (
        <div className="flex aspect-square flex-col items-center justify-center bg-red-50 p-4">
          <div className="text-4xl">📄</div>

          <p className="mt-3 w-full truncate text-center text-sm font-medium">
            {file.name}
          </p>

          <p className="mt-1 text-xs text-gray-500">PDF</p>
        </div>
      )}

      {/* OTHER FILE */}

      {!isImage && !isVideo && !isPdf && (
        <div className="flex aspect-square flex-col items-center justify-center bg-gray-50 p-4">
          <div className="text-4xl">📎</div>

          <p className="mt-3 w-full truncate text-center text-sm font-medium">
            {file.name}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {formatFileSize(file.size)}
          </p>
        </div>
      )}

      {/* REMOVE */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        disabled={disabled}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-lg text-white opacity-100 transition hover:bg-black disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label={`Remove ${file.name}`}
      >
        ×
      </button>
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${
    units[index]
  }`;
}
