import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";
import { api } from "../../../lib/axios";

export default function useDeleteProject() {
  return useMutation({
    mutationFn: async (projectId?: number) => {
      const response = await api.delete(`/project/${projectId}`);
      return response.status;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
    // onError: () => {
    //   queryClient.invalidateQueries({ queryKey: ["catalog"] });
    // },
  });
}
