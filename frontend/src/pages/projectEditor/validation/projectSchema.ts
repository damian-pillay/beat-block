import * as yup from "yup";
import { dropzoneConfig } from "../../common/utils/dropzoneConfig";

export const filesAndInfoCreateSchema = yup.object({
  name: yup.string().required("Title is a required field").max(50),
  description: yup.string().max(100),
  compressedFile: yup
    .mixed<File>()
    .required("Project files is a required field")
    .test(
      "fileSize",
      `File size must be less than ${
        dropzoneConfig["compressedFile"].maxSize / (1024 * 1024)
      }MB`,
      (value) => value && value.size <= dropzoneConfig["compressedFile"].maxSize
    ),
  audioFile: yup
    .mixed<File>()
    .test(
      "fileSize",
      `File size must be less than ${
        dropzoneConfig["audioFile"].maxSize / (1024 * 1024)
      }MB`,
      (value) => {
        if (!value) return true;
        return value.size <= dropzoneConfig["audioFile"].maxSize;
      }
    ),
  imageFile: yup
    .mixed<File>()
    .test(
      "fileSize",
      `File size must be less than ${
        dropzoneConfig["imageFile"].maxSize / (1024 * 1024)
      }MB`,
      (value) => {
        if (!value) return true;
        return value.size <= dropzoneConfig["imageFile"].maxSize;
      }
    ),
});

export const filesAndInfoUpdateSchema = yup.object({
  name: yup.string().required("Title is a required field").max(50),
  description: yup.string().max(100),
});

export const metadataSchema = yup.object({
  daw: yup.string().required("Digital Audio Workstation is a required"),
  bpm: yup.number().min(60).max(255),
});
