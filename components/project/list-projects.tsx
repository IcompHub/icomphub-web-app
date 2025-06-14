"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "../general/logo";
import { Badge } from "../ui/badge";
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
                id={project.id}
                key={project.id}
                slug={project.slug}
                name={project.name}
                data={project.data}
                class_group_id={project.class_group_id}
              />
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
  id: number;
  slug: string;
  name: string;
  status?: string;
  data: {
    description: string;
    participants: string[];
    technologies: string[];
    url: string;
    gradient?: string;
  };
  class_group_id: number;
}

function ProjectCard({ id, slug, name, data }: ProjectCardProps) {
  return (
    <Link href={`/project/${slug}-${id}`} className="block">
      <div className="mb-8 lg:mb-0 md:mb-0 rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">
        <div className={`h-26 bg-gradient-to-r ${data.gradient}`} />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-[#64748b] mb-4 text-sm">{data.description}</p>
          <div className="flex gap-2 w-fit">
            {data.technologies.map((tech, i) => (
              <TechTag key={i} tech={tech} />
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
