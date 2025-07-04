import { create } from "zustand";
import type { project } from "../../common/types/project";

interface CatalogStore {
  content: { projects: project } | null;
  fetchContent: () => Promise<void>;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  content: null,

  fetchContent: async () => {
    try {
      const response = await fetch("http://localhost:8080/api/project");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      set({ content: data });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  },
}));
