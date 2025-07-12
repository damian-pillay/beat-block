import { motion } from "framer-motion";
import TextInput from "./TextInput";
import { useProjectStore } from "../../../services/useProjectStore";
import FileDropzone from "../../../../common/components/fileDropzone/fileDropzone/FileDropzone";

export default function BasicDataSection() {
  const { project, updateProject } = useProjectStore();

  return (
    <motion.section className="flex gap-6 w-full h-full drag-none">
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
