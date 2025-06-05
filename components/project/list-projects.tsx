"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "lucide-react";
import { ProjectPagination } from "./project-pagination";
import { Logo } from "../general/logo";
interface ListProjectsProps {
  projetos: ProjectCardProps[];
}

export default function ListProjects({ projetos }: ListProjectsProps) {
  return (
    <>
      {projetos.length > 0 ? (
        <div className="lg:gap-8 md:gap-6 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2">
          {projetos.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ y: -40 * (i + 1) }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                gradient={project.gradient}
                description={project.description}
                technologies={project.technologies}
              />
              <ProjectPagination />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="h-150 flex flex-col items-center justify-center w-full">
          <Logo w={80} h={80} /> {/* imagem provisoria */}
          <p>Sem Projetos encontrados</p>
        </div>
      )}
    </>
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
      <div className="mb-8 lg:mb-0 md:mb-0 rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">
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
