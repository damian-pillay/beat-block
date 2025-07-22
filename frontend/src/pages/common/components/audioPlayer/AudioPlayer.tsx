import { Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { InfoIcon } from "../../../../assets/icons";
import { useAudioPlayerStore } from "../../services/useAudioPlayerStore";
import { useEffect, useRef } from "react";

export default function AudioPlayer() {
  const { audioData, closePlayer, filePath, isPlaying, togglePlaying } =
    useAudioPlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function toggleAudio() {
    if (!audioRef.current) return;
    togglePlaying();

    if (isPlaying) {
      audioRef.current.pause();
      return;
    }

    audioRef.current.play();
  }

  useEffect(() => {
    if (!filePath) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(filePath);
    audioRef.current = audio;

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Playback failed:", err);
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [filePath]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.5 }}
      className="absolute w-full h-25 bottom-0 z-50"
    >
      <div
        className="relative top-0 w-full h-[15%] pointer-events-none mx-auto"
        style={{
          background: "linear-gradient(to top, #121212, transparent)",
        }}
      />
      <div className="w-full h-[85%] bg-[#171515] flex justify-center">
        <div className=" w-full max-w-[89rem] px-10 flex justify-start">
          <div className="relative w-full py-2 gap-7 flex justify-start items center">
            <img
              src={audioData?.image}
              className="rounded-xl aspect-square object-cover"
            />
            <AnimatePresence mode="wait">
              {audioData && (
                <motion.section
                  key={`${audioData.title}-${audioData.keySignature}-${audioData.bpm}-${audioData.genre}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center gap-"
                >
                  <p className="font-bold text-sm">{audioData?.title}</p>
                  <p className="opacity-40">
                    <span>{audioData?.keySignature ?? "--"}</span>
                    <span> • </span>
                    <span>
                      {audioData?.bpm ? `${audioData.bpm} BPM` : "--"}
                    </span>
                    <span> • </span>
                    <span>{audioData?.genre ?? "--"}</span>
                  </p>
                </motion.section>
              )}
            </AnimatePresence>
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
                onClick={toggleAudio}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Pause size={32} strokeWidth={0} fill="currentColor" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Play size={32} strokeWidth={0} fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>
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
                onClick={closePlayer}
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
    </motion.div>
  );
}
