import api from "./axios";

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  console.log("Login response:", res.data);
  return res.data;
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login-user");
}
