"use client";

import SignUpForm from "@/components/user/sign-up";



export default function SignUp() {
  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Criar conta</h1>
        <p className="text-[#94a3b8] mb-8">
          Informe seus dados para poder cadastrar seus projetos!
        </p>

        <SignUpForm  />
      </div>
    </main>
  );
}
