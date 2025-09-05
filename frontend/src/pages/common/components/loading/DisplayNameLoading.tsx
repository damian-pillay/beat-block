import { motion } from "framer-motion";
import { QuestionMark } from "../../../../assets/icons";

export default function DisplayNameLoading() {
  return (
    <>
      <motion.img
        src={QuestionMark}
        className="inline-block h-8"
        animate={{
          y: [0, -10, 0],
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.img
        src={QuestionMark}
        className="inline-block h-8"
        animate={{
          y: [0, -10, 0],
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          delay: 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.img
        src={QuestionMark}
        className="inline-block h-8"
        animate={{
          y: [0, -10, 0],
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          delay: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
