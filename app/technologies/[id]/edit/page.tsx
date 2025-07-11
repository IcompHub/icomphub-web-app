import EditTechnology from "@/components/technoogies/edit-tech";

import { listarTechnologyPorID } from "@/lib/api/technologies";

export default async function EditarTecnologia(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const idString = params.id.split("-").pop();
  const id = Number(idString);

  const tecnologia = await listarTechnologyPorID(id);

  if (!tecnologia) {
    return <div>Tech não encontrado</div>;
  }

  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Editar Tecnologia</h1>

        <EditTechnology tecnologia={tecnologia} />
      </div>
    </main>
  );
}
