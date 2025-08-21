import { api } from "../../../../lib/axios";

export async function getUserInfo() {
  const response = await api.get("/auth/me");
  return response.data;
}
