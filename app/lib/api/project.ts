// lib/api/projects.ts
import api from "./axios";

export async function criarProjeto(data: any) {
  const res = await api.post("/projects", data);
  return res.data;
}

export async function atualizarProjeto(id: string | number, data: any) {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
}

export async function listarProjetos() {
  const res = await api.get("/projects");
  return res.data;
}

export async function buscarProjetoPorId(id: string | number) {
  const res = await api.get(`/projects/${id}`);
  return res.data;
}
