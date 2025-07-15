"use client";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/api/login";
import Link from "next/link";

export default function Logout() {
  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f6fb] flex items-center justify-center">
      <main className="p-6">
        <div className="max-w-md  bg-[#0e1116] rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Tem certeza?</h1>
          <p className="text-[#94a3b8]">
            Para ter acesso aos recursos a mais deverá fazer login novamente
          </p>
          <div className="flex justify-around">
            <Link
              href={"/project"}
              className="w-2/5 p-1 mt-4 bg-[#080D17] text-white px-8 border border-[#1A222F]  font-medium rounded-md hover:bg-[#f1f5f9] hover:text-[#0f172a]  transition-colors "
            >
              <Button className="cursor-pointer" variant="ghost">
                Cancelar
              </Button>
            </Link>
            <Button
              onClick={logoutAction}
              className="w-2/5 py-6 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#cdd3d9] transition-colors cursor-pointer"
            >
              Sim
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
