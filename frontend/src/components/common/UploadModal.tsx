import { useModalStore } from "../../store/useModalStore";
import { AnimatePresence, motion } from "framer-motion";

export default function UploadModal() {
  const isOpen = useModalStore((state) => state.isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            key="modal"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.02 }}
            style={{ originX: 0.94, originY: 0.05 }}
            className="absolute w-[105%] h-96 top-[-5px] flex flex-col gap-4 z-49 p-5 pt-4 rounded-4xl bg-[#272626] shadow-lg"
          >
            <motion.section
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            >
              <h3 className="font-black text-lg">Upload a project</h3>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl w-full h-full bg-[#1c1b1b] border-2 border-dashed"
            ></motion.section>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
