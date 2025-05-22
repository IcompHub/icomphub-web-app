import { MoreHorizontal } from "lucide-react";
import { Footer } from "@/components/project/footer";
import { ProjectBreadcrumb } from "@/components/project/project-breadcrumb";

import { TechnologiesCarousel } from "@/components/project/technologies-carousel";
import { MembersList } from "@/components/project/members-list";
import { listarProjetoPorID } from "@/lib/api/project";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await listarProjetoPorID(params.id);
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f5f9]">
      <ProjectBreadcrumb title={project.title} />

      <div className={`h-48 bg-gradient-to-r ${project.gradient}`} />

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <h1 className="text-3xl font-bold mt-6 mb-2 pb-2 border-b border-[#1a222f]">
          {project.title}
        </h1>

        <p className="text-[#64748b] mt-4 mb-8 text-sm">
          {project.description}
        </p>

        <h2 className="text-xl font-bold mb-4">Participantes</h2>
        <MembersList participants={project.participants} />

        <TechnologiesCarousel technologies={project.technologies} />

        <h2 className="text-xl font-bold mb-4">README.md</h2>
        <div className="bg-[#080D17] rounded-lg p-4 mb-12 flex justify-center items-center h-16 border border-[#1A222F]">
          <MoreHorizontal size={24} className="text-[#64748b]" />
        </div>

        <Footer />
      </div>
    </div>
  );
}
