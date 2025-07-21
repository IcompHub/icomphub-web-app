"use client";
import { Technology } from "@/lib/api/project";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface TechnologiesCarouselProps {
  technologies?: Technology[];
  thumbnails: { tech_id: number; thumbnail: string | null }[];
}

export function TechnologiesCarousel({
  technologies,
  thumbnails,
}: TechnologiesCarouselProps) {
  if (!technologies || technologies.length === 0) {
    return <div className="mb-8">Nenhum tecnologia encontrada.</div>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-[#f1f6fb]">Tecnologias</h2>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {technologies.map((tech, id) => {
            const thumb = thumbnails.find((t) => t.tech_id === tech.id);
            return (
              <CarouselItem key={id} className="basis-1/3 shrink-0">
                <Card className="bg-transparent border-[#1a222f] text-[#f1f6fb] h-40 flex flex-col items-center justify-center ">
                  <CardContent className=" flex flex-col items-center justify-center gap-4">
                    <div className="flex  flex-col items-center justify-center">
                      <TechIcon
                        name={tech.name}
                        thumbnail={thumb?.thumbnail ?? null}
                      />
                    </div>
                    <p className="text-md text-center">{tech.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Botões personalizados, estilo escuro com gradiente */}
        <CarouselPrevious className="left-0 bg-gradient-to-r from-[#010103] to-transparent text-white hover:bg-[#1a2538]" />
        <CarouselNext className="right-0 bg-gradient-to-l from-[#010103] to-transparent text-white hover:bg-[#1a2538]" />
      </Carousel>
    </div>
  );
}

function TechIcon({
  name,
  thumbnail,
}: {
  name: string;
  thumbnail: string | null;
}) {
  // Simple component to render tech icons
  // In a real app, you would use actual SVG icons
  return thumbnail ? (
    <img
      src={thumbnail}
      alt={`imagem da tech ${name}`}
      className="h-15 w-full  mx-auto object-cover object-center"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
      ?
    </div>
  );
}
