import { motion } from "framer-motion";
import { useEditorStore } from "../../services/useEditorStore";
import {
  ValidationError,
  type AnyObject,
  type ObjectSchema,
  type Maybe,
} from "yup";
import { useProjectStore } from "../../services/useProjectStore";
import { showErrorToast } from "../../../common/utils/toastConfig";

interface ValidationSchemaProps<T extends Maybe<AnyObject>> {
  validationSchema: ObjectSchema<T>;
}

export default function EditorButton<T extends Maybe<AnyObject>>({
  validationSchema,
}: ValidationSchemaProps<T>) {
  const { nextPage } = useEditorStore();
  const { requestForm: project } = useProjectStore();

  function handleClick() {
    try {
      validationSchema.validateSync(project);
      nextPage();
    } catch (error) {
      if (error instanceof ValidationError) {
        showErrorToast(error.message);
      } else {
        showErrorToast("An unexpected error occured");
      }
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer"
    >
      NEXT
    </motion.button>
  );
}
