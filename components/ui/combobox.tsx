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

// Tipos genéricos
type Technology = {
  id?: number;
  slug: string;
  name: string;
  has_image?: boolean;
};

type User = {
  id?: number;
  user_id: number;
  nickname: string;
  status?: string;
  role?: string;
  role_ids?: number[];
};

type OptionType = "user" | "technology";

interface MultiComboboxProps {
  options: (User | Technology)[];
  name: string;
  type: OptionType;
  defaultValue?: (User | Technology)[];
  placeholder?: string;
  className?: string;
}

export default function MultiCombobox({
  options,
  name,
  type,
  defaultValue = [],
  placeholder = "Selecione opções...",
  className,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] =
    React.useState<(User | Technology)[]>(defaultValue);

  const getIdentifier = (item: User | Technology) =>
    type === "technology"
      ? (item as Technology).slug
      : String((item as User).user_id);

  const getLabel = (item: User | Technology) =>
    type === "technology" ? (item as Technology).name : (item as User).nickname;

  const isSelected = (item: User | Technology) =>
    selectedValues.some((v) => getIdentifier(v) === getIdentifier(item));

  const handleSelect = (identifier: string) => {
    const found = options.find((opt) => getIdentifier(opt) === identifier);
    if (!found) return;

    if (isSelected(found)) {
      setSelectedValues((prev) =>
        prev.filter((v) => getIdentifier(v) !== identifier)
      );
    } else {
      setSelectedValues((prev) => [...prev, found]);
    }
  };

  const handleRemove = (identifier: string) => {
    setSelectedValues((prev) =>
      prev.filter((v) => getIdentifier(v) !== identifier)
    );
  };

  // if (type === "user") console.log(options);

  // Serialize selected values to JSON
  const serializedValue = JSON.stringify(
    selectedValues.map((val) => ({
      ...(type === "user"
        ? {
            user_id: (val as User).user_id,
            nickname: (val as User).nickname,
            role: (val as User).role || "",
            role_ids: (val as User).role_ids || [],
          }
        : {
            id: (val as Technology).id,
            name: (val as Technology).name,
            slug: (val as Technology).slug,
          }),
    }))
  );
  // console.log(selectedValues);
  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-4 py-3 bg-[#0f172a] border border-[#1a222f] text-[#64748b] placeholder:text-[#64748b] hover:bg-[#1a2538] hover:text-[#f1f6fb]"
          >
            {placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-[#64748b]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-[#0f172a] text-[#f1f6fb] border border-[#1a222f]">
          <Command>
            <CommandInput
              placeholder="Buscar..."
              className="placeholder:text-[#64748b]"
            />
            <CommandList>
              <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
              <CommandGroup>
                {options.map((option, i) => (
                  <CommandItem
                    key={i}
                    onSelect={() => handleSelect(getIdentifier(option))}
                    className="cursor-pointer text-[#f1f6fb]"
                  >
                    {getLabel(option)}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected(option) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 p-2 bg-[#0f172a] border border-[#1a222f] rounded-md">
          {selectedValues.map((val, i) => (
            <Badge
              key={i}
              className="flex items-center gap-1 bg-[#1e293b] text-[#f1f6fb] border"
            >
              {getLabel(val)}
              <button
                type="button"
                onClick={() => handleRemove(getIdentifier(val))}
                className="text-[#94a3b8] hover:text-white"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <input type="hidden" name={name} value={serializedValue} />
    </div>
  );
}
