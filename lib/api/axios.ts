// lib/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8016/", // exemplo: "https://sua-api.com"
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

export default api;
