import { create } from "zustand";
import type { ProjectRequest } from "../../common/types/projectRequest";
import type { ProjectResponse } from "../../common/types/projectResponse";

interface ProjectStore {
  requestForm: ProjectRequest;
  updateRequestForm: (updates: ProjectRequest) => void;
  resetRequestForm: () => void;

  mode: "edit" | "create";
  projectResponse?: Partial<ProjectResponse>;

  hydrateRequestForm: (currentProject: ProjectResponse) => void;
}

export const useProjectStore = create<ProjectStore>()((set) => ({
  requestForm: {},
  mode: "create",

  hydrateRequestForm: (currentProject) => {
    set({
      mode: "edit",
      projectResponse: currentProject,
      requestForm: {
        name: currentProject.name ?? undefined,
        description: currentProject.description ?? undefined,
        keySignature: currentProject.keySignature ?? undefined,
        bpm: currentProject.bpm ?? undefined,
        genre: currentProject.genre ?? undefined,
        daw: currentProject.daw ?? undefined,
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
    set({
      requestForm: {},
      mode: "create",
    });
  },
}));
