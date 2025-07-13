import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  DefaultAudioImage,
  ProjectDeleteIcon,
  ProjectEditIcon,
  ProjectPlayIcon,
} from "../../../../assets/icons";
import ProjectDescription from "../../../common/components/projectBlock/ProjectDescription";
import ProjectMetaData from "../../../common/components/projectBlock/ProjectMetaData";
import type { project } from "../../../common/types/project";
import ProjectTimeData from "./ProjectTimeData";
import { OrbTexture } from "../../../../assets/textures";
import ProjectDownloadButton from "./ProjectDownloadButton";

interface HandleAwayClickProps {
  handleAwayClick: () => void;
  project: project;
}

export default function ProjectViewerModal({
  handleAwayClick,
  project,
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
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.02 }}
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-200 w-[90%] flex flex-col gap-7 z-50 p-8 rounded-4xl bg-[#272626] shadow-lg"
      >
        <section className="w-full flex h-60 gap-5">
          <img
            src={DefaultAudioImage}
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
            <ProjectDownloadButton title="Files" />
            <ProjectDownloadButton title="Audio" />
          </section>
          <img src={OrbTexture} className="hidden md:block h-32" />
          <section className="flex justify-end md:gap-7 gap-3">
            <button className="">
              <img
                src={ProjectDeleteIcon}
                className="object-contain h-18 cursor-pointer"
              />
            </button>
            <button className="">
              <img
                src={ProjectEditIcon}
                className="object-contain h-18 cursor-pointer"
              />
            </button>
            <button className="">
              <img
                src={ProjectPlayIcon}
                className="object-contain h-18 cursor-pointer"
              />
            </button>
          </section>
        </section>
      </motion.div>
    </>,
    document.body
  );
}
