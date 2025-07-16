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
      projectResponse: Partial<ProjectResponse> | undefined;
      projectRequest: ProjectRequest;
    }) => {
      const formData = new FormData();

      for (const key in projectRequest) {
        const value = projectRequest[key as keyof typeof projectRequest];

        if (
          projectResponse &&
          value == projectResponse[key as keyof typeof projectResponse]
        ) {
          continue;
        }

        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }

      const response = await api.patch(
        `/project/${projectResponse?.id}`,
        formData
      );
      return response.data;
    },
  });
}
