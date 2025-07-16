import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import type { ProjectRequest } from "../../common/types/projectRequest";

export default function useProjectPublish() {
  return useMutation({
    mutationFn: async (project: ProjectRequest) => {
      console.log(project);

      const formData = new FormData();

      for (const key in project) {
        const value = project[key as keyof typeof project];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }

      const response = await api.post("/project", formData);
      return response.data;
    },
  });
}
