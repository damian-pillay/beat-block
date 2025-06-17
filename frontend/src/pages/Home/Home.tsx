import { useEffect } from "react";
import Header from "./Header/Header";
import Navbar from "../../components/common/NavBar/Navbar";
import ProjectViewport from "./ProjectViewport";
import ScreenTexture from "../../components/layout/ScreenTexture";
import { useProjectStore } from "../../store/useProjectStore";
import type { Project } from "../../types/project";

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
        <Header />
        <ProjectViewport content={content as { projects: Project }} />
      </div>
    </>
  );
}

export default Home;
