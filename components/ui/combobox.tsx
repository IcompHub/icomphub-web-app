"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

type Option = {
  value: string;
  label: string;
};

interface MultiComboboxProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiCombobox({
  options,
  value,
  onChange,
  placeholder = "Selecione opções...",
  className,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    if (value.includes(currentValue)) {
      onChange(value.filter((v) => v !== currentValue));
    } else {
      onChange([...value, currentValue]);
    }
  };

  const handleRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const selectedLabels = value
    .map((val) => options.find((opt) => opt.value === val)?.label)
    .filter(Boolean);

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
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer text-[#f1f6fb] "
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value.includes(option.value)
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

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 p-2  bg-[#0f172a] border border-[#1a222f] rounded-md">
          {value.map((val) => {
            const label = options.find((opt) => opt.value === val)?.label;

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
    </div>
  );
}
