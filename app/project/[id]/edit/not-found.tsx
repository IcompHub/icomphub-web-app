import type React from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f5f9] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Projetos</h1>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#5d6674]" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full bg-transparent border border-[#1a222f] rounded-lg py-2 pl-10 pr-4 text-[#f1f5f9] placeholder:text-[#5d6674] focus:outline-none focus:ring-1 focus:ring-[#414d60]"
          />
        </div>

        <div className="space-y-8">
          <ProjectCard
            title="Projeto sem foto"
            gradient="from-cyan-400 to-green-400"
            description="Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto"
          />

          <ProjectCard
            title="Projeto sem foto 2"
            gradient="from-pink-500 via-red-500 to-yellow-500"
            description="Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto"
          />
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  gradient: string;
}

function ProjectCard({ title, description, gradient }: ProjectCardProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f]">
      <div className={`h-48 bg-gradient-to-r ${gradient}`} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-[#64748b] mb-4">{description}</p>
        <div className="flex gap-2">
          <TechTag>React JS</TechTag>
          <TechTag>GoLang</TechTag>
        </div>
      </div>
    </div>
  );
}

function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="#"
      className="inline-block px-4 py-1.5 rounded-full border border-[#1a222f] text-sm hover:bg-[#1a222f] transition-colors"
    >
      {children}
    </Link>
  );
}
