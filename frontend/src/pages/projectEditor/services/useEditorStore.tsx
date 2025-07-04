import { create } from "zustand";

interface Editor {
  pageIndex: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

export const useEditorStore = create<Editor>((set) => ({
  pageIndex: 0,
  setPageIndex: (index) => {
    set({ pageIndex: index });
  },
  nextPage: () =>
    set((state) => {
      const next = state.pageIndex + 1;
      return { pageIndex: next };
    }),
  prevPage: () =>
    set((state) => {
      const prev = Math.max(0, state.pageIndex - 1);
      return { pageIndex: prev };
    }),
  resetPage: () => {
    set({ pageIndex: 0 });
  },
}));
