import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEditorStore } from "../../services/useEditorStore";
import { useProjectStore } from "../../services/useProjectStore";
import { ValidationError } from "yup";
import { showErrorToast } from "../../../common/utils/toastConfig";
import { type ProjectCreateRequest } from "../../../common/types/projectCreateRequest";
import { editorProgressConfig } from "../../utils/editorProgressConfig";

export default function EditorProgressTitle() {
  const { pageIndex, setPageIndex } = useEditorStore();
  const { project } = useProjectStore();

  const handleClick = (
    index: number,
    validateFn: (project: ProjectCreateRequest) => void
  ) => {
    try {
      validateFn(project);
      setPageIndex(index);
    } catch (error) {
      if (error instanceof ValidationError) {
        showErrorToast(error.message);
      } else {
        showErrorToast("An unexpected error occurred");
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.2, ease: "easeIn" }}
    >
      <motion.h3
        transition={{ duration: 0.3 }}
        className="font-medium text-lg drag-none flex gap-3 items-center"
      >
        {editorProgressConfig.map((step, index) => (
          <div className="flex items-center gap-3" key={step.title}>
            <motion.button
              type="button"
              className="cursor-pointer"
              animate={{ color: step.color[pageIndex] }}
              transition={{ duration: 0.3 }}
              onClick={() => handleClick(index, step.validate)}
            >
              {step.title}
            </motion.button>

            {index < editorProgressConfig.length - 1 && (
              <motion.span
                animate={{ color: step.color[pageIndex] }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight />
              </motion.span>
            )}
          </div>
        ))}
      </motion.h3>
    </motion.section>
  );
}
