import { Footer } from "@/components/project/footer";
import { listarProjetos } from "@/lib/api/project";
import ListProjects from "@/components/project/list-projects";

export default async function ProjectsPage() {
  // const [search, setSearch] = useState("");
  const projetos = await listarProjetos();

  return (
    <div className=" bg-[#010103] text-[#f1f5f9] p-6">
      <div className="max-w-6xl mx-auto ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-2">Projetos</h1>
        </div>
        <ListProjects projetos={projetos} />

        <Footer />
      </div>
    </div>
  );
}
