import { getProfile, listarUsuario } from "@/lib/api/sign-up";
import UserProfile from "./page";

export default async function LayoutProject({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f6fb] pt-20">
      {children}
    </div>
  );
}
