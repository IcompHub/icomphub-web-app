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
import Link from "next/link";

export const loginSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  password: z.string().min(4, {
    message: "Senha deve ter pelo menos 4 caracteres.",
  }),
});

type FormData = z.infer<typeof loginSchema>;

interface ProjectFormProps {
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  submitText?: string;
}

export default function LoginForm({ initialData, onSubmit }: ProjectFormProps) {
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
          Entrar
        </Button>
        <div className="mt-4 text-center text-sm">
          Ainda não tem conta?{"  "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Cadastrar-se
          </Link>
        </div>
      </form>
    </Form>
  );
}
