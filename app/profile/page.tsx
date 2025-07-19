"use client";

import { useRef, useState } from "react";
import { GithubIcon, Linkedin, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import raquel from "../../public/dev_profile/raquel.jpeg";
import {
  deleteProfilePictureAction,
  getToken,
  uploadProfilePictureAction,
} from "@/lib/api/sign-up";
import api from "@/lib/api/axios";

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
  token: string; // Added token prop
}

const devs = [
  {
    name: "Raquel de Sá",
    image: raquel,
    linkedin: "https://www.linkedin.com/in/raquel-de-sa-silva/",
    github: "https://github.com/raqueldesa",
    cargo: "Desenvolvedora Frontend",
  },
];

export default function UserProfile({
  profile,
  profile_picture,
  token,
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

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file);

    const formData = new FormData();
    formData.append("image", file);

    const token = await getToken(); // Substitua pelo seu token real

    try {
      const response = await api.post("/users/profile-picture", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response) {
        throw new Error("Falha no upload da imagem.");
      }

      console.log("Upload bem-sucedido!");
    } catch (error) {
      console.error("Erro no upload:", error);
      alert(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir a foto de perfil?")) return;

    const formData = new FormData();
    if (id) formData.append("user_id", id.toString());
    formData.append("profile_picture_id", profile_picture_id);

    try {
      await deleteProfilePictureAction(formData);
      alert("Foto de perfil excluída com sucesso!");
    } catch (error) {
      console.error("Failed to delete profile picture:", error);
      alert("Erro ao excluir a foto de perfil.");
    }
  };

  return (
    <div className="gap-4 mt-10 max-w-md flex items-center justify-center rounded-lg p-8 mb-4 bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01]">
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
        <div className="flex gap-2 mt-2">
          <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md flex items-center gap-1">
            <Upload size={16} />
            Upload
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
          </label>
          {profile_picture && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-1 bg-[#ff4d4f] text-white rounded-md hover:bg-[#d9363e] transition-colors"
              title="Excluir foto"
            >
              <Trash2 size={16} />
              <span>Excluir</span>
            </button>
          )}
        </div>
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
      </div>
    </div>
  );
}
