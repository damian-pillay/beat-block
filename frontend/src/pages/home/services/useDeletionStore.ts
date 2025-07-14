import { create } from "zustand";

interface DeletionState {
  deletingIds: Set<number>;
  markDeleting: (id: number) => void;
  clearDeleting: (id: number) => void;
}

export const useDeletionStore = create<DeletionState>((set) => ({
  deletingIds: new Set(),

  markDeleting: (id) =>
    set((state) => {
      const newSet = new Set(state.deletingIds);
      newSet.add(id);
      return { deletingIds: newSet };
    }),

  clearDeleting: (id) =>
    set((state) => {
      const newSet = new Set(state.deletingIds);
      newSet.delete(id);
      return { deletingIds: newSet };
    }),
}));
