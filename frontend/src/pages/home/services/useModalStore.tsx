import { create } from "zustand";

interface ModalStore {
  setButtonPosition: (rect: DOMRect) => void;
  buttonPosition: DOMRect | null;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  buttonPosition: null,
  setButtonPosition: (rect) => set({ buttonPosition: rect }),
}));
