import { create } from "zustand";
import type { ProjectRequest } from "../../common/types/projectRequest";
import type { ProjectResponse } from "../../common/types/projectResponse";

interface ProjectStore {
  requestForm: ProjectRequest;
  updateRequestForm: (updates: ProjectRequest) => void;
  resetRequestForm: () => void;

  mode: "edit" | "create";
  projectResponse?: ProjectResponse;
  currentProjectId: number | null;

  hydrateRequestForm: (currentProject: ProjectResponse) => void;
}

export const useProjectStore = create<ProjectStore>()((set) => ({
  requestForm: {},
  mode: "create",
  currentProjectId: null,

  hydrateRequestForm: (currentProject) => {
    set({
      mode: "edit",
      projectResponse: currentProject,
      currentProjectId: currentProject.id,
      requestForm: {
        name: currentProject.name,
        description: currentProject.description ?? undefined,
        keySignature: currentProject.keySignature ?? undefined,
        bpm: currentProject.bpm ?? undefined,
        genre: currentProject.genre ?? undefined,
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
    set({
      requestForm: {},
      mode: "create",
    });
  },
}));
