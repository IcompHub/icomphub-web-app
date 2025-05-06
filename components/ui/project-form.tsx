"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChevronDown } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "./multi-select";

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  descricao: z.string().min(10, {
    message: "Descrição deve ter pelo menos 10 caracteres.",
  }),
  participantes: z.string().min(2, {
    message: "Selecione pelo menos um participante.",
  }),
  tecnologias: z.string().min(2, {
    message: "Selecione pelo menos uma tecnologia.",
  }),
  url: z.string().url({
    message: "URL inválida. Insira uma URL completa (ex: https://exemplo.com)",
  }),
});

export default function ProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      participantes: "",
      tecnologias: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
  }

  // Sample data for participants and technologies
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
            <FormItem className="space-y-2">
              <FormLabel className="text-[#f1f6fb] font-medium">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome do projeto"
                  {...field}
                  className="w-full px-4 py-6 bg-[#0f172a] border border-[#1a222f] rounded-md text-[#f1f6fb] placeholder:text-[#64748b]"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#f1f6fb] font-medium">
                Descrição
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Explique sobre o que é o projeto"
                  {...field}
                  className="w-full px-4 py-6 bg-[#0f172a] border border-[#1a222f] rounded-md text-[#f1f6fb] placeholder:text-[#64748b]"
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
            <FormItem className="space-y-2">
              <FormLabel className="text-[#f1f6fb] font-medium">
                Participantes
              </FormLabel>
              <div className="relative">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <MultiSelect
                      placeholder="Digite o nome dos integrantes"
                      options={participantesOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <SelectContent className="bg-[#0f172a] border border-[#1a222f] text-[#f1f6fb]">
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                    <SelectItem value="ana">Ana Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tecnologias"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#f1f6fb] font-medium">
                Tecnologias
              </FormLabel>
              <div className="relative">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <MultiSelect
                      placeholder="Digite os tecnologias utilizadas"
                      options={tecnologiasOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <SelectContent className="bg-[#0f172a] border border-[#1a222f] text-[#f1f6fb]">
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="tailwind">Tailwind CSS</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#f1f6fb] font-medium">
                URL do projeto
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite onde o site está hospedado"
                  {...field}
                  className="w-full px-4 py-6 bg-[#0f172a] border border-[#1a222f] rounded-md text-[#f1f6fb] placeholder:text-[#64748b]"
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
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
