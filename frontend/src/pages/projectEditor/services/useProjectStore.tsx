import { create } from "zustand";
import type { ProjectRequest } from "../../common/types/projectRequest";
import type { ProjectResponse } from "../../common/types/projectResponse";

interface ProjectStore {
  requestForm: ProjectRequest;
  updateRequestForm: (updates: ProjectRequest) => void;
  resetRequestForm: () => void;

  mode: "edit" | "create";
  project?: Partial<ProjectResponse>;

  hydrateRequestForm: (currentProject: ProjectResponse) => void;
}

export const useProjectStore = create<ProjectStore>()((set) => ({
  requestForm: {},
  mode: "create",

  hydrateRequestForm: (currentProject) => {
    set({
      mode: "edit",
      project: currentProject,
      requestForm: {
        name: currentProject.name,
        description: currentProject.description,
        keySignature: currentProject.keySignature,
        bpm: currentProject.bpm,
        genre: currentProject.genre,
        daw: currentProject.daw,
      },
    });
  },

  updateRequestForm: (updates) => {
    set((state) => ({
      requestForm: {
        ...state.requestForm,
        ...updates,
      },
    }));
  },

  resetRequestForm: () => {
    set({ requestForm: {} });
  },
}));
