import DawSelection from "./DawSelection";
import AudioFeatures from "./AudioFeatures";
import EditorButton from "../../EditorModal/EditorButton";
import { metadataSchema } from "../../../validation/projectSchema";

export default function Metadata() {
  return (
    <div className="h-full w-full">
      <section className="flex flex-col w-full h-full justify-between">
        <AudioFeatures />
        <DawSelection />
        <div
          key={"next"}
          className={`flex w-full justify-end items-center gap-4`}
        >
          <EditorButton validationSchema={metadataSchema} />
        </div>
      </section>
    </div>
  );
}
