import { motion } from "framer-motion";
import TextInput from "./TextInput";
import { useProjectStore } from "../../../services/useProjectStore";
import FileDropzone from "../../../../common/components/fileDropzone/FileDropzone";

export default function BasicDataSection() {
  const { project, updateProject } = useProjectStore();

  return (
    <motion.section className="flex gap-6 w-full h-full drag-none">
      {/* <motion.section className="flex flex-col justify-center items-center rounded-2xl h-full bg-[#1c1b1b] gap-10 aspect-square border-2 border-dashed drag-none"></motion.section> */}
      <FileDropzone field="imageFile" />
      <motion.section className="flex flex-col w-full h-full justify-between">
        <TextInput
          title="title *"
          placeholder="Give your track a name."
          charLimit={50}
          lineHeight={1}
          value={project.name}
          setValue={(value) => updateProject({ name: value })}
        />
        <TextInput
          title="description"
          placeholder="Share the story, vibe or inspiration behind your track."
          charLimit={100}
          lineHeight={2}
          value={project.description}
          setValue={(value) => updateProject({ description: value })}
        />
      </motion.section>
    </motion.section>
  );
}
