import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import type { ProjectRequest } from "../../common/types/projectRequest";
import type { ProjectResponse } from "../../common/types/projectResponse";

export default function useProjectUpdate() {
  return useMutation({
    mutationFn: async ({
      projectResponse,
      projectRequest,
    }: {
      projectResponse: ProjectResponse;
      projectRequest: ProjectRequest;
    }) => {
      const formData = new FormData();

      for (const key in projectRequest) {
        const value = projectRequest[key as keyof ProjectRequest];

        const isFileField = [
          "compressedFile",
          "audioFile",
          "imageFile",
        ].includes(key);

        if (isFileField && value instanceof File) {
          formData.append(key, value);
          continue;
        }

        const responseValue = projectResponse[key as keyof ProjectResponse];

        const areEqual =
          value === responseValue ||
          (value === "" && responseValue === null) ||
          (value === null &&
            (responseValue === "" || responseValue === undefined)) ||
          (value === undefined &&
            (responseValue === "" || responseValue === null));

        if (areEqual) continue;

        formData.append(key, value === null || undefined ? "" : String(value));
      }

      const response = await api.patch(
        `/project/${projectResponse?.id}`,
        formData
      );

      return response.data;
    },
  });
}
