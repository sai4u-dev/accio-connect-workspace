export type AttachmentType = "image" | "video" | "pdf" | "file";

export interface PostAttachment {
  type: AttachmentType;
  s3Key: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface CreatePostPayload {
  text?: string;
  attachments?: PostAttachment[];
  visibility: "public" | "followers" | "private";
}
