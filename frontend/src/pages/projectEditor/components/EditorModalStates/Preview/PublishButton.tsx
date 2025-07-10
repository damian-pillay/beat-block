import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import useProjectPublish from "../../../hooks/useProjectPublish";
import { toast } from "react-toastify";
import { useCatalogStore } from "../../../../home/services/useCatalogStore";
import { AxiosError } from "axios";

export default function PublishButton() {
  const { project, resetProject } = useProjectStore();
  const { mutateAsync: publishProject } = useProjectPublish();
  const { fetchContent } = useCatalogStore();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");

    const publishPromise = publishProject(project).then(() => {
      resetProject();
      fetchContent();
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
