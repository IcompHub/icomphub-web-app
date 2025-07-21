"use client";

import { motion } from "framer-motion";
import { Logo } from "../general/logo";
import Link from "next/link";
import { PenLine } from "lucide-react";
import raquel from "../../public/dev_profile/raquel.jpeg";
import Image from "next/image";
import { UploadIconTech } from "./upload-icon-tech";
interface Tech {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
}

interface ListTechProps {
  technologies: Tech[];
  images: { tech_id: number; thumbnail: string | null }[];
}

export default function ListTechnologies({
  technologies,
  images,
}: ListTechProps) {
  return (
    <>
      {technologies && technologies.length > 0 ? (
        <div className="lg:gap-8 md:gap-6 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2">
          {technologies.map((tech, i) => {
            const thumb = images.find((t) => t.tech_id === tech.id);
            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Espalha todas as props do projeto e adiciona o gradiente */}
                <TechCard {...tech} thumbnail={thumb?.thumbnail ?? null} />
              </motion.div>
            );
          })}
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
function TechCard({ id, slug, name, thumbnail }: Tech) {
  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">
      <div className="p-6 flex items-center justify-between flex-grow">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={`imagem do projeto ${id}`}
            className="h-15 max-w-30 object-cover object-center"
          />
        )}
        <h2 className="text-xl font-bold ">{name}</h2>

        <UploadIconTech id={id} slug={slug} />
      </div>
    </div>
  );
}
