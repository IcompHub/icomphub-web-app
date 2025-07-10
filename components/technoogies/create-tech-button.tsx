import Link from "next/link";
import { Button } from "../ui/button";
import { FolderGit2 } from "lucide-react";

export function CreateTechnologyButton() {
  return (
    <div className="md:flex items-center space-x-4">
      <Link href={`/technologies/create`} className="h-fit">
        <Button
          variant="ghost"
          className="bg-[#080D17] hover:[#1A222F] text-white px-8 cursor-pointer border border-[#1A222F]"
        >
          <FolderGit2 className="mr-2 h-5 w-5" />
          Nova Tecnologia
        </Button>
      </Link>
    </div>
  );
}
