import { motion } from "framer-motion";
import FileDropzone from "../../../../common/components/fileDropzone/FileDropzone";

export default function FileUploadSection() {
  return (
    <motion.section className="flex flex-col gap-2 w-full h-full drag-none">
      <h4 className="font-bold">FILES FOR UPLOAD</h4>
      <FileDropzone field="compressedFile" />
      <FileDropzone field="audioFile" />
    </motion.section>
  );
}
