import { motion } from "framer-motion";
import DawSelection from "./DawSelection";
import AudioFeatures from "./AudioFeatures";

export default function Metadata() {
  return (
    <>
      <motion.section className="flex flex-col w-full h-full border justify-between">
        <AudioFeatures />
        <DawSelection />
      </motion.section>
    </>
  );
}
