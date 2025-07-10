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
  id?: number;
  name: string;
  slug?: string;
}

// CRUD

export async function criarTechnology(data: TechnologyPayload) {
  const newData = {
    ...data,
    slug: generateSlug(data.name),
  };
  const res = await api.post("technologies", newData);
  return res.data;
}

export async function atualizarTechnology(data: TechnologyPayload) {
  console.log(data);
  // const res = await api.put(`/technologies/${data.id}`, data);
  // return res.data;
}

export async function listarTechnologies() {
  const res = await api.get("/technologies?pageNumber=1&pageSize=10");

  return res.data.data.items;
}

export async function listarTechnologyPorID(id: number) {
  const res = await api.get(`/technologies/${id}`);
  console.log(res.data.data);
  return res.data.data;
}

export async function buscarTechnologyPorId(id: string | number) {
  const res = await api.get(`/technologies/${id}`);
  return res.data;
}
