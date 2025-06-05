import { MoreHorizontal, PenLine } from "lucide-react";
import { Footer } from "@/components/project/footer";
import { ProjectBreadcrumb } from "@/components/project/project-breadcrumb";

import { TechnologiesCarousel } from "@/components/project/technologies-carousel";
import { MembersList } from "@/components/project/members-list";
import { listarProjetoPorID } from "@/lib/api/project";
import { notFound } from "next/navigation";

export default async function ProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  // Extrai apenas o id numérico do formato "${slug}-${id}"
  console.log(params);
  const idString = params.id.split("-").pop();
  const id = Number(idString);
  const project = await listarProjetoPorID(id);
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f5f9]">
      <ProjectBreadcrumb
        title={project.name}
        slug={project.slug}
        id={project.id}
      />

      <div className={`h-48 bg-gradient-to-r ${project.gradient}`} />

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <h1 className="text-3xl font-bold mt-6 mb-2 pb-2 border-b border-[#1a222f] flex items-center justify-between">
          {project.name}
          <PenLine className="transition-colors cursor-pointer rounded border border-transparent hover:bg-white hover:border-[#1a222f] hover:text-[#1a222f] m-1" />
        </h1>
        <p className="text-[#64748b] mt-4 mb-8 text-sm">
          {project.data.description}
        </p>

        <h2 className="text-xl font-bold mb-4">Participantes</h2>
        <MembersList participants={project.data.participants} />

        <TechnologiesCarousel technologies={project.data.technologies} />

        <h2 className="text-xl font-bold mb-4">README.md</h2>
        <div className="bg-[#080D17] rounded-lg p-4 mb-12 flex justify-center items-center h-16 border border-[#1A222F]">
          <MoreHorizontal size={24} className="text-[#64748b]" />
        </div>

        <Footer />
      </div>
    </div>
  );
}
