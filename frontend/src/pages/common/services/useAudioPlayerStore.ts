import { create } from "zustand";
import { type AudioData } from "../types/audioData";

interface AudioPlayerState {
  isOpen: boolean;
  isPlaying: boolean;
  filePath?: string;
  audioData?: AudioData;
  queueAudio: (data: AudioData, path: string) => void;
  togglePlaying: () => void;
  closePlayer: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  isOpen: false,
  isPlaying: false,

  queueAudio: (data, path) =>
    set({
      audioData: data,
      isOpen: true,
      isPlaying: true,
      filePath: path,
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
