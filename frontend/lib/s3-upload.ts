export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export function uploadToS3(
  uploadUrl: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl);

    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      const percentage = Math.round((event.loaded / event.total) * 100);

      onProgress?.({
        loaded: event.loaded,
        total: event.total,
        percentage,
      });
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`S3 upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during S3 upload"));
    };

    xhr.onabort = () => {
      reject(new Error("Upload cancelled"));
    };

    xhr.send(file);
  });
}
