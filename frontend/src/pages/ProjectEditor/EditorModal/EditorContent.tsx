import FilesAndInformation from "../EditorModalStates/FilesAndInformation/FilesAndInformation";
import EditorButton from "./EditorButton";
import { useEditorStore } from "../../../stores/useEditorStore";
import Metadata from "../EditorModalStates/MetaData/Metadata";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function EditorContent() {
  const { pageIndex, setPageIndex } = useEditorStore();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/create") {
      // Only reset if there's no valid pageIndex in history
      if (
        !window.history.state ||
        typeof window.history.state.pageIndex !== "number"
      ) {
        setPageIndex(0);
        window.history.replaceState({ pageIndex: 0 }, "");
      }
    }
  }, [location.pathname, setPageIndex]);

  useEffect(() => {
    if (window.history.state?.pageIndex !== pageIndex) {
      window.history.pushState({ pageIndex }, "");
    }
  }, [pageIndex]);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.pageIndex === "number") {
        setPageIndex(e.state.pageIndex);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [setPageIndex]);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="h-full w-full">
        <AnimatePresence mode="wait">
          {pageIndex === 0 && (
            <motion.div
              key="files-and-information"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <FilesAndInformation />
            </motion.div>
          )}
          {pageIndex === 1 && (
            <motion.div
              key="metadata"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <Metadata />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <EditorButton text="next" />
    </div>
  );
}
