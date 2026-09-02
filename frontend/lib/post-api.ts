import type { CreatePostPayload } from "@/types/post";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUploadUrl(file: File) {
  const response = await fetch(`${API_URL}/api/posts/upload-url`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate upload URL");
  }

  return response.json();
}

export async function createPost(payload: CreatePostPayload) {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Failed to create post");
  }

  return response.json();
}
