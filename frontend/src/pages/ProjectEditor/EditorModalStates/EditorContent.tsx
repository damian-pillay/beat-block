import FilesAndInformation from "./FilesAndInformation";
import EditorButton from "../../../components/common/Buttons/EditorButton";
import { useEditorStore } from "../../../store/useEditorStore";
import Metadata from "./Metadata";

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
