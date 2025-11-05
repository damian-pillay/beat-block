import { create } from "zustand";

interface SearchBarState {
  searchBarText: string | undefined;
  setSearchBarText: (searchText: string) => void;
}

export const useSearchBarStore = create<SearchBarState>((set) => ({
  searchBarText: undefined,
  setSearchBarText: (searchText) => set({ searchBarText: searchText }),
}));
