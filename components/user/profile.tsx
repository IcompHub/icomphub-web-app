"use client";

import { useRef, useState } from "react";
import { Trash, Upload } from "lucide-react";

import { deletePhoto, uploadPhoto } from "@/lib/api/actions/upload-files";
import { Button } from "@/components/ui/button";

interface UserInfo {
  id?: number;
  nickname: string;
  personal_email: string;
  profile_picture_id: string;
  profile_picture: string | null;
  role: string;
}

interface ProfileProps {
  profile: UserInfo;
  profile_picture: string | null;
}

export default function UserProfile({
  profile,
  profile_picture,
}: ProfileProps) {
  return (
    <main className="p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Perfil</h1>

        <div className="lg:gap-8 md:gap-6 lg:flex md:grid lg:flex-wrap md:grid-cols-2">
          <UserCard
            id={profile.id}
            nickname={profile.nickname}
            personal_email={profile.personal_email}
            profile_picture_id={profile.profile_picture_id}
            profile_picture={profile_picture}
            role={profile.role}
          />
        </div>
      </div>
    </main>
  );
}

function UserCard({
  id,
  nickname,
  personal_email,
  profile_picture_id,
  profile_picture,
  role,
}: UserInfo) {
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
      const res = await uploadPhoto(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir a foto de perfil?")) return;

    try {
      await deletePhoto();
    } catch (error) {
      console.error("Failed to delete profile picture:", error);
      alert("Erro ao excluir a foto de perfil.");
    }
  };

  return (
    <div className="gap-8 mt-10 max-w-md flex items-center justify-center rounded-lg p-8 mb-4 bg-[#080d17] border border-[#19212f] ">
      <div className="flex flex-col items-center">
        {profile_picture ? (
          <img
            src={profile_picture}
            alt="Foto de perfil"
            className="rounded-full w-40 border border-[#1A222F] cursor-pointer"
          />
        ) : (
          <div className="rounded-full w-40 h-40 bg-[#1A222F] flex items-center justify-center text-[#64748b]">
            Sem foto
          </div>
        )}

        {/* <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        /> */}
      </div>
      <div>
        <p className="w-fit text-lg font-semibold">{nickname}</p>
        <p className="w-fit text-sm">{role}</p>
        <p className="w-fit text-sm">{personal_email}</p>
        <div className="flex gap-2 mt-2">
          <Button
            className=" py-2 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#c5cbd1] transition-colors cursor-pointer"
            onClick={handleUploadClick}
          >
            <Upload size={16} />
            Upload
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
          </Button>
          {profile_picture && (
            <Button
              variant="ghost"
              className="bg-[#080D17] hover:[#1A222F] text-white cursor-pointer border border-[#1A222F] mt-4"
              onClick={handleDelete}
            >
              <Trash size={16} />
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
