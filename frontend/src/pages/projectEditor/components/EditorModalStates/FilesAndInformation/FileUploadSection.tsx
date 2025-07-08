import { motion } from "framer-motion";
import FileDropZone from "./EditorDropZone";

export default function FileUploadSection() {
  return (
    <motion.section className="flex flex-col gap-2 w-full h-full drag-none">
      <h4 className="font-bold">FILES FOR UPLOAD</h4>
      <FileDropZone field="compressedFile" />
      <FileDropZone field="audioFile" />
    </motion.section>
  );
}
