"use client";

import { useState } from "react";
import { FileUploader } from "./FileUploader";

export default function CreatePost() {
  const [text, setText] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="w-full max-w-2xl rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-semibold">Create Post</h2>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What's on your mind?"
        className="mt-5 min-h-32 w-full resize-none rounded-xl border p-4 outline-none focus:border-blue-500"
      />

      <div className="mt-4">
        <FileUploader
          files={files}
          onFilesSelect={setFiles}
          onRemove={(index) => {
            setFiles((current) => current.filter((_, i) => i !== index));
          }}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
        >
          Publish Post
        </button>
      </div>
    </div>
  );
}
