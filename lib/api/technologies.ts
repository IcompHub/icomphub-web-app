import { generateSlug } from "../utils";
import api from "./axios";

// Mock de dados para desenvolvimento local (opcional)
export const technologiesData = [
  { id: 1, name: "React", icon: "/icons/react.svg" },
  { id: 2, name: "Next.js", icon: "/icons/nextjs.svg" },
  { id: 3, name: "TypeScript", icon: "/icons/typescript.svg" },
  { id: 4, name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
  { id: 5, name: "Node.js", icon: "/icons/node.svg" },
  { id: 6, name: "Python", icon: "/icons/python.svg" },
  { id: 7, name: "Django", icon: "/icons/django.svg" },
  { id: 8, name: "Flutter", icon: "/icons/flutter.svg" },
];

// Tipos
export interface TechnologyPayload {
  name: string;
  icon?: string;
}

export interface Technology extends TechnologyPayload {
  id: number;
  name: string;
  slug?: string;
  has_image?: boolean;
}

// CRUD

export async function criarTechnology(data: TechnologyPayload) {
  const newData = {
    ...data,
    slug: generateSlug(data.name),
  };
  const res = await api.post("/technologies", newData);
  return res.data;
}

export async function atualizarTechnology(data: any) {
  const newData = {
    ...data,
    slug: generateSlug(data.name),
  };
  const res = await api.put(`/technologies/${data.id}`, newData);
  return res.data;
}

export async function listarTechnologies() {
  const res = await api.get("/technologies?pageNumber=1&pageSize=10");

  return res.data.data.items;
}

export async function listarTechnologyPorID(id: number) {
  const res = await api.get(`/technologies/${id}`);

  return res.data.data;
}

export async function buscarTechnologyPorId(id: string | number) {
  const res = await api.get(`/technologies/${id}`);
  return res.data;
}

export async function listarImgsTech(
  technologies: Technology[]
): Promise<{ tech_id: number; thumbnail: string | null }[]> {
  if (technologies.length === 0) {
    return [];
  }

  const thumbnails = await Promise.all(
    technologies.map(async (tech) => {
      if (!tech.has_image) {
        return {
          tech_id: tech.id,
          thumbnail: null,
        };
      }

      try {
        const response = await api.get(`/technologies/image/${tech.id}`, {
          responseType: "arraybuffer",
        });

        const contentType = response.headers["content-type"];
        const base64 = Buffer.from(response.data).toString("base64");

        return {
          tech_id: tech.id,
          thumbnail: `data:${contentType};base64,${base64}`,
        };
      } catch (error) {
        console.error(`Erro ao buscar thumbnail do tech ${tech.id}:`, error);
        return {
          tech_id: tech.id,
          thumbnail: null,
        };
      }
    })
  );

  return thumbnails;
}
