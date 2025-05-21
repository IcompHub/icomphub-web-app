import type React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
          <ProjectCard
            id="innova"
            title="Innova"
            gradient="from-pink-500 via-red-500 to-yellow-500"
            description="Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto"
          />

          <ProjectCard
            id="projeto-sem-foto"
            title="Projeto sem foto"
            gradient="from-cyan-400 to-green-400"
            description="Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto"
          />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
}

function ProjectCard({ id, title, description, gradient }: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`} className="block">
      <div className="rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">
        <div className={`h-26 bg-gradient-to-r ${gradient}`} />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-[#64748b] mb-4 text-sm">{description}</p>
          <div className="flex gap-2">
            <TechTag>React JS</TechTag>
            <TechTag>GoLang</TechTag>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-4 py-1.5 rounded-full border border-[#F1F5F9] text-sm">
      {children}
    </span>
  );
}
