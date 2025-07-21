import { z } from "zod";

// Coloque o seu schema Zod aqui.
export const ProjectFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  descricao: z
    .string()
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres." }),
  participantes: z
    .array(
      z.object({
        id: z.number().optional(),
        user_id: z.number(),
        nickname: z.string(),
        role: z.string(),
      })
    )
    .min(1, { message: "Selecione pelo menos um participante." }),
  tecnologias: z
    .array(z.object({ id: z.number(), name: z.string(), slug: z.string() }))
    .min(1, { message: "Selecione pelo menos uma tecnologia." }),
  url: z.string().url({ message: "URL inválida. Insira uma URL completa." }),
});

// Coloque a definição do estado aqui também, pois é usada nos dois lados.
export type ProjectFormState = {
  errors?: {
    name?: string[];
    descricao?: string[];
    participantes?: string[];
    tecnologias?: string[];
    url?: string[];
  };
  message?: string | null;
};

// Se o tipo ProjetoPayload também for usado em outros lugares, pode ficar aqui.
export interface ProjetoPayload {
  id?: number;
  class_group_id: number;
  data: {
    description: string;
    url: string;
  };
  name: string;
  slug: string;
  members: MemberPayload[];
  technologies: DefaultPayload[];
}

export interface Role {
  id: number;
  slug: string;
  name: string;
  status: string;
}
export interface MemberPayload {
  nickname: string;
  role?: string;
  role_ids: number[];
  id?: number;
  user_id: number;
  roles?: Role[];
}

export interface DefaultPayload {
  id: number;
  name: string;
  slug: string;
}
