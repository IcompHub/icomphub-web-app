"use client";
import ProjectForm, { formSchema } from "@/components/ui/project-form";
import { z } from "zod";

function handleCreate(values: z.infer<typeof formSchema>) {
  console.log("create");
  console.log(values);
  try {
    // criarProjeto(values);
  } catch (error) {
    alert("Erro ao criar projeto");
    console.error(error);
  }
}

export default function Login() {
  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Entrar</h1>
        <p className="text-[#94a3b8] mb-8">
          Seja bem-vind_ de volta ao IcompHub!
        </p>

        {/* <ProjectForm onSubmit={handleCreate} submitText="Cadastrar" /> */}
      </div>
    </main>
  );
}
