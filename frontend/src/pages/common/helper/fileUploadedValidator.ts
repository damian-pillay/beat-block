import { type ProjectResponse } from "../types/projectResponse";

const fileMap = {
  compressedFile: "hasFile",
  audioFile: "hasAudio",
  imageFile: "hasImage",
} as const;

type FileField = keyof typeof fileMap;
type ProjectFileResponseField = "hasFile" | "hasAudio" | "hasImage";

export function checkFileUploaded(
  project?: Partial<ProjectResponse>,
  field?: FileField
) {
  if (!project || !field) return false;

  const fileFlag = fileMap[field];
  const isFileAlreadyUploaded = project[fileFlag as ProjectFileResponseField];

  return isFileAlreadyUploaded;
}
