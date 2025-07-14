"use client";

import { motion } from "framer-motion";
import { Logo } from "../general/logo";
import Link from "next/link";
import { PenLine } from "lucide-react";
interface Tech {
  id: number;
  name: string;
  slug: string;
}

interface ListTechProps {
  technologies: Tech[];
}

export default function ListTechnologies({ technologies }: ListTechProps) {
  return (
    <>
      {technologies && technologies.length > 0 ? (
        <div className="lg:gap-8 md:gap-6 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Espalha todas as props do projeto e adiciona o gradiente */}
              <TechCard {...tech} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="h-150 flex flex-col items-center justify-center w-full text-center">
          <Logo w={80} h={80} />
          <p className="mt-4 text-slate-400">Nenhuma tecnologia encontrada.</p>
        </div>
      )}
    </>
  );
}
function TechCard({ id, slug, name }: Tech) {
  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <Link href={`/technologies/${slug}-${id}/edit`}>
          <PenLine className="transition-colors cursor-pointer rounded border border-transparent hover:bg-white hover:border-[#1a222f] hover:text-[#1a222f] m-1" />
        </Link>
      </div>
    </div>
  );
}
