import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";

export default function useFetchCatalog() {
  const catalog = useQuery({
    queryKey: ["catalog"],
    queryFn: async () => {
      const response = await api.get("/project");
      return response.data;
    },
  });

  return catalog;
}
