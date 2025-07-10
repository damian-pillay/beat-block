import { AnimatePresence, motion } from "framer-motion";
import { useProjectStore } from "../../../services/useProjectStore";
import { X, Trash2 } from "lucide-react";
import { dropzones } from "../../../utils/dropzoneConfig";
import { formatList, formatFileSize } from "../../../helpers/formatters";
import {
  showErrorToast,
  showInfoToast,
} from "../../../../common/utils/toastConfig";

const image: string = "imageFile";

type FileDropZoneProps = {
  field: "compressedFile" | "audioFile" | "imageFile";
};

export default function FileDropZone({ field }: FileDropZoneProps) {
  const { updateProject, project } = useProjectStore();

  const file = project[field];

  function handleDrop(event: React.DragEvent<HTMLElement>): void {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    if (files.length !== 1) {
      showErrorToast("Please only drop one file.");
      return;
    }

    if (!dropzones[field].mimeTypes.includes(files[0].type)) {
      showInfoToast(files[0].type);
      showErrorToast("Please drop a valid file type");
      return;
    }
    updateProject({ [field]: files[0] });
  }

  let dropzoneStyle: string = "bg-[#1c1b1b] border-dashed";
  if (file) {
    dropzoneStyle = "bg-[#004222] border-green-400";
  }

  return (
    <motion.section
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      className={`relative flex flex-col justify-center items-center rounded-2xl drag-none border-2 transition ${dropzoneStyle} ${
        field == image ? " aspect-square gap-3 text-sm max-w-48" : "h-22"
      }`}
    >
      <AnimatePresence mode="wait">
        {file ? (
          <>
            <motion.h4
              key="file-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex font-bold w-full px-5"
            >
              {dropzones[field].title}
            </motion.h4>
            <motion.p
              key="file-size"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-full px-5 whitespace-pre"
            >
              <span className="truncate">{file.name}</span>
              {"  •  "}
              <span>{formatFileSize(file.size)}</span>
            </motion.p>
          </>
        ) : (
          <>
            <motion.h4
              key="placeholder-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center font-bold"
            >
              {dropzones[field].title}
            </motion.h4>
            <p className="whitespace-pre-line text-center">
              {field != image
                ? `Drag & drop, or browse ${formatList(
                    dropzones[field].extensions
                  )}`
                : `Drag & drop, or browse\n${formatList(
                    dropzones[field].extensions
                  )}`}
            </p>
            {dropzones[field].description && !file ? (
              <p className="opacity-30">{dropzones[field].description}</p>
            ) : undefined}
          </>
        )}
      </AnimatePresence>

      {file && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => updateProject({ [field]: undefined })}
          className={`absolute cursor-pointer ${
            field != image ? "right-6" : "right-2 top-2"
          }`}
          whileHover={{
            rotate: [-4, 4, -4, 4, -4],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
        >
          {field != image ? <Trash2 /> : <X />}
        </motion.button>
      )}
    </motion.section>
  );
}
