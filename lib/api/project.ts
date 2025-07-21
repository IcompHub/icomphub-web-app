// lib/api/projects.ts
import { requestToBodyStream } from "next/dist/server/body-streams";
import { ProjetoPayload } from "../definitions";
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
  thumbnail_id: string | null;
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

export async function criarProjeto(data: ProjetoPayload) {
  const { technologies, ...rest } = data;
  const newData = {
    ...rest,
    technology_ids: technologies.map((tech) => tech.id),
  };

  try {
    const res = await api.post("/projects", newData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function atualizarProjeto(id: number, data: ProjetoPayload) {
  const { technologies, ...rest } = data;
  const newData = {
    ...rest,
    technology_ids: technologies.map((tech) => tech.id),
  };
  console.log(newData);
  const res = await api.put(`/projects/${id}`, newData);

  return res.data;
}

export async function listarProjetos(): Promise<Project[]> {
  const res = await api.get<{ data: PaginatedProjectsResponse }>(
    "/projects?pageNumber=1&pageSize=10"
  );

  return res.data.data.items;
}

export async function listarThumbProjetos(
  projetos: Project[]
): Promise<{ project_id: number; thumbnail: string | null }[]> {
  if (projetos.length === 0) {
    return [];
  }

  const thumbnails = await Promise.all(
    projetos.map(async (projeto) => {
      if (!projeto.thumbnail_id) {
        return {
          project_id: projeto.id,
          thumbnail: null,
        };
      }

      try {
        const response = await api.get(`/projects/thumbnail/${projeto.id}`, {
          responseType: "arraybuffer",
        });

        const contentType = response.headers["content-type"];
        const base64 = Buffer.from(response.data).toString("base64");

        return {
          project_id: projeto.id,
          thumbnail: `data:${contentType};base64,${base64}`,
        };
      } catch (error) {
        console.error(
          `Erro ao buscar thumbnail do projeto ${projeto.id}:`,
          error
        );
        return {
          project_id: projeto.id,
          thumbnail: null,
        };
      }
    })
  );

  return thumbnails;
}

export interface Role {
  id: number;
  slug: string;
  name: string;
}

export interface User {
  id: number;
  slug: string;
  nickname: string;
  full_name: string;
}

export interface Members {
  id: number;
  nickname: string;
  status: string;
  user: User;
  role: Role;
}

export interface ProjectDetailsDTO {
  id: number;
  slug: string;
  name: string;
  status: string;
  data: ProjectDetails;
  class_group_id?: number;
  technologies: Technology[];
  members: Members[];
}

export async function listarProjetoPorID(id: number) {
  const res = await api.get(`/projects/${id}`);
  const projects: ProjectDetailsDTO = res.data.data;

  return projects;
}

export async function listarThumbPorID(id: number) {
  try {
    const response = await api.get(`/projects/thumbnail/${id}`, {
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"];
    const base64 = Buffer.from(response.data).toString("base64");

    return {
      project_id: id,
      thumbnail: `data:${contentType};base64,${base64}`,
    };
  } catch (error) {
    // console.error(`Erro ao buscar thumbnail do ${id}:`, error);
    return {
      project_id: id,
      thumbnail: null,
    };
  }
}

export async function buscarProjetoPorId(id: string | number) {
  const res = await api.get(`/projects/${id}`);
  return res.data;
}
