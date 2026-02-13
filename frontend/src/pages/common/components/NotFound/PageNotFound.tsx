import { AuthenticationBackground } from "../../../../assets/textures";
import { RecordWithNeedle } from "../../../../assets/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home } from "lucide-react";

export default function PageNotFound() {
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <motion.div
      key="Not Found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-screen w-full flex justify-center"
    >
      <img
        src={AuthenticationBackground}
        alt="Authentication Background"
        className="w-full h-full object-cover absolute top-0 left-0 opacity-6 grayscale drag-none"
      />
      <div className="relative z-10 w-6xl flex flex-col items-center justify-center h-full gap-7">
        <img
          src={RecordWithNeedle}
          alt="record with needle"
          className="h-60 opacity-30"
        />
        <div className="flex flex-col items-center justify-center gap-1">
          {" "}
          <h1 className="text-5xl font-bold">404s & Heartbreaks</h1>
          <p className="text-xl text-white/50">
            The page you are looking for isn't in our rotation
          </p>
        </div>

        <motion.button
          type="button"
          onClick={handleClick}
          onMouseOver={() => setIsDragOver(true)}
          onMouseLeave={() => setIsDragOver(false)}
          transition={{ duration: 0.01 }}
          className="flex justify-center items-center p-4 bg-[#ff0000] rounded-md min-w-30 h-13 cursor-pointer overflow-hidden relative transition focus:bg-[#cc0000]"
        >
          <AnimatePresence mode="wait">
            {isDragOver ? (
              <motion.div
                key="send"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Home size={28} />
              </motion.div>
            ) : (
              <motion.span
                key="text"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                REWIND
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
