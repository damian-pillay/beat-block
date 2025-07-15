import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import useProjectPublish from "../../../hooks/useProjectPublish";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEditorStore } from "../../../services/useEditorStore";
import { useQueryClient } from "@tanstack/react-query";

export default function PublishButton() {
  const { requestForm: project, resetRequestForm: resetProject } =
    useProjectStore();
  const { mutateAsync: publishProject } = useProjectPublish();
  const { setPageIndex } = useEditorStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleClick() {
    navigate("/");
    setPageIndex(0);

    const publishPromise = publishProject(project).then(() => {
      resetProject();
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    });

    toast.promise(publishPromise, {
      pending: `Publishing '${project.name}'...`,
      success: `Congrats! '${project.name}' has been published`,
      error: {
        render({ data }: { data: AxiosError }) {
          return `Failed to publish: ${data?.message || "Unknown error"}`;
        },
      },
    });
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer"
    >
      PUBLISH
    </motion.button>
  );
}
