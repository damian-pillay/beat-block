import FilesAndInformation from "../EditorModalStates/FilesAndInformation/FilesAndInformation";
import EditorButton from "./EditorButton";
import { useEditorStore } from "../../../store/useEditorStore";
import Metadata from "../EditorModalStates/MetaData/Metadata";

export default function EditorContent() {
  const { pageIndex } = useEditorStore();

  console.log(pageIndex);
  return (
    <>
      {pageIndex === 0 && <FilesAndInformation />}
      {pageIndex === 1 && <Metadata />}
      <EditorButton text="next" />
    </>
  );
}
