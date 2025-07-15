"use client";

import ProjectForm from "../ui/project-form";

export default function EditProject({ project, technologies, users }: any) {
  return (
    <ProjectForm
      initialData={project}
      submitText="Salvar alterações"
      technologies={technologies}
      users={users}
    />
  );
}
