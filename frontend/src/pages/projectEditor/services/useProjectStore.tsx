import { create } from "zustand";
import type { ProjectCreateRequest } from "../../common/types/projectCreateRequest";

interface ProjectStore {
  project: ProjectCreateRequest;
  updateProject: (updates: ProjectCreateRequest) => void;
  resetProject: () => void;
}

export const useProjectStore = create<ProjectStore>()((set) => ({
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
}));
