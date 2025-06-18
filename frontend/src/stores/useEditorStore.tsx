import { create } from "zustand";

interface Editor {
  // filepath: string;
  // audiopath?: string;
  // imagepath?: string;
  // title: string;
  // description?: string;
  // key?: string;
  // bpm?: number;
  // genre?: string;
  // daw: string;

  pageIndex: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

export const useEditorStore = create<Editor>((set) => ({
  pageIndex: 0,
  setPageIndex: (index) => set({ pageIndex: index }),
  nextPage: () => set((state) => ({ pageIndex: state.pageIndex + 1 })),
  prevPage: () =>
    set((state) => ({ pageIndex: Math.max(0, state.pageIndex - 1) })),
  resetPage: () => set({ pageIndex: 0 }),
}));
