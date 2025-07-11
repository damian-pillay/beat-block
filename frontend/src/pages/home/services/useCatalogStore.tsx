import { create } from "zustand";
import type { project } from "../../common/types/project";

interface CatalogStore {
  catalog: { projects: project } | null;
  fetchCatalog: () => Promise<void>;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  catalog: null,

  fetchCatalog: async () => {
    try {
      const response = await fetch("http://localhost:8080/api/project");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      set({ catalog: data });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  },
}));
