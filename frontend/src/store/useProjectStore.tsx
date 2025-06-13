import { create } from "zustand";

interface ProjectStore {
  content: any;
  fetchContent: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
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
