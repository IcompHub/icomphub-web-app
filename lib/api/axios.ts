// lib/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // exemplo: "https://sua-api.com"
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
