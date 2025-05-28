"use client";

import LoginForm, { loginSchema } from "@/components/user/login";
import { useRouter } from "next/router";
import { z } from "zod";

export default function Login() {
  // const router = useRouter();

  function handleLogin(values: z.infer<typeof loginSchema>) {
    try {
      console.log("entrar");
      console.log(values);
      // Simular login bem-sucedido
      // router.push("/projects");
    } catch (error) {
      alert("Erro ao logar");
      console.error(error);
    }
  }

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
