"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signUp } from "@/lib/api/sign-up";
import { SignUpFormState } from "@/components/user/sign-up";
import { revalidatePath } from "next/cache";
import { atualizarTechnology, criarTechnology } from "../technologies";
import { TechFormState } from "@/components/technoogies/technologies-form";

const techSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
});

export async function editTechAction(
  prevState: TechFormState,
  formData: FormData
): Promise<TechFormState> {
  const rawData = {
    id: formData.get("id")?.toString() || "",
    name: formData.get("name")?.toString() || "",
  };
  console.log("editTechAction");
  const validatedFields = techSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  try {
    await atualizarTechnology(validatedFields.data);
  } catch (error) {
    console.error("Erro ao realizar cadastro:", error);
    return {
      message: "Erro ao realizar cadastro. Verifique os dados fornecidos.",
    };
  }
  revalidatePath("/technologies");
  redirect("/technologies");
}
