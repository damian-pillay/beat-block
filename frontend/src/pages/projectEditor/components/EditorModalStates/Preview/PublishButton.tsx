import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import useProjectPublish from "../../../hooks/useProjectPublish";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../common/utils/toastConfig";

export default function PublishButton() {
  const { project, resetProject } = useProjectStore();
  const { mutate: publishProject } = useProjectPublish();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
    publishProject(project, {
      onSuccess: () => {
        showSuccessToast(`Congrats! '${project.name}' has been published`);
        resetProject();
      },
      onError: (error) => {
        showErrorToast(`Failed to publish project: ${error.message}`);
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
