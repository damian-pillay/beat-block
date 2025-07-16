import { type ProjectResponse } from "../types/projectResponse";

const fileMap = {
  compressedFile: "hasFile",
  audioFile: "hasAudio",
  imageFile: "hasImage",
} as const;

type FileField = keyof typeof fileMap;

export function checkField(
  project?: Partial<ProjectResponse>,
  field?: FileField
) {
  if (!project || !field) return false;

  const fileFlag = fileMap[field];
  const hasFieldFile = project[fileFlag as keyof ProjectResponse];

  return !!hasFieldFile;
}
