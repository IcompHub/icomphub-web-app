"use client";
import { uploadThumbnail } from "@/lib/api/actions/upload-files";
import { ImageUp } from "lucide-react";
import { useRef } from "react";

export function UploadIcon({ id }: { id: number }) {
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
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />
      <ImageUp
        onClick={handleUploadClick}
        className="transition-colors cursor-pointer rounded border border-transparent hover:bg-white hover:border-[#1a222f] hover:text-[#1a222f] m-1"
      />
    </div>
  );
}
