import { CreateProjectButton } from "@/components/project/create-project-button";
import { CreateTechnologyButton } from "@/components/technoogies/create-tech-button";
import { Footer } from "@/components/project/footer";
import ListProjects from "@/components/project/list-projects";
import ListTechnologies from "@/components/technoogies/list-technologies";
import { ProjectPagination } from "@/components/project/project-pagination";
import LoginForm from "@/components/user/login";
import { listarProjetos } from "@/lib/api/project";
import { listarImgsTech, listarTechnologies } from "@/lib/api/technologies";

export default async function Technologies() {
  const technologies = await listarTechnologies();
  const images = await listarImgsTech(technologies);
  return (
    <main className="p-6">
      <div className="max-w-6xl mx-auto ">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold mb-6">Tecnologias</h1>
          <CreateTechnologyButton />
        </div>
        <ListTechnologies technologies={technologies} images={images} />
        <ProjectPagination />
        <Footer />
      </div>
    </main>
  );
}
