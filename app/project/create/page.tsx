import ProjectForm from "@/components/ui/project-form";
import { listarUsuarios } from "@/lib/api/sign-up";

import { listarTechnologies } from "@/lib/api/technologies";

export default async function Home() {
  const technologies = await listarTechnologies();
  const users = await listarUsuarios();

  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Cadastrar Projeto</h1>
        <p className="text-[#94a3b8] mb-8">
          Queremos saber um pouco do seu projeto :)
        </p>

        <ProjectForm
          submitText="Cadastrar"
          technologies={technologies}
          users={users}
        />
      </div>
    </main>
  );
}
