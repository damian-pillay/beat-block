import { useNavigate } from "react-router-dom";
import { ProjectEditIcon } from "../../../../../assets/icons";
import type { ProjectResponse } from "../../../../common/types/projectResponse";
import { useProjectStore } from "../../../../projectEditor/services/useProjectStore";
import ProjectActionButton from "./ProjectActionButton";

export default function ProjectEditButton({
  project,
  closeModal,
}: {
  project: ProjectResponse;
  closeModal: () => void;
}) {
  const { hydrateRequestForm } = useProjectStore();
  const navigate = useNavigate();

  function handleClick() {
    closeModal();

    hydrateRequestForm(project);
    navigate("/create");
  }

  return (
    <ProjectActionButton
      alt={"Edit Project"}
      icon={ProjectEditIcon}
      onClick={handleClick}
    />
  );
}
