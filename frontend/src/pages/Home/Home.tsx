import { useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "../../components/common/NavBar/Navbar";
import ProjectViewport from "./ProjectViewport";
import ScreenTexture from "../../components/layout/ScreenTexture";
import { useProjectStore } from "../../stores/useProjectStore";
import type { Project } from "../../types/project";
import { motion } from "framer-motion";

function Home() {
  const content = useProjectStore((state) => state.content);
  const fetchContent = useProjectStore((state) => state.fetchContent);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

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
          className=" overflow-hidden flex flex-col"
        >
          <Dashboard />
          <ProjectViewport content={content as { projects: Project }} />
        </motion.div>
      </div>
    </>
  );
}

export default Home;
