function downloadBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 60_000);
}

/**
 * Save a WebM blob to the user machine: native save dialog when supported, else <a download>.
 * If the user cancels the dialog, falls back to a normal download in the same folder the browser uses for downloads.
 */
export async function saveWebmToLocal(blob: Blob, defaultName: string): Promise<"file-picker" | "download"> {
  if (typeof window === "undefined") {
    return "download";
  }
  if ("showSaveFilePicker" in window) {
    try {
      const win = window as unknown as {
        showSaveFilePicker: (options?: {
          suggestedName?: string;
          types?: { description: string; accept: Record<string, string[]> }[];
        }) => Promise<{
          createWritable: () => Promise<{ write: (data: Blob) => Promise<void>; close: () => Promise<void> }>;
        }>;
      };
      const handle = await win.showSaveFilePicker({
        suggestedName: defaultName,
        types: [
          {
            description: "WebM video",
            accept: { "video/webm": [".webm"] },
          },
        ],
      });
      const out = await handle.createWritable();
      await out.write(blob);
      await out.close();
      return "file-picker";
    } catch (e) {
      if (e && typeof e === "object" && (e as { name?: string }).name === "AbortError") {
        /* user dismissed dialog: still persist via download */
        downloadBlob(blob, defaultName);
        return "download";
      }
      // fall back to download on any other error
    }
  }
  downloadBlob(blob, defaultName);
  return "download";
}
