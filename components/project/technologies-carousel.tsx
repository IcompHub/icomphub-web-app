"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface TechnologiesCarouselProps {
  technologies: { name: string }[];
}

export function TechnologiesCarousel({
  technologies,
}: TechnologiesCarouselProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-[#f1f6fb]">Tecnologias</h2>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {technologies.map((tech, index) => (
            <CarouselItem key={index} className="basis-1/3 shrink-0 px-1">
              <Card className="bg-transparent border-[#1a222f] text-[#f1f6fb]">
                <CardContent className="flex flex-col items-center justify-center py-4 px-2">
                  <div className="h-10 mb-2 flex items-center justify-center">
                    <TechIcon name={tech.name} />
                  </div>
                  <span className="text-xs text-center">{tech.name}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Botões personalizados, estilo escuro com gradiente */}
        <CarouselPrevious className="left-0 bg-gradient-to-r from-[#010103] to-transparent text-white hover:bg-[#1a2538]" />
        <CarouselNext className="right-0 bg-gradient-to-l from-[#010103] to-transparent text-white hover:bg-[#1a2538]" />
      </Carousel>
    </div>
  );
}

function TechIcon({ name }: { name: string }) {
  // Simple component to render tech icons
  // In a real app, you would use actual SVG icons

  if (name === "React Js") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#61dafb] bg-opacity-20 flex items-center justify-center">
        <div className="text-[#61dafb] text-2xl">⚛️</div>
      </div>
    );
  }

  if (name === "Firebase") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#ffca28] bg-opacity-20 flex items-center justify-center">
        <div className="text-[#ffca28] text-2xl">🔥</div>
      </div>
    );
  }

  if (name === "Go Lang") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#00add8] bg-opacity-20 flex items-center justify-center">
        <div className="text-[#00add8] text-2xl">🔹</div>
      </div>
    );
  }

  if (name === "C#") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#9b4f96] bg-opacity-20 flex items-center justify-center">
        <div className="text-[#9b4f96] text-2xl">🔷</div>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
      ?
    </div>
  );
}
