import TechnologyForm from "@/components/technoogies/technologies-form";

export default async function CreateTech() {
  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Cadastrar Tecnologia</h1>
        <p className="text-[#94a3b8] mb-8">Adicione caso não esteja listada</p>

        <TechnologyForm />
      </div>
    </main>
  );
}
