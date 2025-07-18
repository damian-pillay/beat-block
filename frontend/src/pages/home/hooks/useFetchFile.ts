import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import { useEffect, useState } from "react";

export default function useFetchFile({
  field,
  projectId,
  hasFile,
}: {
  field: string;
  projectId: number;
  hasFile: boolean;
}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const { data: blob, ...rest } = useQuery({
    queryKey: [projectId, field],
    queryFn: async () => {
      const response = await api.get(`/project/${projectId}/${field}`, {
        responseType: "blob",
      });
      return response.data;
    },
    enabled: projectId != -1 && hasFile,
    retry: false,
  });

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [blob]);

  return { url: objectUrl, ...rest };
}
