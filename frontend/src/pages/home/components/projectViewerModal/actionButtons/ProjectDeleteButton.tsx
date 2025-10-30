import { ProjectDeleteIcon } from "../../../../../assets/icons";
import useDeleteProject from "../../../hooks/useDeleteProject";
import ProjectActionButton from "./ProjectActionButton";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useDeletionStore } from "../../../services/useDeletionStore";
import { queryClient } from "../../../../../lib/queryClient";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DeleteConfirmationButton from "./DeleteConfirmationButton";

export default function ProjectDeleteButton({
  projectId,
  projectName,
  onDelete,
}: {
  projectId: number;
  projectName?: string;
  onDelete: () => void;
}) {
  const alt = "Delete Project";
  const { markDeleting, clearDeleting } = useDeletionStore();
  const { mutateAsync: deleteProject } = useDeleteProject();
  const [isDeleting, setIsDeleting] = useState(false);

  function toggleIsDeleting() {
    setIsDeleting((prev) => !prev);
  }

  function handleDelete() {
    onDelete();

    setTimeout(() => {
      const deletePromise = deleteProject(projectId).then(() => {
        markDeleting(projectId);
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["catalog"] }).then(() => {
            clearDeleting(projectId);
          });
        }, 300);
      });

      toast.promise(deletePromise, {
        pending: `Deleting '${projectName}'...`,
        success: `'${projectName}' has been Deleted`,
        error: {
          render({ data }: { data: AxiosError }) {
            return `Failed to delete: ${data?.message || "Unknown error"}`;
          },
        },
      });
    }, 300);
  }

  return (
    <div className="relative h-18">
      <ProjectActionButton
        alt={alt}
        icon={ProjectDeleteIcon}
        onClick={toggleIsDeleting}
      />
      <AnimatePresence>
        {isDeleting && (
          <DeleteConfirmationButton
            onDelete={handleDelete}
            onKeep={() => setIsDeleting(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
