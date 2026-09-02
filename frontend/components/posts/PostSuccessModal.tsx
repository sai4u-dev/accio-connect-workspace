"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PostSuccessModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>

        <h2 className="text-xl font-semibold">Post Published!</h2>

        <p className="mt-2 text-sm text-gray-500">
          Your post is now live on AccioConnect.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
}
