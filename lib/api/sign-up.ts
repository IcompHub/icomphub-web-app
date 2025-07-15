"use server";
import { signUpSchema } from "@/components/user/sign-up";
import api from "./axios";
import { z } from "zod";
import { generateSlug } from "../utils";
import { cookies } from "next/headers";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  const newData = {
    ...data,
    slug: generateSlug(data.full_name),
    role_project: undefined,
    url_linkedin: undefined,
    url_github: undefined,
  };
  console.log(newData);
  const res = await api.post("/users", newData);
  console.log("response:", res.data);
  return res.data;
}

export async function listarUsuarios() {
  const res = await api.get("/users?pageNumber=1&pageSize=100");
  // console.log("response:", res.data.data.items);
  return res.data.data.items;
}

// app/api/my-api.ts (ou server-side handler)

export async function getProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return undefined;
  const res = await api.get(`/users/profile-picture`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "arraybuffer",
  });
  const base64 = Buffer.from(res.data, "binary").toString("base64");
  const contentType = res.headers["content-type"]; // ex: image/png

  return `data:${contentType};base64,${base64}`;
}
