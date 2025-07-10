export const dropzones = {
  compressedFile: {
    title: "Project Files *",
    extensions: [".zip", ".rar"],
    mimeTypes: ["application/zip", "application/x-zip-compressed"],
    description: undefined,
  },
  audioFile: {
    title: "Rendered Audio for Preview (Optional)",
    extensions: [".wav", ".mp3"],
    mimeTypes: ["audio/mpeg", "audio/wav"],
    description: undefined,
  },
  imageFile: {
    title: "Artwork",
    extensions: [".jpeg", ".jpg", ".png"],
    mimeTypes: ["image/jpeg", "image/png"],
    description: "1000 x 1000 px max",
  },
};
