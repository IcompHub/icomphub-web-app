"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/lib/api/actions/login-user";
import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().min(2, {
    message: "Email deve ter pelo menos 2 caracteres.",
  }),
  password: z.string().min(4, {
    message: "Senha deve ter pelo menos 4 caracteres.",
  }),
});
export type FormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  submitText?: string;
}

export default function LoginForm({ submitText = "Entrar" }: LoginFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          className="text-[#f1f6fb] font-medium block mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          placeholder="Email de acesso"
          name="email"
          type="email"
          defaultValue=""
        />
        {state?.errors?.email &&
          state.errors.email.map((error) => (
            <div className="text-red-500" key={error}>
              {error}
            </div>
          ))}
      </div>

      <div>
        <label
          className="text-[#f1f6fb] font-medium block mb-2"
          htmlFor="password"
        >
          Senha
        </label>
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          defaultValue=""
        />
        {state?.errors?.password &&
          state.errors.password.map((error) => (
            <div className="text-red-500" key={error}>
              {error}
            </div>
          ))}
      </div>

      <Button
        type="submit"
        className="w-full py-6 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#e3e7eb] transition-colors cursor-pointer"
      >
        {submitText}
      </Button>
      <div className="mt-4 text-center text-sm">
        Ainda não tem conta?{"  "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Cadastrar-se
        </Link>
      </div>
      {state?.message && (
        <div className="text-red-500 mt-2">{state.message}</div>
      )}
    </form>
  );
}
