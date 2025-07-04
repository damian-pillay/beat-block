export type ProjectCreateRequest = {
  name?: string;
  description?: string;
  keySignature?: string;
  bpm?: number;
  genre?: string;
  daw?: string;
  file?: File;
  audio?: File;
  image?: File;
};
