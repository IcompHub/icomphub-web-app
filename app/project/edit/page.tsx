"use client";
import ProjectForm, { formSchema } from "@/components/ui/project-form";
import * as z from "zod";
function handleUpdate(values: z.infer<typeof formSchema>) {
  console.log("edit");
  console.log(values);
  try {
    // criarProjeto(values);
  } catch (error) {
    alert("Erro ao editar projeto");
    console.error(error);
  }
}

export default function Home() {
  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Editar Projeto</h1>
        <p className="text-[#94a3b8] mb-8">
          Texto que a desginer ainda vai pensar melhor.
        </p>

        <ProjectForm
          initialData={{
            nome: "UniFood",
            descricao: "Sistema de pedidos alimentícios na faculdade",
            participantes: ["raquel", "luis"],
            tecnologias: ["nextjs", "tailwind"],
            url: "https://unifood.vercel.app",
          }}
          onSubmit={handleUpdate}
          submitText="Salvar alterações"
        />
      </div>
    </main>
  );
}
