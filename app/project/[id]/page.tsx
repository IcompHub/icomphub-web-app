import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  MoreHorizontal,
} from "lucide-react";
import { Footer } from "@/components/project/footer";
import { ProjectBreadcrumb } from "@/components/project/project-breadcrumb";
import { projectData } from "../page";
import { TechnologiesCarousel } from "@/components/project/technologies-carousel";

export default function ProjectPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the project data based on the ID
  const project = projectData[0];

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

        {/* Participants */}
        <h2 className="text-xl font-bold mb-4">Participantes</h2>
        <div className="space-y-2 mb-8">
          {project.participants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 bg-[#080D17] rounded-lg border border-[#1A222F]"
            >
              <div className="font-medium">{participant.name}</div>
              <div className="flex items-center">
                <span className="text-[#64748b] text-sm mr-4">
                  {participant.role}
                </span>
                <div className="flex space-x-2">
                  {participant.github && (
                    <Link
                      href="#"
                      className="text-[#f1f5f9] hover:text-[#64748b]"
                    >
                      <Github size={20} />
                    </Link>
                  )}
                  {participant.linkedin && (
                    <Link
                      href="#"
                      className="text-[#f1f5f9] hover:text-[#64748b]"
                    >
                      <Linkedin size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies */}
        {/* <h2 className="text-xl font-bold mb-4">Tecnlogias</h2>
        <div className="relative mb-8">
          <div className="flex space-x-8 items-center py-4 px-6 justify-start overflow-x-auto">
            <button className="absolute left-0 z-10 bg-gradient-to-r from-[#010103] to-transparent pl-1 pr-6 h-full flex items-center">
              <ChevronLeft size={24} />
            </button>

            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 min-w-[80px]"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <TechIcon name={tech.name} />
                </div>
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}

            <button className="absolute right-0 z-10 bg-gradient-to-l from-[#010103] to-transparent pr-1 pl-6 h-full flex items-center">
              <ChevronRight size={24} />
            </button>
          </div>
        </div> */}
        <TechnologiesCarousel technologies={project.technologies} />

        {/* README.md */}
        <h2 className="text-xl font-bold mb-4">README.md</h2>
        <div className="bg-[#080D17] rounded-lg p-4 mb-12 flex justify-center items-center h-16 border border-[#1A222F]">
          <MoreHorizontal size={24} className="text-[#64748b]" />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
