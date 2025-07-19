import { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../../common/components/navBar/Navbar";
import Catalog from "../components/catalogViewer/CatalogViewer";
import ScreenTexture from "../../common/layout/ScreenTexture";
import { motion } from "framer-motion";
import { useProjectStore } from "../../projectEditor/services/useProjectStore";
import { useEditorStore } from "../../projectEditor/services/useEditorStore";
import AudioPlayer from "../../common/components/audioPlayer/AudioPlayer";

function Home() {
  const { resetRequestForm: resetProject } = useProjectStore();
  const { resetPage } = useEditorStore();

  useEffect(() => {
    resetProject();
    resetPage();
  }, [resetPage, resetProject]);

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden flex flex-col">
        <ScreenTexture />
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="relative overflow-hidden flex flex-col h-[90%]"
        >
          <Dashboard />
          <Catalog />
          <AudioPlayer />
        </motion.div>
      </div>
    </>
  );
}

export default Home;
