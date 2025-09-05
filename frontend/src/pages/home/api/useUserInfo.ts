import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./http/getUserInfo";

export default function useUserInfo() {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
  });
}
