"use client";

import LoginForm, { loginSchema } from "@/components/user/login";
import { z } from "zod";

function handleLogin(values: z.infer<typeof loginSchema>) {
  console.log("entrar");
  console.log(values);
  try {
    // criarProjeto(values);
  } catch (error) {
    alert("Erro ao criar projeto");
    console.error(error);
  }
}

export default function Login() {
  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Entrar</h1>
        <p className="text-[#94a3b8] mb-8">
          Seja bem-vind_ de volta ao IcompHub!
        </p>

        <LoginForm onSubmit={handleLogin} />
      </div>
    </main>
  );
}
