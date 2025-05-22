import type React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ProjectPagination } from "@/components/project/project-pagination";
import { Footer } from "@/components/project/footer";
import { listarProjetos } from "@/lib/api/project";
import { Badge } from "@/components/ui/badge";

const projetos = await listarProjetos();

export default function ProjectsPage() {
  return (
    <div className=" bg-[#010103] text-[#f1f5f9] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-2">Projetos</h1>

          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#5d6674]" />
            </div>
            <Input
              type="text"
              placeholder="Pesquisar"
              className="w-full bg-transparent border border-[#1a222f] py-2 pl-10 pr-4 text-[#f1f5f9] placeholder:text-[#5d6674] focus:outline-none focus:ring-1 focus:ring-[#414d60]"
            />
          </div>
        </div>

        <div className="space-y-8 ">
          {projetos.map((project: any) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              gradient={project.gradient}
              description={project.description}
              technologies={project.technologies}
            />
          ))}

          <ProjectPagination />
          <Footer />
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  gradient: string;
  technologies: { name: string; icon: string }[];
}

function ProjectCard({
  id,
  title,
  description,
  gradient,
  technologies,
}: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`} className="block">
      <div className="rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">
        <div className={`h-26 bg-gradient-to-r ${gradient}`} />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-[#64748b] mb-4 text-sm">{description}</p>
          <div className="flex gap-2 w-fit">
            {technologies.map((tech, i) => (
              <TechTag key={i} tech={tech.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function TechTag({ tech }: { tech: string }) {
  return (
    <Badge className="px-2 py-1.5 rounded-full bg-transparent border border-[#F1F5F9] text-sm ">
      {tech}
    </Badge>
  );
}
