"use client";

import { useActionState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import MultiCombobox from "./combobox";
import { createProjectAction } from "@/lib/api/actions/create-project";
import { ProjectFormState } from "@/lib/definitions";
import { editProjectAction } from "@/lib/api/actions/edit-project";

type FormData = z.infer<typeof formSchema>;

interface ProjectFormProps {
  initialData?: any;
  submitText?: string;
  technologies: any;
}

// 1. Defina o schema de validação aqui. É o mesmo que você já tinha.
export const formSchema = z.object({
  id: z.string().optional(), // FormData envia tudo como string
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres."),
  participantes: z
    .array(z.string())
    .min(1, "Selecione pelo menos um participante."),
  tecnologias: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma tecnologia."),
  url: z.string().url("URL inválida. Insira uma URL completa."),
});

// 2. Defina a interface para o estado do formulário
export type State = {
  errors?: {
    name?: string[];
    descricao?: string[];
    participantes?: string[];
    tecnologias?: string[];
    url?: string[];
  };
  message?: string | null;
};

const participantesOptions = [
  { slug: "raquel", name: "Raquel de Sá" },
  { slug: "keren", name: "Keren Guimarães" },
  { slug: "luis", name: "Luis Santos" },
  { slug: "carlos", name: "Carlos Oliveira" },
  { slug: "ana", name: "Ana Pereira" },
  { slug: "bruno", name: "Bruno Costa" },
  { slug: "julia", name: "Julia Ferreira" },
  { slug: "ismael", name: "Ismael Ferreira" },
];

export default function ProjectForm({
  initialData,
  submitText = "Cadastrar",
  technologies,
}: ProjectFormProps) {
  const initialState: ProjectFormState = { message: null, errors: {} };
  const [state, formActionCreate] = useActionState(
    createProjectAction,
    initialState
  );
  const [stateUpdate, formActionUpdate] = useActionState(
    editProjectAction,
    initialState
  );

  const mappedInitialData = initialData
    ? {
        id: initialData.id?.toString() ?? "",
        name: initialData.name ?? "",
        descricao: initialData.data?.description ?? "",
        participantes: initialData.data?.participants ?? [],
        tecnologias: initialData.data?.technologies ?? [],
        url: initialData.data?.url ?? "",
      }
    : {
        id: "",
        name: "",
        descricao: "",
        participantes: [],
        tecnologias: [],
        url: "",
      };

  return (
    <form
      action={submitText === "Cadastrar" ? formActionCreate : formActionUpdate}
      className="space-y-6"
    >
      <input type="hidden" name="id" value={mappedInitialData.id} />
      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">Nome</label>
        <Input
          name="name"
          placeholder="Digite o nome do projeto"
          defaultValue={mappedInitialData.name}
          // value={formData.name}
          // onChange={handleChange}
        />
        {state.errors?.name && (
          <div className="text-red-500 mt-1">
            {state.errors.name.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          Descrição
        </label>
        <Input
          name="descricao"
          placeholder="Explique sobre o que é o projeto"
          defaultValue={mappedInitialData.descricao}
          // value={formData.descricao}
          // onChange={handleChange}
        />
        {state.errors?.descricao && (
          <div className="text-red-500 mt-1">
            {state.errors.descricao.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          Participantes
        </label>
        <MultiCombobox
          name="participantes"
          placeholder="Digite o nome dos integrantes"
          options={participantesOptions}
          defaultValue={mappedInitialData.participantes}
          // value={formData.participantes}
          // onChange={(value) => handleArrayChange("participantes", value)}
        />
        {state.errors?.participantes && (
          <div className="text-red-500 mt-1">
            {state.errors.participantes.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          Tecnologias
        </label>
        <MultiCombobox
          name="tecnologias"
          placeholder="Digite as tecnologias utilizadas"
          options={technologies}
          defaultValue={mappedInitialData.tecnologias}
        />
        {state.errors?.tecnologias && (
          <div className="text-red-500 mt-1">
            {state.errors.tecnologias.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          URL do projeto
        </label>
        <Input
          name="url"
          placeholder="Digite onde o site está hospedado"
          defaultValue={mappedInitialData.url}
          // value={formData.url}
          // onChange={handleChange}
        />
        {state.errors?.url && (
          <div className="text-red-500 mt-1">
            {state.errors.url.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-6 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#e3e7eb] transition-colors cursor-pointer"
      >
        {submitText}
      </Button>
    </form>
  );
}
