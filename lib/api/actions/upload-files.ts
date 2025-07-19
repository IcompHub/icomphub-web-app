import api from "../axios";
import { getToken } from "../sign-up";

export async function uploadProfilePic(formData: FormData) {
  try {
    const token = await getToken();
    console.log("uploadProfilePic");
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
