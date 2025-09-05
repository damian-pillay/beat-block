import { api } from "../../../../lib/axios";

export async function logOut() {
  const response = await api.post("/auth/logout");
  return response.data;
}
