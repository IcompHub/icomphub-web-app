"use client";

import TechnologyForm from "./technologies-form";

export default function EditTechnology({ tecnologia }: any) {
  return (
    <TechnologyForm submitText="Salvar alterações" initialData={tecnologia} />
  );
}
