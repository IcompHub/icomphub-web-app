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

export interface ProjetoPayload {
  class_group_id: number;
  data: {
    description: string;
    participants: string[];
    technologies: string[];
    url: string;
  };
  name: string;
  slug: string;
}
export async function criarProjeto(data: ProjetoPayload) {
  const res = await fetch("https://icomphub-api-devel.nelsul.com/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function atualizarProjeto(data: any) {
  // const res = await api.put(`/projects/${data.id}`, data);
  // return res.data;
  console.log(data.id);
}

export async function listarProjetos() {
  const res = await api.get("/projects?pageNumber=1&pageSize=10");

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
