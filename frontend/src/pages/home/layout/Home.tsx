import { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../../common/components/navBar/Navbar";
import ProjectViewport from "../components/projectViewport/ProjectViewport";
import ScreenTexture from "../../common/layout/ScreenTexture";
import { useProjectStore } from "../services/useProjectStore";
import type { Project } from "../../common/types/project";
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
