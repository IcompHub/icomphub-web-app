"use client";

import { useActionState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { techAction } from "@/lib/api/actions/create-technology.actions";
import { editTechAction } from "@/lib/api/actions/edit-technology.actions";

export const techSchema = z.object({
  id: z.coerce.number().optional(), // ✅ agora aceita "5" e transforma em 5
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
});

export type TechFormState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

type FormData = z.infer<typeof techSchema>;

interface TechFormProps {
  initialData?: Partial<FormData>;
  submitText?: string;
}

export default function TechnologyForm({
  initialData,
  submitText = "Cadastrar",
}: TechFormProps) {
  const initialState: TechFormState = { message: null, errors: {} };

  const [createState, createAction] = useActionState(techAction, initialState);
  const [editState, editAction] = useActionState(editTechAction, initialState);

  const state = submitText === "Cadastrar" ? createState : editState;
  const action = submitText === "Cadastrar" ? createAction : editAction;

  const mappedInitialData = initialData
    ? {
        id: initialData.id ?? "",
        name: initialData.name ?? "",
      }
    : {
        id: "",
        name: "",
      };

  return (
    <form action={action} className="space-y-6">
      {mappedInitialData.id !== "" && (
        <input type="hidden" name="id" value={String(mappedInitialData.id)} />
      )}

      <div>
        <label className="text-[#f1f6fb] font-medium block mb-2">Nome</label>
        <Input
          name="name"
          placeholder="Digite o nome da tecnologia"
          defaultValue={mappedInitialData.name}
        />
        {state.errors?.name && (
          <div className="text-red-500 mt-1">
            {state.errors.name.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-6 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#e3e7eb] transition-colors cursor-pointer"
      >
        {submitText}
      </Button>
    </form>
  );
}
