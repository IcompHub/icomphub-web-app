import Navbar from "@/components/general/navbar";

export default function LayoutTech({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f6fb] pt-20">
      <Navbar />
      {children}
    </div>
  );
}
