import { Pause, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { motion } from "framer-motion";
import { DefaultAudioImage, InfoIcon } from "../../../../assets/icons";

export default function AudioPlayer() {
  return (
    <div className="absolute w-full h-25 bottom-0 z-50">
      <div
        className="relative top-0 w-full h-[15%] pointer-events-none mx-auto"
        style={{
          background: "linear-gradient(to top, #121212, transparent)",
        }}
      />
      <div className="w-full h-[85%] bg-[#171515] flex justify-center">
        <div className=" w-full max-w-[89rem] px-10 flex justify-start">
          <div className="relative w-full py-2 gap-7 flex justify-start items center">
            <img src={DefaultAudioImage} className="rounded-xl" />
            <section className="flex flex-col justify-center gap-">
              <p className="font-bold text-sm">Test Audio 1</p>
              <p className="opacity-40">
                <span>C#</span>
                <span> • </span>
                <span>122 BPM</span>
                <span> • </span>
                <span>Amapiano</span>
              </p>
            </section>
            <section className=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-18 items-center">
              <motion.button
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <SkipBack size={24} fill="currentColor" />
              </motion.button>
              <motion.button
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <Pause size={32} strokeWidth={0} fill="currentColor" />
              </motion.button>
              <motion.button
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <SkipForward size={24} fill="currentColor" />
              </motion.button>
            </section>
            <section className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-16 items-center">
              <motion.button
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <Volume2
                  size={24}
                  fill="currentColor"
                  className="cursor-pointer"
                />
              </motion.button>
              <motion.button
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <img src={InfoIcon} className="h-5 cursor-pointer" />
              </motion.button>
              <motion.button
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <X
                  size={24}
                  fill="currentColor"
                  strokeWidth={4}
                  className="cursor-pointer"
                />
              </motion.button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
