import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export default function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId?: number) => {
      const response = await api.delete(`/project/${projectId}`);
      return response.status;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
  });
}
