import { api } from "../../../../lib/axios";

export async function getUserInfo() {
  const response = await api.get("/auth/me");
  console.log(response.data);
  return response.data;
}
