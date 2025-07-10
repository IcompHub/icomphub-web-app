"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { login } from "@/lib/api/login";

const loginSchema2 = z.object({
  email: z.string().min(2, {
    message: "Email deve ter pelo menos 2 caracteres.",
  }),
  password: z.string().min(4, {
    message: "Senha deve ter pelo menos 4 caracteres.",
  }),
});

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  // Extrai os dados do formulário
  const rawData = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  // Valida os dados usando Zod

  const validatedFields = loginSchema2.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  try {
    const { data } = await login(validatedFields.data);
    const token = data.split(" ")[1];
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true, // Impede acesso via JavaScript (segurança)
      secure: process.env.NODE_ENV === "production", // Usa HTTPS em produção
      sameSite: "strict", // Proteção contra CSRF
      path: "/", // Cookie disponível em todas as rotas
      maxAge: 60 * 60 * 24, // Expira em 24 horas (ajuste conforme necessário)
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Erro ao fazer login. Verifique suas credenciais.",
    };
  }
  revalidatePath("/project");
  redirect("/project");
}
