import { Logo } from "../general/logo";

export function Footer() {
  return (
    <div className="text-center space-y-1 mt-8">
      <div className="flex justify-center items-center mb-2">
        <Logo w={20} h={20} />

        <span className="font-medium ml-2">IcompHub</span>
      </div>
      <div className="text-[#64748b] text-sm">
        Keren Guimarães • Luis Santos • Nelson Carvalho
      </div>
      <div className="text-[#64748b] text-sm">Raquel de Sá • Sarah Júlia</div>
      <div className="text-[#64748b] text-sm mt-1">2025</div>
    </div>
  );
}
