import { useMutation } from "@tanstack/react-query";
import { logOut } from "./http/logOut";

export default function useLogout() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logOut,
  });
}
