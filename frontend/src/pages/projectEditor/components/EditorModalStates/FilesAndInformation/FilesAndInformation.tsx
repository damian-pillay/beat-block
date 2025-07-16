import FileUploadSection from "./FileUploadSection";
import BasicDataSection from "./BasicDataSection";
import EditorButton from "../../EditorModal/EditorButton";
import {
  filesAndInfoCreateSchema,
  filesAndInfoUpdateSchema,
} from "../../../validation/projectSchema";
import { useProjectStore } from "../../../services/useProjectStore";

export default function FilesAndInformation() {
  const { mode } = useProjectStore();
  const isEditing = mode == "edit";

  return (
    <div className="flex flex-col justify-between gap-4 items-center h-full w-full drag-none">
      <FileUploadSection />
      <hr className="w-full h-[4px] flex-shrink-0 bg-white opacity-10 rounded-sm" />
      <BasicDataSection />
      <div
        key={"next"}
        className={`flex w-full justify-end items-center gap-4`}
      >
        <EditorButton
          validationSchema={
            isEditing ? filesAndInfoUpdateSchema : filesAndInfoCreateSchema
          }
        />
      </div>
    </div>
  );
}
