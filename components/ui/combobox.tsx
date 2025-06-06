"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

type Option = {
  name: string;
  slug: string;
};

// 1. As props foram atualizadas:
// - `value` e `onChange` foram removidos.
// - `name` foi adicionado e é obrigatório.
// - `defaultValue` foi adicionado para popular o estado inicial (útil em formulários de edição).
interface MultiComboboxProps {
  options: Option[];
  name: string; // Essencial para o FormData
  defaultValue?: string[];
  placeholder?: string;
  className?: string;
}

export default function MultiCombobox({
  options,
  name,
  defaultValue = [],
  placeholder = "Selecione opções...",
  className,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // 2. O componente agora gerencia seu próprio estado para os valores selecionados.
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue);

  const handleSelect = (currentValue: string) => {
    // A lógica agora atualiza o estado interno, em vez de chamar um `onChange` externo.
    if (selectedValues.includes(currentValue)) {
      setSelectedValues(selectedValues.filter((v) => v !== currentValue));
    } else {
      setSelectedValues([...selectedValues, currentValue]);
    }
  };

  const handleRemove = (val: string) => {
    setSelectedValues(selectedValues.filter((v) => v !== val));
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-4 py-3 bg-[#0f172a] border border-[#1a222f] text-[#64748b] placeholder:text-[#64748b] hover:bg-[#1a2538]  hover:text-[#f1f6fb]"
          >
            {placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-[#64748b]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-[#0f172a] text-[#f1f6fb] border border-[#1a222f]">
          <Command>
            <CommandInput
              placeholder="Buscar..."
              className=" placeholder:text-[#64748b]"
            />
            <CommandList>
              <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.slug}
                    onSelect={() => handleSelect(option.slug)}
                    className="cursor-pointer text-[#f1f6fb] "
                  >
                    {option.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        // Usa o estado interno `selectedValues` para verificar a seleção.
                        selectedValues.includes(option.slug)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Exibição das badges, usando o estado interno `selectedValues` */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 p-2 bg-[#0f172a] border border-[#1a222f] rounded-md">
          {selectedValues.map((val) => {
            const label = options.find((opt) => opt.slug === val)?.name;
            return (
              <Badge
                key={val}
                className="flex items-center gap-1 bg-[#1e293b] text-[#f1f6fb] border "
              >
                {label}
                <button
                  type="button"
                  onClick={() => handleRemove(val)}
                  className="text-[#94a3b8] hover:text-white"
                >
                  <X size={12} />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* 3. A MÁGICA ACONTECE AQUI:
          Renderizamos inputs escondidos para cada valor selecionado.
          O `FormData` do formulário pai irá coletar os dados desses inputs.
      */}
      <div className="hidden">
        {selectedValues.map((val) => (
          <input key={val} type="hidden" name={name} value={val} />
        ))}
      </div>
    </div>
  );
}
