import { Logo } from "@/components/general/logo";
import "./globals.css";
import { Pickaxe } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-xl text-white bg-black/[0.96]">
      <div className="flex flex-col items-center justify-center text-center gap-1">
        <Logo w={80} h={80} />
        Estamos trabalhando nisso! <Pickaxe />
      </div>
    </div>
  );
}
