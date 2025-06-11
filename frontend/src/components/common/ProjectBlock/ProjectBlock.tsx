import { DefaultAudioImage } from "../../../assets/icons";
import ProjectMetaData from "./ProjectMetaData";
import ProjectDescription from "./ProjectDescription";
import { motion } from "framer-motion";

export default function ProjectBlock({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.01, ease: "easeIn", type: "spring" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.7)",
      }}
      className="flex md:h-48 h-38 w-full mx-auto [@media(max-width:1280px)]:max-w-[780px] max-w-2xl rounded-4xl bg-[#272626] p-5 justify-between gap-5 items-center active:bg-[#383737] transition cursor-pointer select-none"
    >
      <img
        src={DefaultAudioImage}
        alt="default audio icon"
        className="h-full rounded-3xl object-cover drag-none"
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
    </motion.div>
  );
}
