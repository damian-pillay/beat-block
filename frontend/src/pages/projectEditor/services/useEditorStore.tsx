import { create } from "zustand";
import { storage } from "../../common/services/storage";

interface Editor {
  pageIndex: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

const PAGE_INDEX_KEY = "editor_page_index";
function getInitialPageIndex() {
  const stored = storage.get(PAGE_INDEX_KEY);
  return stored !== null ? Number(stored) : 0;
}

export const useEditorStore = create<Editor>((set) => ({
  pageIndex: getInitialPageIndex(),
  setPageIndex: (index) => {
    set({ pageIndex: index });
    storage.set(PAGE_INDEX_KEY, String(index));
    set({ pageIndex: index });
  },
  nextPage: () =>
    set((state) => {
      const next = state.pageIndex + 1;
      storage.set(PAGE_INDEX_KEY, String(next));
      return { pageIndex: next };
    }),
  prevPage: () =>
    set((state) => {
      const prev = Math.max(0, state.pageIndex - 1);
      storage.set(PAGE_INDEX_KEY, String(prev));
      return { pageIndex: prev };
    }),
  resetPage: () => {
    storage.set(PAGE_INDEX_KEY, "0");
    set({ pageIndex: 0 });
  },
}));
