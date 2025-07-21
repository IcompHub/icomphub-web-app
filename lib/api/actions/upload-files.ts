"use server";

import { redirect } from "next/navigation";
import api from "../axios";
import { getToken } from "../sign-up";
import { revalidatePath } from "next/cache";

export async function uploadProfilePic(formData: FormData) {
  try {
    const token = await getToken();

    const res = await api.post("/users/profile-picture", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res) throw new Error("Erro ao fazer upload");
  } catch (error) {
    console.error("Erro no upload:", error);
  }
}

export async function uploadPhoto(formData: FormData) {
  const token = await getToken();

  try {
    const response = await api.post("/users/profile-picture", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": undefined, // ❌ remove o forçado
      },
    });

    revalidatePath("/profile");

    redirect("/profile");

    return response.data;
  } catch (error: any) {
    // console.error("Erro no upload:", error?.response || error);
  }
}
export async function uploadThumbnail(id: number, formData: FormData) {
  const token = await getToken();

  try {
    const response = await api.post(`/projects/thumbnail/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": undefined, // ❌ remove o forçado
      },
    });

    revalidatePath("/profile");

    redirect("/profile");

    return response.data;
  } catch (error: any) {
    // console.error("Erro no upload:", error?.response || error);
  }
}
export async function deletePhoto() {
  const token = await getToken();

  try {
    const response = await api.delete("/users/profile-picture", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": undefined, // ❌ remove o forçado
      },
    });

    revalidatePath("/profile");

    redirect("/profile");

    return response.data;
  } catch (error: any) {
    // console.error("Erro no upload:", error?.response || error);
  }
}

export async function uploadImgTech(id: number, formData: FormData) {
  const token = await getToken();
  try {
    const response = await api.put(`/technologies/image/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": undefined, // ❌ remove o forçado
      },
    });

    revalidatePath("/profile");

    return response.data;
  } catch (error: any) {
    console.error("Erro no upload:", error?.response || error);
  }
}
