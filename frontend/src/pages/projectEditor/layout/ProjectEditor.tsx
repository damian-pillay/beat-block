import Navbar from "../../common/components/navBar/Navbar";
import ScreenTexture from "../../common/layout/ScreenTexture";
import EditorModal from "../components/EditorModal/EditorModal";

function ProjectEditor() {
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
