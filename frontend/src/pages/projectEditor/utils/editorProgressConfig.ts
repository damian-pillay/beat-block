import {
  filesAndInfoCreateSchema,
  filesAndInfoUpdateSchema,
  metadataSchema,
} from "../validation/projectSchema";
import { type ProjectRequest } from "../../common/types/projectRequest";

export type EditorStep = {
  title: string;
  color: [string, string, string];
  validate: {
    create: (project: ProjectRequest) => void;
    edit: (project: ProjectRequest) => void;
  };
};

export const editorProgressConfig: EditorStep[] = [
  {
    title: "Files & Basic Information",
    color: ["#ffffff", "#4ade80", "#4ade80"],
    validate: { create: () => {}, edit: () => {} },
  },
  {
    title: "Metadata",
    color: ["#9ca3af", "#ffffff", "#4ade80"],
    validate: {
      create: (project) => {
        filesAndInfoCreateSchema.validateSync(project);
      },
      edit: (project) => {
        filesAndInfoUpdateSchema.validateSync(project);
      },
    },
  },
  {
    title: "Publish",
    color: ["#9ca3af", "#9ca3af", "#ffffff"],
    validate: {
      create: (project) => {
        metadataSchema.validateSync(project);
      },
      edit: (project) => {
        metadataSchema.validateSync(project);
      },
    },
  },
];
