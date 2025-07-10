import { signUpSchema } from "@/components/user/sign-up";
import api from "./axios";
import { z } from "zod";
import { generateSlug } from "../utils";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  const newData = {
    ...data,
    slug: generateSlug(data.full_name),
    role_project: undefined,
    url_linkedin: undefined,
    url_github: undefined,
  };
  console.log(newData);
    const res = await api.post("users", newData);
    console.log("response:", res.data);
    return res.data;
}
