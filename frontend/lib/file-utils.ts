import type { AttachmentType } from "@/types/post";

export function getAttachmentType(mimeType: string): AttachmentType {
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  if (mimeType === "application/pdf") {
    return "pdf";
  }

  return "file";
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const MAX_PDF_SIZE = 20 * 1024 * 1024;

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function validateFile(file: File) {
  const type = file.type;

  if (type.startsWith("image/")) {
    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error("Images must be smaller than 10MB");
    }

    return;
  }

  if (type.startsWith("video/")) {
    if (file.size > MAX_VIDEO_SIZE) {
      throw new Error("Videos must be smaller than 100MB");
    }

    return;
  }

  if (type === "application/pdf") {
    if (file.size > MAX_PDF_SIZE) {
      throw new Error("PDF must be smaller than 20MB");
    }

    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File must be smaller than 50MB");
  }
}
