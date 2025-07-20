import { useAudioPlayerStore } from "../../../../common/services/useAudioPlayerStore";
import { ProjectPlayIcon } from "../../../../../assets/icons";
import useFetchFile from "../../../hooks/useFetchFile";
import ProjectActionButton from "./ProjectActionButton";
import {
  showErrorToast,
  showWarningToast,
} from "../../../../common/utils/toastConfig";
import type { ProjectResponse } from "../../../../common/types/projectResponse";
import type { AudioData } from "../../../../common/types/audioData";

interface ProjectPlayButton {
  project: ProjectResponse;
  hasFile: boolean;
}

export default function ProjectPlayButton({
  project,
  hasFile,
}: ProjectPlayButton) {
  const { queueAudio: setFilePath } = useAudioPlayerStore();
  const { refetch } = useFetchFile({
    field: "audio",
    projectId: project.id,
    isEnabled: false,
  });

  async function handleClick() {
    const { data: blob, error } = await refetch();

    if (error) {
      showErrorToast(`File not found: ${error.message}`);
      return;
    }

    if (blob) {
      const audioData: AudioData = {
        title: project.name,
        bpm: project.bpm,
        genre: project.genre,
        keySignature: project.keySignature,
      };

      const url = URL.createObjectURL(blob);

      setFilePath(audioData, url);
    }
  }

  return (
    <ProjectActionButton
      alt="Play Audio"
      icon={ProjectPlayIcon}
      onClick={
        hasFile
          ? handleClick
          : () => showWarningToast("There is no Audio to play")
      }
    ></ProjectActionButton>
  );
}
