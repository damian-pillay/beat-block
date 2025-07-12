import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import useProjectPublish from "../../../hooks/useProjectPublish";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEditorStore } from "../../../services/useEditorStore";

export default function PublishButton() {
  const { project, resetProject } = useProjectStore();
  const { mutateAsync: publishProject } = useProjectPublish();
  const { setPageIndex } = useEditorStore();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
    setPageIndex(0);

    const publishPromise = publishProject(project).then(() => {
      resetProject();
    });

    toast.promise(publishPromise, {
      pending: `Publishing '${project.name}'...`,
      success: `Congrats! '${project.name}' has been published`,
      error: {
        render({ data }: { data: AxiosError }) {
          console.log(data);
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
