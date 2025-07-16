export type ProjectResponse = {
  id: number;
  name: string;
  description?: string | null;
  keySignature?: string | null;
  bpm?: number | null;
  genre?: string | null;
  daw: string;
  hasFile: boolean;
  hasAudio: boolean;
  hasImage: boolean;
  createdAt: string;
  updatedAt: string;
};
