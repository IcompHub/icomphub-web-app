"use client";

import { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { criarProjeto, ProjetoPayload } from "@/lib/api/project";
import MultiCombobox from "./combobox";

export const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  descricao: z.string().min(10, {
    message: "Descrição deve ter pelo menos 10 caracteres.",
  }),
  participantes: z.array(z.string()).min(1, {
    message: "Selecione pelo menos um participante.",
  }),
  tecnologias: z.array(z.string()).min(1, {
    message: "Selecione pelo menos uma tecnologia.",
  }),
  url: z.string().url({
    message: "URL inválida. Insira uma URL completa (ex: https://exemplo.com)",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface ProjectFormProps {
  initialData?: any;
  submitText?: string;
  technologies: any;
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ProjectForm({
  initialData,
  submitText = "Cadastrar",
  technologies,
}: ProjectFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>(
    initialData
      ? {
          id: initialData.id || "",
          name: initialData.name || "",
          descricao: initialData.data?.description || "",
          participantes: initialData.data?.participants || [],
          tecnologias: initialData.data?.technologies || [],
          url: initialData.data?.url || "",
        }
      : {
          name: "",
          descricao: "",
          participantes: [],
          tecnologias: [],
          url: "",
        }
  );

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, value: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { name, descricao, participantes, tecnologias, url } = formData;

      const payload: ProjetoPayload = {
        class_group_id: 0,
        data: {
          description: descricao,
          participants: participantes,
          technologies: tecnologias,
          url: url,
        },
        name: name,
        slug: generateSlug(name),
      };

      await criarProjeto(payload);
      alert("Projeto cadastrado com sucesso!");
      // Limpar o formulário após sucesso
      setFormData({
        name: "",
        descricao: "",
        participantes: [],
        tecnologias: [],
        url: "",
      });
    } catch (error) {
      alert("Erro ao criar projeto");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">Nome</label>
        <Input
          name="name"
          placeholder="Digite o nome do projeto"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          Descrição
        </label>
        <Input
          name="descricao"
          placeholder="Explique sobre o que é o projeto"
          value={formData.descricao}
          onChange={handleChange}
        />
        {errors.descricao && (
          <p className="text-red-500 mt-1">{errors.descricao}</p>
        )}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          Participantes
        </label>
        <MultiCombobox
          placeholder="Digite o nome dos integrantes"
          options={participantesOptions}
          value={formData.participantes}
          onChange={(value) => handleArrayChange("participantes", value)}
        />
        {errors.participantes && (
          <p className="text-red-500 mt-1">{errors.participantes}</p>
        )}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          Tecnologias
        </label>
        <MultiCombobox
          placeholder="Digite as tecnologias utilizadas"
          options={technologies}
          value={formData.tecnologias}
          onChange={(value) => handleArrayChange("tecnologias", value)}
        />
        {errors.tecnologias && (
          <p className="text-red-500 mt-1">{errors.tecnologias}</p>
        )}
      </div>

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">
          URL do projeto
        </label>
        <Input
          name="url"
          placeholder="Digite onde o site está hospedado"
          value={formData.url}
          onChange={handleChange}
        />
        {errors.url && <p className="text-red-500 mt-1">{errors.url}</p>}
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
