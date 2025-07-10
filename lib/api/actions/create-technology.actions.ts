"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signUp } from "@/lib/api/sign-up";
import { SignUpFormState } from "@/components/user/sign-up";
import { revalidatePath } from "next/cache";
import { criarTechnology } from "../technologies";
import { TechFormState } from "@/components/technoogies/technologies-form";

const techSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
});

export async function techAction(
  prevState: TechFormState,
  formData: FormData
): Promise<TechFormState> {
  const rawData = {
    name: formData.get("name")?.toString() || "",
  };

  const validatedFields = techSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  try {
    await criarTechnology(validatedFields.data);
  } catch (error) {
    console.error("Erro ao realizar cadastro:", error);
    return {
      message: "Erro ao realizar cadastro. Verifique os dados fornecidos.",
    };
  }
  revalidatePath("/technologies");
  redirect("/technologies");
}
