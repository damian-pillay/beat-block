import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { DefaultAudioImage } from "../../../../assets/icons";
import ProjectDescription from "../../../common/components/projectBlock/ProjectDescription";
import ProjectMetaData from "../../../common/components/projectBlock/ProjectMetaData";
import type { ProjectResponse } from "../../../common/types/projectResponse";
import ProjectTimeData from "./ProjectTimeData";
import {
  DiagonalDotTexture,
  HalfGridTexture,
  OrbTexture,
} from "../../../../assets/textures";
import ProjectDownloadButton from "./ProjectDownloadButton";
import {
  actionButtonConfig,
  downloadButtonConfig,
} from "../../utils/projectViewerModalConfig";
import ProjectActionButton from "./actionButtons/ProjectActionButton";
import ProjectDeleteButton from "./actionButtons/ProjectDeleteButton";
import ProjectEditButton from "./actionButtons/ProjectEditButton";

interface HandleAwayClickProps {
  handleAwayClick: () => void;
  project: ProjectResponse;
  image: string | null;
}

export default function ProjectViewerModal({
  handleAwayClick,
  project,
  image,
}: HandleAwayClickProps) {
  return createPortal(
    <>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-49"
        onClick={handleAwayClick}
      />
      <motion.div
        key="project-modal"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{
          scale: 0,
          opacity: 0,
          transition: { duration: 0.3, type: "tween" },
        }}
        transition={{ duration: 0.8, type: "spring", delay: 0.02 }}
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-200 w-[90%] z-50 rounded-4xl bg-[#272626] shadow-lg"
      >
        <div className="relative flex flex-col gap-7 p-8 rounded-4xl ">
          <img
            src={HalfGridTexture}
            className="absolute right-0 top-1/4 h-28"
          />
          <img
            src={DiagonalDotTexture}
            className="absolute top-0 right-1/4 h-25 rotate-270"
          />
          <section className="w-full flex h-60 gap-5">
            <img
              src={image ?? DefaultAudioImage}
              alt="default-audio-image"
              className="rounded-3xl object-cover aspect-square drag-none w-1/3"
            />
            <section className="flex flex-col justify-between w-full h-full py-0">
              <ProjectDescription
                name={project.name}
                description={project.description}
              />
              <ProjectMetaData
                keySignature={project.keySignature}
                genre={project.genre}
                bpm={project.bpm}
                daw={project.daw}
              />
              <ProjectTimeData
                timeCreated={project.createdAt}
                timeUpdated={project.updatedAt}
              />
            </section>
          </section>
          <section className="h-1/3 w-full flex items-center justify-between md:gap-0 gap-10">
            <section className="flex flex-col w-1/3 gap-2">
              {downloadButtonConfig.map((item) => (
                <ProjectDownloadButton
                  key={item.title}
                  id={project.id}
                  type={item.title}
                  title={project.name}
                />
              ))}
            </section>
            <img src={OrbTexture} className="hidden md:block h-30" />
            <section className="flex justify-end md:gap-7 gap-3">
              <ProjectDeleteButton
                projectId={project.id}
                projectName={project.name}
                onDelete={handleAwayClick}
              />
              <ProjectEditButton
                closeModal={handleAwayClick}
                project={project}
              />
              {actionButtonConfig.map((item) => (
                <ProjectActionButton
                  key={item.title}
                  icon={item.icon}
                  alt={item.title}
                />
              ))}
            </section>
          </section>
        </div>
      </motion.div>
    </>,
    document.body
  );
}
