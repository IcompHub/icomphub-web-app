import ProjectForm from "@/components/ui/project-form";
import { listarProjetoPorID } from "@/lib/api/project";

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

  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Editar Projeto</h1>

        <ProjectForm
          initialData={project}
          submitText="Salvar alterações"
          onSubmit={() => console.log("aaaaa")}
        />
      </div>
    </main>
  );
}
