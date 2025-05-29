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

export const loginSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  password: z.string().min(4, {
    message: "Senha deve ter pelo menos 4 caracteres.",
  }),
  url_linkedin: z.string().url({
    message: "URL inválida. Insira uma URL completa (ex: https://exemplo.com)",
  }),
  url_github: z.string().url({
    message: "URL inválida. Insira uma URL completa (ex: https://exemplo.com)",
  }),
});

type FormData = z.infer<typeof loginSchema>;

interface ProjectFormProps {
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  submitText?: string;
}

export default function SignUpForm({
  initialData,
  onSubmit,
}: ProjectFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nome: initialData?.nome || "",
      password: initialData?.password || "",
    },
  });

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
                <Input placeholder="Nome de usuário" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Cargo no projeto
              </FormLabel>
              <FormControl>
                <Input placeholder="Cargo no projeto" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url_linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                LinkedIn
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
        <FormField
          control={form.control}
          name="url_github"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                GitHub
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Senha
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-6 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#e3e7eb] transition-colors cursor-pointer"
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
