import { motion } from "framer-motion";
import { UploadIcon } from "../../../../../assets/icons";
import FileBrowseButton from "../_shared/FileBrowseButton";
import { dropzoneConfig } from "../../../utils/dropzoneConfig";

export default function ProjectUploadPlaceholder() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.5,
          duration: 0.2,
          ease: "easeIn",
        }}
        className=""
      >
        Drop project files here, or{" "}
        <FileBrowseButton field="compressedFile" isProjectUpload={true}>
          browse
        </FileBrowseButton>{" "}
        files
      </motion.p>
      <motion.img
        className="object-cover h-20 w-25 drag-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.5,
          duration: 0.2,
          ease: "easeIn",
        }}
        src={UploadIcon}
        alt="Upload Icon"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.2,
          ease: "easeIn",
        }}
        exit={{ opacity: 0, y: 10 }}
        className=""
      >
        You can upload files in .zip formats only.{" "}
        <span className="text-zinc-500">{` (${
          dropzoneConfig["compressedFile"].maxSize / (1024 * 1024)
        }MB Max)`}</span>
      </motion.p>
    </div>
  );
}
