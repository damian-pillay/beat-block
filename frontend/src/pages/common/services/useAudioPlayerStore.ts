import { create } from "zustand";

interface AudioPlayerState {
  isOpen: boolean;
  isPlaying: boolean;
  filePath?: string;
  setFilePath: (newPath: string) => void;
  togglePlaying: () => void;
  closePlayer: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  isOpen: false,
  isPlaying: false,

  setFilePath: (newPath) =>
    set({
      isOpen: true,
      isPlaying: true,
      filePath: newPath,
    }),

  togglePlaying: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  closePlayer: () =>
    set({
      isPlaying: false,
      isOpen: false,
      filePath: undefined,
    }),
}));
