import { create } from "zustand";
import type { ProjectCreateRequest } from "../../common/types/projectCreateRequest";

interface ProjectStore {
  project: ProjectCreateRequest;
  updateProject: (updates: ProjectCreateRequest) => void;
  resetProject: () => void;
  publishProject: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>()((set, get) => ({
  project: {},

  updateProject: (updates) => {
    set((state) => ({
      project: {
        ...state.project,
        ...updates,
        updatedAt: new Date().toISOString().replace("T", " ").replace("Z", ""),
      },
    }));
  },

  resetProject: () => {
    set({ project: {} });
  },

  publishProject: async () => {
    try {
      const formData = new FormData();
      const project = get().project;

      for (const key in project) {
        const value = project[key as keyof typeof project];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
      const response = await fetch("http://localhost:8080/api/project", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");
    } catch (error) {
      console.error("Failed to publish project:", error);
    }
  },
}));
