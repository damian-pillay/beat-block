import * as yup from "yup";

export const filesAndInfoSchema = yup.object({
  name: yup.string().required("Title is a required field").max(50),
  description: yup.string().max(100),
  compressedFile: yup
    .mixed<File>()
    .required("Project files is a required field"),
});

export const metadataSchema = yup.object({
  daw: yup.string().required("Digital Audio Workstation is a required"),
  bpm: yup.number().min(60).max(255),
});
