"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "../general/logo";
import { Badge } from "../ui/badge";

interface Technology {
  id: number;
  slug: string;
  name: string;
}

interface ProjectDetails {
  description: string;
  repository_url: string;
  title: string;
}

interface Project {
  id: number;
  slug: string;
  name: string;
  status: string;
  data: ProjectDetails;
  class_group_id: number;
  technologies: Technology[];
}

const gradients = [
  "from-pink-500 via-red-500 to-yellow-500",
  "from-cyan-400 to-green-400",
  "from-blue-400 to-purple-400",
  "from-blue-800 to-blue-400",
  "from-pink-700 to-pink-300",
];

interface ListProjectsProps {
  projetos: Project[]; 
}

export default function ListProjects({ projetos }: ListProjectsProps) {
  return (
    <>
      {projetos && projetos.length > 0 ? (
        <div className="lg:gap-8 md:gap-6 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2">
          {projetos.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Espalha todas as props do projeto e adiciona o gradiente */}
              <ProjectCard
                {...project}
                gradient={gradients[i % gradients.length]}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="h-150 flex flex-col items-center justify-center w-full text-center">
          <Logo w={80} h={80} />
          <p className="mt-4 text-slate-400">Nenhum projeto encontrado.</p>
        </div>
      )}
    </>
  );
}

type ProjectCardProps = Project & {
  gradient: string;
};

function ProjectCard({ id, slug, name, data, technologies, gradient }: ProjectCardProps) {
  return (
    <Link href={`/project/${slug}-${id}`} className="block h-full">
      <div className="flex flex-col h-full rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">

        <div className={`h-28 bg-gradient-to-r ${gradient}`} />
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2">{name}</h2>

          <p className="text-[#a1a1aa] mb-4 text-sm flex-grow">
            {data.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies?.map((tech) => (
              <TechTag key={tech.id} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function TechTag({ tech }: { tech: Technology }) {
  return (
    <Badge
      variant="outline"
      className="px-2 py-1 rounded-md text-xs text-slate-300"
    >
      {tech.name}
    </Badge>
  );
}