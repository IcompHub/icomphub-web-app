"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { criarProjeto, ProjetoPayload } from "@/lib/api/project"; // Mantenha sua função de API
import { formSchema, State } from "@/components/ui/project-form";
import { ProjectFormSchema, ProjectFormState } from "@/lib/definitions";

// 3. Crie a Server Action
export async function createProjectAction(
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  // Extrai os dados do formulário
  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
  const rawData = {
    name: formData.get("name"),
    descricao: formData.get("descricao"),
    url: formData.get("url"),
    // .getAll é usado para campos que podem ter múltiplos valores (como o MultiCombobox)
    participantes: formData.getAll("participantes"),
    tecnologias: formData.getAll("tecnologias"),
  };

  // Valida os dados usando Zod
  const validatedFields = ProjectFormSchema.safeParse(rawData);

  // Se a validação falhar, retorne os erros
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  // Se a validação passar, crie o payload para a API
  const { name, descricao, participantes, tecnologias, url } =
    validatedFields.data;

  const payload: ProjetoPayload = {
    class_group_id: 1, // ou o valor correto
    data: {
      description: descricao,
      participants: participantes,
      technologies: tecnologias,
      url: url,
    },
    name: name,
    slug: generateSlug(name),
  };

  // Tente enviar para a API
  try {
    await criarProjeto(payload);
  } catch (error) {
    console.error(error);
    return {
      message: "Erro de API: Não foi possível criar o projeto.",
    };
  }

  // Em caso de sucesso, limpe o cache e redirecione (ou retorne uma mensagem de sucesso)
  revalidatePath("/projects"); // Exemplo de caminho para revalidar
  redirect("/projects"); // Exemplo de redirecionamento pós-sucesso

  // Alternativamente, se não quiser redirecionar:
  // return { message: "Projeto criado com sucesso!" };
}
