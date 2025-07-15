import EditProject from "@/components/project/edit-project";
import { listarProjetoPorID } from "@/lib/api/project";
import { listarUsuarios } from "@/lib/api/sign-up";
import { listarTechnologies } from "@/lib/api/technologies";

export default async function EditarProjeto(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const idString = params.id.split("-").pop();
  const id = Number(idString);

  const project = await listarProjetoPorID(id);

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }
  const technologies = await listarTechnologies();
  const users = await listarUsuarios();

  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Editar Projeto</h1>

        <EditProject
          project={project}
          technologies={technologies}
          users={users}
        />
      </div>
    </main>
  );
}
