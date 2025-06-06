"use client";
import * as z from "zod";
import { formSchema } from "@/components/ui/project-form";
import ProjectForm from "../ui/project-form";
import { atualizarProjeto } from "@/lib/api/project";

async function handleUpdate(values: z.infer<typeof formSchema>) {
  console.log("edit");
  console.log(values);
  try {
    await atualizarProjeto(values);
  } catch (error) {
    alert("Erro ao editar projeto");
    console.error(error);
  }
}

export default function EditProject({ project }: any) {
  return (
    <ProjectForm
      initialData={project}
      submitText="Salvar alterações"
      onSubmit={handleUpdate}
    />
  );
}
