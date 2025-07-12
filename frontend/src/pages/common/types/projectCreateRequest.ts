export type ProjectCreateRequest = {
  name?: string;
  description?: string;
  keySignature?: string;
  bpm?: number;
  genre?: string;
  daw?: string;
  compressedFile?: File;
  audioFile?: File;
  imageFile?: File;
};
