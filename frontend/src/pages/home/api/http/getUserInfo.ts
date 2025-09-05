import { api } from "../../../../lib/axios";

export async function getUserInfo() {
  const response = await api.get("/user/me");
  return response.data;
}
