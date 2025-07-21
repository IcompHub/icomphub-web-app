"use client";
import { uploadThumbnail } from "@/lib/api/actions/upload-files";
import { ImageUp, PenLine } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function UploadIcon({ id, slug }: { id: number; slug: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadThumbnail(id, formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/project/${slug}-${id}/edit`}>
              <PenLine className="transition-colors cursor-pointer rounded border border-transparent hover:bg-white hover:border-[#1a222f] hover:text-[#1a222f] m-1" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Editar projeto</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ImageUp
              onClick={handleUploadClick}
              className="transition-colors cursor-pointer rounded border border-transparent hover:bg-white hover:border-[#1a222f] hover:text-[#1a222f] m-1"
            />
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Upload de foto</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
