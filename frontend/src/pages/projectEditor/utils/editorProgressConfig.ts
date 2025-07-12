import {
  filesAndInfoSchema,
  metadataSchema,
} from "../validation/projectSchema";
import { type ProjectCreateRequest } from "../../common/types/projectCreateRequest";

export type EditorStep = {
  title: string;
  color: [string, string, string];
  validate: (project: ProjectCreateRequest) => void;
};

export const editorProgressConfig: EditorStep[] = [
  {
    title: "Files & Basic Information",
    color: ["#ffffff", "#4ade80", "#4ade80"],
    validate: () => {},
  },
  {
    title: "Metadata",
    color: ["#9ca3af", "#ffffff", "#4ade80"],
    validate: (project) => {
      filesAndInfoSchema.validateSync(project);
    },
  },
  {
    title: "Publish",
    color: ["#9ca3af", "#9ca3af", "#ffffff"],
    validate: (project) => {
      filesAndInfoSchema.validateSync(project);
      metadataSchema.validateSync(project);
    },
  },
];
