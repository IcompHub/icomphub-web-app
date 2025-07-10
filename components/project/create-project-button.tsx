import Link from "next/link";
import { Button } from "../ui/button";
import { FolderPlus } from "lucide-react";

export function CreateProjectButton() {
  return (
    <div className="md:flex items-center space-x-4">
      <Link href={`/project/create`} className="h-fit">
        <Button
          variant="ghost"
          className="bg-[#080D17] hover:[#1A222F] text-white px-8 cursor-pointer border border-[#1A222F]"
        >
          <FolderPlus className="mr-2 h-5 w-5" />
          Novo projeto
        </Button>
      </Link>
    </div>
  );
}
