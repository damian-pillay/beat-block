export type ProjectResponse = {
  id: number;
  name: string;
  description?: string;
  keySignature?: string;
  bpm?: number;
  genre?: string;
  daw: string;
  hasFile?: boolean;
  hasAudio?: boolean;
  hasImage?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
