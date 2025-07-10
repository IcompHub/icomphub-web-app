// sign-up-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useTransition } from "react";
import { techAction } from "@/lib/api/actions/create-technology.actions";
import { editTechAction } from "@/lib/api/actions/edit-technology.actions";

export const techSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
});
type FormData = z.infer<typeof techSchema>;

interface TechFormProps {
  initialData?: Partial<FormData>;
  submitText?: string;
}
export type TechFormState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export default function TechnologyForm({
  initialData,
  submitText = "Cadastrar",
}: TechFormProps) {
  // const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(techSchema),
    defaultValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
    },
  });

  async function onSubmit(data: FormData) {
    // startTransition(async () => {
    console.log("ppqpqpqpqp")
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (submitText === "Cadastrar") {
      const result = await techAction({}, formData);
      if (result.errors) {
        console.log(result.errors);
      }
    } else if (submitText === "Salvar alterações") {
      const result = await editTechAction({}, formData);
      if (result.errors) {
        console.log(result.errors);
      }
    }
    // });
  }
  const mappedInitialData = initialData
    ? {
        id: initialData.id?.toString() ?? "",
        name: initialData.name ?? "",
      }
    : {
        id: "",
        name: "",
      };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {form.formState.errors.root && (
          <div className="text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          defaultValue={mappedInitialData.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#f1f6fb] font-medium">Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da tecnologia" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-6 mt-4 bg-[#f1f5f9] text-[#0f172a] font-medium rounded-md hover:bg-[#e3e7eb] transition-colors cursor-pointer"
          // disabled={isPending}
        >
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
