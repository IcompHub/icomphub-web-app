"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiCombobox } from "./combobox";

export const formSchema = z.object({
  nome: z.string().min(2, {
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
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  submitText?: string;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  submitText = "Cadastrar",
}: ProjectFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: initialData?.nome || "",
      descricao: initialData?.descricao || "",
      participantes: initialData?.participantes || [],
      tecnologias: initialData?.tecnologias || [],
      url: initialData?.url || "",
    },
  });

  const participantesOptions = [
    { value: "raquel", label: "Raquel de Sá" },
    { value: "keren", label: "Keren Guimarães" },
    { value: "luis", label: "Luis Santos" },
    { value: "carlos", label: "Carlos Oliveira" },
    { value: "ana", label: "Ana Pereira" },
    { value: "bruno", label: "Bruno Costa" },
    { value: "julia", label: "Julia Ferreira" },
  ];

  const tecnologiasOptions = [
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "django", label: "Django" },
    { value: "flutter", label: "Flutter" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do projeto" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Descrição
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Explique sobre o que é o projeto"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="participantes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Participantes
              </FormLabel>
              <FormControl>
                <MultiCombobox
                  placeholder="Digite o nome dos integrantes"
                  options={participantesOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tecnologias"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Tecnologias
              </FormLabel>
              <FormControl>
                <MultiCombobox
                  placeholder="Digite as tecnologias utilizadas"
                  options={tecnologiasOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                URL do projeto
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite onde o site está hospedado"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-6 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#e3e7eb] transition-colors"
        >
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
