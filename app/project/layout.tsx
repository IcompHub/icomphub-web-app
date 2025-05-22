import Navbar from "@/components/general/navbar";

export default function LayoutProject({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f6fb] pt-20">
      {/* <header className="flex items-center justify-between p-4 border-b border-[#1a2332]">
        <div className="flex items-center gap-2">
          <Logo w={30} h={30} />

          <span className="text-xl font-bold ml-1">IcompHub</span>
        </div>
        <button className="text-[#f1f6fb]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </header> */}
      <Navbar />

      {children}
    </div>
  );
}
