"use client";

import * as React from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface MultiSelectProps {
  placeholder?: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function MultiSelect({
  placeholder = "Select options",
  options,
  value,
  onChange,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Filter options based on search value
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) &&
      !value.includes(option.value)
  );

  // Handle selection of an option
  const handleSelect = (optionValue: string) => {
    const option = options.find((opt) => opt.value === optionValue);
    if (option && !value.includes(optionValue)) {
      onChange([...value, optionValue]);
      setSearchValue("");
      inputRef.current?.focus();
    }
  };

  // Handle removal of a selected option
  const handleRemove = (optionValue: string) => {
    onChange(value.filter((val) => val !== optionValue));
  };

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div
        className={cn(
          "flex items-center w-full px-4 py-3 bg-[#0f172a] border border-[#1a222f] rounded-md text-[#f1f6fb]",
          isOpen && "border-[#3b4d71]"
        )}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent outline-none placeholder:text-[#64748b] text-[#f1f6fb]"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="ml-2 text-[#64748b]"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 p-4 bg-[#0f172a] border border-[#1a222f] rounded-md">
          {value.map((val) => {
            const option = options.find((opt) => opt.value === val);
            return (
              <div
                key={val}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#1e293b] text-[#f1f6fb]"
              >
                <span>{option?.label}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(val);
                  }}
                  className="ml-1 text-[#94a3b8] hover:text-[#f1f6fb] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-[#0f172a] border border-[#1a222f] rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-[#1e293b] text-[#f1f6fb]"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
