import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project } from "../../common/types/project";

interface ProjectStore {
  project: Partial<Project>;
  updateProject: (updates: Partial<Project>) => void;
  resetProject: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      project: {},

      updateProject: (updates) => {
        set((state) => ({
          project: {
            ...state.project,
            ...updates,
            updatedAt: new Date()
              .toISOString()
              .replace("T", " ")
              .replace("Z", ""),
          },
        }));
      },

      resetProject: () => {
        set({ project: {} });
      },
    }),
    {
      name: "beatblock-project-storage",
    }
  )
);
