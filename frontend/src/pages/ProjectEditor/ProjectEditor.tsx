import Navbar from "../../components/common/NavBar/Navbar";
import ScreenTexture from "../../components/layout/ScreenTexture";
import EditorModal from "./EditorModal/EditorModal";

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
