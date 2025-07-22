import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export default function useFetchFile({
  field,
  projectId,
  isEnabled,
}: {
  field: string;
  projectId: number;
  isEnabled: boolean;
}) {
  const fileQuery = useQuery({
    queryKey: field == "image" ? [projectId, field] : [projectId, field], // cache images uniquely, but use same cache key for audio and files to avoid bloat
    queryFn: async () => {
      const response = await api.get(`/project/${projectId}/${field}`, {
        responseType: "blob",
      });
      return response.data;
    },
    enabled: isEnabled,
    retry: field == "image",
  });

  return fileQuery;
}
