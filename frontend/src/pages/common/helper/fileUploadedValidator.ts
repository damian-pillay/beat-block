import { type ProjectResponse } from "../types/projectResponse";
import { type DropzoneField } from "../types/dropzoneField";

const fileMap = {
  compressedFile: "hasFile",
  audioFile: "hasAudio",
  imageFile: "hasImage",
} as const;

type ProjectFileResponseField = "hasFile" | "hasAudio" | "hasImage";

export function checkFileUploaded(
  project?: Partial<ProjectResponse>,
  field?: DropzoneField
) {
  if (!project || !field) return false;

  const fileFlag = fileMap[field];
  const isFileAlreadyUploaded = project[fileFlag as ProjectFileResponseField];

  return isFileAlreadyUploaded ?? false;
}
