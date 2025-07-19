"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { criarProjeto } from "@/lib/api/project";
import {
  ProjectFormSchema,
  ProjectFormState,
  ProjetoPayload,
} from "@/lib/definitions";
import { generateSlug } from "@/lib/utils";

export async function createProjectAction(
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const rawData = {
    name: formData.get("name"),
    descricao: formData.get("descricao"),
    url: formData.get("url"),
    participantes: JSON.parse(formData.get("participantes") as string),
    tecnologias: JSON.parse(formData.get("tecnologias") as string),
  };

  const validatedFields = ProjectFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  const { name, descricao, participantes, tecnologias, url } =
    validatedFields.data;

  const payload: ProjetoPayload = {
    class_group_id: 1,
    data: {
      description: descricao,
      url: url,
    },
    name: name,
    slug: generateSlug(name),
    members: participantes.map((p) => ({
      nickname: p.nickname,
      role: p.role,
      user_id: p.user_id,
    })),
    technologies: tecnologias,
  };

  try {
    await criarProjeto(payload);
  } catch (error) {
    console.error(error);
    return {
      message: "Erro de API: Não foi possível criar o projeto.",
    };
  }

  revalidatePath("/project");
  redirect("/project");
}
