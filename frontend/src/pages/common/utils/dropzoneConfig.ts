import { Trash2, X } from "lucide-react";

export const dropzoneConfig = {
  compressedFile: {
    title: "Project Files *",
    fileType: "compressed files",
    maxSize: 300 * 1024 * 1024,
    extensions: [".zip", ".rar"],
    mimeTypes: ["application/zip", "application/x-zip-compressed"],
    description: undefined,
    styleClass: "h-22",
    clearButtonPosition: "right-6",
    clearButton: Trash2,
  },
  audioFile: {
    title: "Rendered Audio for Preview",
    fileType: "audio files",
    maxSize: 30 * 1024 * 1024,
    extensions: [".wav", ".mp3"],
    mimeTypes: ["audio/mpeg", "audio/wav"],
    description: undefined,
    styleClass: "h-22",
    clearButtonPosition: "right-6",
    clearButton: Trash2,
  },
  imageFile: {
    title: "Artwork",
    fileType: "image files",
    maxSize: 5 * 1024 * 1024,
    extensions: [".jpeg", ".jpg", ".png"],
    mimeTypes: ["image/jpeg", "image/png"],
    description: undefined,
    styleClass: "aspect-square gap-3 text-sm max-w-48",
    clearButtonPosition: "right-2 top-2",
    clearButton: X,
  },
};
