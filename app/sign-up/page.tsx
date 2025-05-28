"use client";

import { loginSchema } from "@/components/user/login";
import SignUpForm from "@/components/user/sign-up";
import { z } from "zod";

function handleSignUp(values: z.infer<typeof loginSchema>) {
  console.log("criar conta");
  console.log(values);
  try {
    // criarProjeto(values);
  } catch (error) {
    alert("Erro ao criar conta");
    console.error(error);
  }
}

export default function SignUp() {
  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Criar conta</h1>
        <p className="text-[#94a3b8] mb-8">
          Informe seus dados para poder cadastrar seus projetos!
        </p>

        <SignUpForm onSubmit={handleSignUp} />
      </div>
    </main>
  );
}
