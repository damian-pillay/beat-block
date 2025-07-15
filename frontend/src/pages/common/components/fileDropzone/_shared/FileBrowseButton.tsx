import { useRef } from "react";
import { dropzoneConfig } from "../../../utils/dropzoneConfig";
import type { DropzoneField } from "../../../types/dropzoneField";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useFileHandler from "../../../hooks/useFileHandler";

interface FileBrowseButtonProps {
  field: DropzoneField;
  isProjectUpload?: boolean;
}

export default function FileBrowseButton({
  field,
  isProjectUpload = false,
}: FileBrowseButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleFileInput } = useFileHandler(field);
  const navigate = useNavigate();

  function handleBrowseClick() {
    inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const filesArray = Array.from(files);

    handleFileInput(filesArray);

    if (isProjectUpload) {
      navigate("/create");
    }
  }

  return (
    <>
      <motion.button
        style={{ color: "#60a5fa" }}
        whileHover={{
          color: "#93c5fd",
          transition: {
            duration: 0.1,
            ease: "easeInOut",
          },
        }}
        whileTap={{
          color: "#848484",
          transition: { duration: 0.05, ease: "backOut" },
        }}
        className="rounded-sm select-none cursor-pointer"
        onClick={handleBrowseClick}
      >
        browse
      </motion.button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={dropzoneConfig[field].extensions.join(", ")}
      />
    </>
  );
}
