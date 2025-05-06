import ProjectForm from "@/components/ui/project-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#010103] text-[#f1f6fb]">
      <header className="flex items-center justify-between p-4 border-b border-[#1a2332]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="IcompHub Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xl font-bold">IcompHub</span>
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
      </header>

      <main className="p-6">
        <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Cadastrar Projeto</h1>
          <p className="text-[#94a3b8] mb-8">
            Texto que a desginer ainda vai pensar melhor.
          </p>

          <ProjectForm />
        </div>
      </main>
    </div>
  );
}
