"use client";

import { useActionState } from "react";
import LoginForm, { loginSchema } from "@/components/user/login";

import { z } from "zod";
import { loginAction } from "@/lib/api/actions/login-user";

export default function Login() {

  return (
    <main className="p-6">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Entrar</h1>
        <p className="text-[#94a3b8] mb-8">
          Seja bem-vind_ de volta ao IcompHub!
        </p>

        <LoginForm  />
        {/* {state.message && (
          <div className="text-red-500 mt-4">{state.message}</div>
        )} */}
      </div>
    </main>
  );
}