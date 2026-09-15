"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

export interface ComboboxOption {
  label: string;
  value: string;
}

interface ComboboxProps {
  options: (string | ComboboxOption)[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  allowCustom?: boolean;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search or type...",
  emptyText = "No option found.",
  className,
  allowCustom = true,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const normalizedOptions: ComboboxOption[] = React.useMemo(() => {
    return options.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    );
  }, [options]);

  const selectedLabel = React.useMemo(() => {
    const found = normalizedOptions.find(
      (opt) => opt.value.toLowerCase() === (value || "").toLowerCase()
    );
    return found ? found.label : value;
  }, [normalizedOptions, value]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue === value ? "" : selectedValue);
    setOpen(false);
    setQuery("");
  };

  const handleCustomApply = () => {
    if (allowCustom && query.trim()) {
      onChange(query.trim());
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full h-10 justify-between text-xs font-normal rounded-xl border-border/80 bg-background text-foreground hover:bg-muted/40 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none px-3",
            !value && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate whitespace-nowrap text-left block flex-1 mr-2">
            {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-0 rounded-xl shadow-xl border border-border/80 bg-popover"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className="text-xs h-9"
            value={query}
            onValueChange={setQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter" && allowCustom && query.trim()) {
                e.preventDefault();
                handleCustomApply();
              }
            }}
          />
          <CommandList className="max-h-56 overflow-y-auto custom-scrollbar">
            <CommandEmpty className="p-2 text-center text-xs text-muted-foreground">
              {allowCustom && query.trim() ? (
                <button
                  type="button"
                  onClick={handleCustomApply}
                  className="w-full text-left p-1.5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-400 text-xs transition-colors font-medium text-foreground"
                >
                  Use &quot;<span className="font-semibold">{query}</span>&quot;
                </button>
              ) : (
                emptyText
              )}
            </CommandEmpty>
            <CommandGroup>
              {normalizedOptions.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => handleSelect(opt.value)}
                  className="text-xs flex items-center justify-between cursor-pointer py-2 px-2.5 rounded-lg hover:bg-muted"
                >
                  <span className="truncate whitespace-nowrap">{opt.label}</span>
                  <Check
                    className={cn(
                      "h-3.5 w-3.5 text-cyan-400 shrink-0",
                      value?.toLowerCase() === opt.value.toLowerCase()
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
  );
}

export default Combobox;

