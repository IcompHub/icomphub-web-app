"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { atualizarProjeto, ProjetoPayload } from "@/lib/api/project";
import { ProjectFormSchema, ProjectFormState } from "@/lib/definitions";

// Função para gerar slug
function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function editProjectAction(
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  // Extrai os dados do formulário
  const rawData = {
    id: formData.get("id"),
    name: formData.get("name"),
    descricao: formData.get("descricao"),
    url: formData.get("url"),
    participantes: formData.getAll("participantes"),
    tecnologias: formData.getAll("tecnologias"),
  };

  // Valida os dados usando Zod
  const validatedFields = ProjectFormSchema.safeParse(rawData);
  console.log(validatedFields.error);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  const { id, name, descricao, participantes, tecnologias, url } =
    validatedFields.data;

  const payload: ProjetoPayload = {
    class_group_id: 1, // ajuste conforme necessário
    data: {
      description: descricao,
      participants: participantes,
      technologies: tecnologias,
      url: url,
    },
    name: name,
    slug: generateSlug(name),
  };

  try {
    await atualizarProjeto(Number(id), payload);
  } catch (error) {
    console.error(error);
    return {
      message: "Erro de API: Não foi possível editar o projeto.",
    };
  }

  revalidatePath("/project");
  redirect("/project");
}
