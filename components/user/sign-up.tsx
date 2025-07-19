// sign-up-form.tsx
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

import { useTransition } from "react";
import { signUpAction } from "@/lib/api/actions/sign-up.actions";

export const signUpSchema = z.object({
  full_name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  nickname: z.string().min(2, {
    message: "Nickname deve ter pelo menos 2 caracteres.",
  }),
  registration: z.string().min(2, {
    message: "Matrícula deve ter pelo menos 2 caracteres.",
  }),
  institutional_email: z.string().email({
    message: "Email institucional inválido.",
  }),
  personal_email: z.string().email({
    message: "Email pessoal inválido.",
  }),
  password: z.string().min(4, {
    message: "Senha deve ter pelo menos 4 caracteres.",
  }),

  // url_linkedin: z.string().url({
  //   message:
  //     "URL do LinkedIn inválida. Insira uma URL completa (ex: https://linkedin.com/in/usuario).",
  // }),
  // url_github: z.string().url({
  //   message:
  //     "URL do GitHub inválida. Insira uma URL completa (ex: https://github.com/usuario).",
  // }),
  // role_project: z.string().min(2, {
  //   message: "Cargo no projeto deve ter pelo menos 2 caracteres.",
  // }),
});
type FormData = z.infer<typeof signUpSchema>;

interface ProjectFormProps {
  initialData?: Partial<FormData>;
}
export type SignUpFormState = {
  errors?: {
    full_name?: string[];
    nickname?: string[];
    registration?: string[];
    institutional_email?: string[];
    personal_email?: string[];
    password?: string[];
    url_linkedin?: string[];
    url_github?: string[];
    role_project?: string[];
  };
  message?: string | null;
};

export default function SignUpForm({ initialData }: ProjectFormProps) {
  // const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: initialData?.full_name || "",
      nickname: initialData?.nickname || "",
      registration: initialData?.registration || "",
      institutional_email: initialData?.institutional_email || "",
      personal_email: initialData?.personal_email || "",
      // url_linkedin: initialData?.url_linkedin || "",
      // url_github: initialData?.url_github || "",
      password: initialData?.password || "",

      // role_project: initialData?.role_project || "",
    },
  });

  async function onSubmit(data: FormData) {
    // startTransition(async () => {
    // Cria um objeto FormData a partir dos valores do formulário

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await signUpAction({}, formData);

    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {form.formState.errors.root && (
          <div className="text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="full_name"
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
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Nickname
              </FormLabel>
              <FormControl>
                <Input placeholder="Nickname" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Matrícula
              </FormLabel>
              <FormControl>
                <Input placeholder="Matrícula" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institutional_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Email institucional
              </FormLabel>
              <FormControl>
                <Input placeholder="Email de acesso" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personal_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">
                Email pessoal
              </FormLabel>
              <FormControl>
                <Input placeholder="Email de acesso" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="role_project"
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
        /> */}
        {/* <FormField
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
        /> */}
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
