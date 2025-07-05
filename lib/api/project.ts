// lib/api/projects.ts
import api from "./axios";

export const projectData = [
  {
    id: "innova",
    title: "Innova",
    gradient: "from-pink-500 via-red-500 to-yellow-500",
    description:
      " Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto.",
    participants: [
      {
        name: "Keren Guimarães",
        role: "Analista de Requisitos",
        github: true,
        linkedin: true,
      },
      { name: "Luis Santos", role: "QA Tester", github: true, linkedin: false },
      {
        name: "Nelson Carvalho",
        role: "Dev FullStack",
        github: true,
        linkedin: false,
      },
      {
        name: "Raquel de Sá",
        role: "Dev/Frontend",
        github: true,
        linkedin: true,
      },
      {
        name: "Sarah Júlia",
        role: "Dev Backend",
        github: false,
        linkedin: true,
      },
    ],
    technologies: [
      { name: "React Js", icon: "/icons/react.svg" },
      { name: "Firebase", icon: "/icons/firebase.svg" },
      { name: "Go Lang", icon: "/icons/golang.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
    ],
  },
  {
    id: "projeto-sem-foto",
    title: "Projeto sem foto",
    gradient: "from-cyan-400 to-green-400",
    description:
      " Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto.",
    participants: [
      {
        name: "Keren Guimarães",
        role: "Analista de Requisitos",
        github: true,
        linkedin: true,
      },
      { name: "Luis Santos", role: "QA Tester", github: true, linkedin: false },
      {
        name: "Nelson Carvalho",
        role: "Dev FullStack",
        github: true,
        linkedin: false,
      },
    ],
    technologies: [
      { name: "Go Lang", icon: "/icons/golang.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
    ],
  },
  {
    id: "projeto-2",
    title: "Projeto 2",
    gradient: "from-blue-400 to-purple-400",
    description:
      " Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto.",
    participants: [
      {
        name: "Keren Guimarães",
        role: "Analista de Requisitos",
        github: true,
        linkedin: true,
      },
      { name: "Luis Santos", role: "QA Tester", github: true, linkedin: false },
      {
        name: "Nelson Carvalho",
        role: "Dev FullStack",
        github: true,
        linkedin: false,
      },
    ],
    technologies: [
      { name: "Go Lang", icon: "/icons/golang.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
    ],
  },

  {
    id: "projeto-3",
    title: "Projeto 3",
    gradient: "from-blue-800 to-blue-400",
    description:
      " Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto.",
    participants: [
      {
        name: "Keren Guimarães",
        role: "Analista de Requisitos",
        github: true,
        linkedin: true,
      },
      { name: "Luis Santos", role: "QA Tester", github: true, linkedin: false },
      {
        name: "Nelson Carvalho",
        role: "Dev FullStack",
        github: true,
        linkedin: false,
      },
    ],
    technologies: [
      { name: "Go Lang", icon: "/icons/golang.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
    ],
  },
  {
    id: "projeto-4",
    title: "Projeto 4",
    gradient: "from-pink-700 to-pink-300",
    description:
      " Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto.",
    participants: [
      {
        name: "Keren Guimarães",
        role: "Analista de Requisitos",
        github: true,
        linkedin: true,
      },
      { name: "Luis Santos", role: "QA Tester", github: true, linkedin: false },
      {
        name: "Nelson Carvalho",
        role: "Dev FullStack",
        github: true,
        linkedin: false,
      },
    ],
    technologies: [
      { name: "Go Lang", icon: "/icons/golang.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
    ],
  },
  {
    id: "projeto-5",
    title: "Projeto 5",
    gradient: "from-pink-700 to-pink-300",
    description:
      " Texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto texto descritivo do projeto.",
    participants: [
      {
        name: "Keren Guimarães",
        role: "Analista de Requisitos",
        github: true,
        linkedin: true,
      },
      { name: "Luis Santos", role: "QA Tester", github: true, linkedin: false },
      {
        name: "Nelson Carvalho",
        role: "Dev FullStack",
        github: true,
        linkedin: false,
      },
    ],
    technologies: [
      { name: "Go Lang", icon: "/icons/golang.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
    ],
  },
];



export interface Technology {
  id: number;
  slug: string;
  name: string;
}

export interface ProjectDetails {
  description: string;
  repository_url: string;
  title: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  status: string; 
  data: ProjectDetails; 
  class_group_id: number;
  technologies: Technology[];
}

export interface PaginatedProjectsResponse {
  total_items: number;
  total_pages: number;
  page_number: number;
  page_size: number;
  items: Project[];
}

export async function criarProjeto(data: Project) {
  console.log(data);

  const res = await api.post("/projects", data);

  return res.data;
}

export async function atualizarProjeto(id: number, data: any) {
  console.log(id);
  const res = await api.put(`/projects/${id}`, data);
  console.log(res);
  return res.data;
}

export async function listarProjetos(): Promise<Project[]> {
  const res = await api.get<{ data: PaginatedProjectsResponse }>("/projects?pageNumber=1&pageSize=10");

  return res.data.data.items;
}
export async function listarProjetoPorID(id: number) {
  const res = await api.get(`/projects/${id}`);
  // return projectData.find((p) => p.id === id);
  console.log(res.data.data);
  return res.data.data;
}

export async function buscarProjetoPorId(id: string | number) {
  const res = await api.get(`/projects/${id}`);
  return res.data;
}
