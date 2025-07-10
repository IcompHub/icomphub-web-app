"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signUp } from "@/lib/api/sign-up";
import { SignUpFormState } from "@/components/user/sign-up";
import { revalidatePath } from "next/cache";
const signUpSchema = z.object({
  full_name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  nickname: z.string().min(2, {
    message: "Nickname deve ter pelo menos 2 caracteres.",
  }),
  registration: z.string().min(2, {
    message: "Matrícula deve ter pelo menos 2 caracteres.",
  }),
  institutional_email: z.string().email({
    message: "Email institucional inválido.",
  }),
  personal_email: z.string().email({
    message: "Email pessoal inválido.",
  }),
  password: z.string().min(4, {
    message: "Senha deve ter pelo menos 4 caracteres.",
  }),
  // url_linkedin: z.string().url({
  //   message:
  //     "URL do LinkedIn inválida. Insira uma URL completa (ex: https://linkedin.com/in/usuario).",
  // }),
  // url_github: z.string().url({
  //   message:
  //     "URL do GitHub inválida. Insira uma URL completa (ex: https://github.com/usuario).",
  // }),
  // role_project: z.string().min(2, {
  //   message: "Cargo no projeto deve ter pelo menos 2 caracteres.",
  // }),
});
export async function signUpAction(
  prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const rawData = {
    full_name: formData.get("full_name")?.toString() || "",
    nickname: formData.get("nickname")?.toString() || "",
    registration: formData.get("registration")?.toString() || "",
    institutional_email: formData.get("institutional_email")?.toString() || "",
    personal_email: formData.get("personal_email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    url_linkedin: formData.get("url_linkedin")?.toString() || "",
    url_github: formData.get("url_github")?.toString() || "",
    role_project: formData.get("role_project")?.toString() || "",
  };

  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  try {
    await signUp(validatedFields.data);

    // Redireciona para a rota desejada após cadastro
  } catch (error) {
    console.error("Erro ao realizar cadastro:", error);
    return {
      message: "Erro ao realizar cadastro. Verifique os dados fornecidos.",
    };
  }
  revalidatePath("/login-user");
  redirect("/login-user");
}
