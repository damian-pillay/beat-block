import type { ProjectRequest } from "../types/projectRequest";
import type { ProjectResponse } from "../types/projectResponse";

export function toProjectResponse(project: ProjectRequest): ProjectResponse {
  return {
    id: -1, // Placeholder or generated
    name: project.name ?? "Untitled Project",
    description: project.description ?? null,
    keySignature: project.keySignature ?? null,
    bpm: project.bpm ?? null,
    genre: project.genre ?? null,
    daw: project.daw ?? "Unknown DAW",
    hasFile: !!project.compressedFile,
    hasAudio: !!project.audioFile,
    hasImage: !!project.imageFile,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
