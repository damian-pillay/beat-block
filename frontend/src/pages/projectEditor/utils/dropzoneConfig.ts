import { Trash2, X } from "lucide-react";

export const dropzoneConfig = {
  compressedFile: {
    title: "Project Files *",
    extensions: [".zip", ".rar"],
    mimeTypes: ["application/zip", "application/x-zip-compressed"],
    description: undefined,
    styleClass: "h-22",
    clearButtonPosition: "right-6",
    clearButton: Trash2,
  },
  audioFile: {
    title: "Rendered Audio for Preview (Optional)",
    extensions: [".wav", ".mp3"],
    mimeTypes: ["audio/mpeg", "audio/wav"],
    description: undefined,
    styleClass: "h-22",
    clearButtonPosition: "right-6",
    clearButton: Trash2,
  },
  imageFile: {
    title: "Artwork",
    extensions: [".jpeg", ".jpg", ".png"],
    mimeTypes: ["image/jpeg", "image/png"],
    description: "1000 x 1000 px max",
    styleClass: "aspect-square gap-3 text-sm max-w-48",
    clearButtonPosition: "right-2 top-2",
    clearButton: X,
  },
};
