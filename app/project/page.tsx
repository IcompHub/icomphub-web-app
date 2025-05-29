"use client";
import type React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { ProjectPagination } from "@/components/project/project-pagination";
import { Footer } from "@/components/project/footer";
import { listarProjetos } from "@/lib/api/project";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/general/search";
import { useState } from "react";

const projetos = await listarProjetos();

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className=" bg-[#010103] text-[#f1f5f9] p-6">
      <div className="max-w-6xl mx-auto ">
        <motion.div
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Projetos</h1>

            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#5d6674]" />
              </div>
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        <div className="lg:gap-8 md:gap-6 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2">
          {projetos.map((project: ProjectCardProps, i) => (
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
            </motion.div>
          ))}
        </div>
        <ProjectPagination />
        <Footer />
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
