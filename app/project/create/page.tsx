"use client";
import ProjectForm, { formSchema } from "@/components/ui/project-form";
import { z } from "zod";
import { criarProjeto, ProjetoPayload } from "@/lib/api/project";

// Função utilitária para gerar o slug
function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-"); // troca espaços por hífen
}

async function handleCreate(values: z.infer<typeof formSchema>) {
  try {
    const { name, descricao, participantes, tecnologias, url } = values;

    const payload: ProjetoPayload = {
      class_group_id: 0,
      data: {
        description: descricao,
        participants: participantes,
        technologies: tecnologias,
        url: url,
      },
      name: name,
      slug: generateSlug(name),
    };

    await criarProjeto(payload);
    alert("Projeto cadastrado com sucesso!");
    // Aqui você pode redirecionar ou limpar o formulário se quiser
  } catch (error) {
    alert("Erro ao criar projeto");
    console.error(error);
  }
}

export default function Home() {
  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Cadastrar Projeto</h1>
        <p className="text-[#94a3b8] mb-8">
          Queremos saber um pouco do seu projeto :)
        </p>

        <ProjectForm onSubmit={handleCreate} submitText="Cadastrar" />
      </div>
    </main>
  );
}
