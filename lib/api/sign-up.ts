import { signUpSchema } from "@/components/user/sign-up";
import api from "./axios";
import { z } from "zod";
import { defaultAvatar, generateSlug } from "../utils";
import { cookies } from "next/headers";

export async function signUp(data: z.infer<typeof signUpSchema>) {
  const newData = {
    ...data,
    slug: generateSlug(data.full_name),
    role_project: undefined,
    url_linkedin: undefined,
    url_github: undefined,
  };
  // console.log(newData);
  const res = await api.post("/users", newData);
  console.log("response:", res.data);
  return res.data;
}

export async function listarUsuarios() {
  const res = await api.get("/users?pageNumber=1&pageSize=100");
  // console.log("response:", res.data.data.items);
  return res.data.data.items;
}

// Utility to validate image MIME types
const isImageMimeType = (mimeType: string | undefined): boolean => {
  return !!mimeType && /^image\/(png|jpeg|gif|webp)$/.test(mimeType);
};

export async function getProfile(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      // console.warn("No token found in cookies");
      return null; // Or return a default placeholder: "data:image/png;base64,..."
    }

    // Make the API request without assuming responseType initially
    const res = await api.get("/users/profile-picture", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer", // Still expect binary data for images
    });

    // Check the content-type header
    const contentType = res.headers["content-type"];

    // Handle JSON error response
    if (contentType?.includes("application/json")) {
      // Convert ArrayBuffer to string to parse JSON
      const text = Buffer.from(res.data).toString("utf-8");
      const json = JSON.parse(text);

      if (!json.success && json.code === "file_not_found") {
        // console.warn("Profile picture not found:", json.message);
        return null; // Or return a placeholder image
      }
      // Handle other JSON responses if needed
      // console.error("Unexpected JSON response:", json);
      return null;
    }

    // Handle image response
    if (!isImageMimeType(contentType)) {
      // console.error(`Invalid or missing content-type: ${contentType}`);
      return null;
    }

    // Convert image data to base64
    const base64 = Buffer.from(res.data).toString("base64");
    return `data:${contentType};base64,${base64}`;
  } catch (error: any) {
    // Handle network errors, parsing errors, or API client errors
    // console.error("Failed to fetch profile picture:", error.message);
    return defaultAvatar; // Or throw new Error("Failed to fetch profile picture") if preferred
  }
}
