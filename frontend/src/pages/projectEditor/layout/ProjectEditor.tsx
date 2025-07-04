import Navbar from "../../common/components/navBar/Navbar";
import ScreenTexture from "../../common/layout/ScreenTexture";
import EditorModal from "../components/EditorModal/EditorModal";
import { useEffect } from "react";

function ProjectEditor() {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Show browser's default warning
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      <div className="relative h-screen w-screen flex flex-col">
        <ScreenTexture />
        <Navbar />
        <EditorModal />
      </div>
    </>
  );
}

export default ProjectEditor;
