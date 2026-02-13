import { DefaultAudioImage } from "../../../../assets/icons";
import ProjectMetaData from "./ProjectMetaData";
import ProjectDescription from "./ProjectDescription";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectResponse } from "../../types/projectResponse";
import { useState } from "react";
import ProjectViewerModal from "../../../home/components/projectViewerModal/ProjectViewerModal";
import useFetchFile from "../../../home/hooks/useFetchFile";
import { useEffect } from "react";

interface ProjectBlockProps {
  project: ProjectResponse;
  isDeleting: boolean;
  previewImage?: string | null;
  isPreview?: boolean;
}

export default function ProjectBlock({
  isPreview = false,
  previewImage = undefined,
  project,
  isDeleting,
}: ProjectBlockProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const { data } = useFetchFile({
    field: "image",
    projectId: project.id,
    isEnabled: project.hasImage && project.id != -1,
  });

  useEffect(() => {
    if (!data) return;

    const objectUrl = URL.createObjectURL(data);
    setImage(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [data]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isDeleting && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            layout={true}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.7)",
              transition: { duration: 0.4, ease: "easeIn", type: "spring" },
            }}
            whileTap={{
              backgroundColor: "#383737",
              transition: { duration: 0.03, ease: "easeOut" },
            }}
            onClick={!isPreview ? () => setIsModalOpen(true) : undefined}
            className="project-block flex md:h-48 h-38 w-full mx-auto [@media(max-width:1280px)]:max-w-[780px] max-w-2xl rounded-4xl bg-[#272626] p-5 justify-between gap-5 items-center cursor-pointer select-none"
          >
            <motion.img
              key={previewImage ?? image ?? DefaultAudioImage}
              src={previewImage ?? image ?? DefaultAudioImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              alt="default audio icon"
              className="h-full rounded-3xl object-cover drag-none aspect-square"
            />
            <div className="flex flex-col justify-between w-full h-full">
              <ProjectDescription
                name={project.name}
                description={project.description}
              />
              <ProjectMetaData
                keySignature={project.keySignature}
                bpm={project.bpm}
                genre={project.genre}
                daw={project.daw}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <ProjectViewerModal
            handleAwayClick={() => setIsModalOpen(false)}
            project={project}
            image={image}
          />
        )}
      </AnimatePresence>
    </>
  );
}
