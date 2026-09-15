"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon, X, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface DatePickerProps {
  value?: string | Date | null;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  mode?: "date" | "month-year";
  allowPresent?: boolean;
  disabled?: boolean;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Inner Month Combobox
function MonthCombobox({
  value,
  onChange,
}: {
  value: number;
  onChange: (monthIdx: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 px-2.5 text-xs font-medium rounded-xl border-border/70 bg-background text-foreground hover:bg-muted/40 flex items-center justify-between gap-1 shadow-none"
        >
          <span className="truncate">{MONTH_NAMES[value] || "Month"}</span>
          <ChevronsUpDown className="h-3 w-3 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[150px] p-1 rounded-xl shadow-xl border border-border/80 bg-popover z-[60]"
        align="start"
      >
        <Command>
          <CommandList className="max-h-48 overflow-y-auto custom-scrollbar">
            <CommandGroup>
              {MONTH_NAMES.map((monthName, idx) => (
                <CommandItem
                  key={monthName}
                  value={monthName}
                  onSelect={() => {
                    onChange(idx);
                    setOpen(false);
                  }}
                  className="text-xs flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-muted"
                >
                  <span>{monthName}</span>
                  <Check
                    className={cn(
                      "h-3.5 w-3.5 text-cyan-400 shrink-0",
                      value === idx ? "opacity-100" : "opacity-0"
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

// Inner Year Combobox with Search
function YearCombobox({
  value,
  years,
  onChange,
}: {
  value: number;
  years: number[];
  onChange: (year: number) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredYears = React.useMemo(() => {
    if (!search.trim()) return years;
    return years.filter((y) => y.toString().includes(search.trim()));
  }, [years, search]);

  const handleSelectYear = (y: number) => {
    onChange(y);
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 px-2.5 text-xs font-medium rounded-xl border-border/70 bg-background text-foreground hover:bg-muted/40 flex items-center justify-between gap-1 shadow-none min-w-[76px]"
        >
          <span>{value}</span>
          <ChevronsUpDown className="h-3 w-3 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[120px] p-1 rounded-xl shadow-xl border border-border/80 bg-popover z-[60]"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Year..."
            value={search}
            onValueChange={setSearch}
            className="text-xs h-7"
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                const parsed = parseInt(search.trim());
                if (!isNaN(parsed) && parsed >= 1900 && parsed <= 2100) {
                  e.preventDefault();
                  handleSelectYear(parsed);
                }
              }
            }}
          />
          <CommandList className="max-h-48 overflow-y-auto custom-scrollbar">
            <CommandEmpty className="p-2 text-center text-[10px] text-muted-foreground">
              {search.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseInt(search.trim());
                    if (!isNaN(parsed)) handleSelectYear(parsed);
                  }}
                  className="w-full text-cyan-400 text-xs font-medium hover:underline"
                >
                  Use {search}
                </button>
              ) : (
                "No year found"
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredYears.map((y) => (
                <CommandItem
                  key={y}
                  value={y.toString()}
                  onSelect={() => handleSelectYear(y)}
                  className="text-xs flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-muted"
                >
                  <span>{y}</span>
                  <Check
                    className={cn(
                      "h-3.5 w-3.5 text-cyan-400 shrink-0",
                      value === y ? "opacity-100" : "opacity-0"
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

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  mode = "date",
  allowPresent = false,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Parse string or Date to a safe Date object
  const parsedDate = React.useMemo(() => {
    if (!value) return null;
    if (typeof value === "string") {
      if (value.toLowerCase() === "present") return null;
      const d = new Date(value);
      if (isValid(d)) return d;
      try {
        const parsed = parse(value, "MMM yyyy", new Date());
        if (isValid(parsed)) return parsed;
      } catch (e) {}
      return null;
    }
    if (value instanceof Date && isValid(value)) return value;
    return null;
  }, [value]);

  const isPresent =
    typeof value === "string" && value.toLowerCase() === "present";

  // Selected year and month state for quick dropdown navigation
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState<number>(
    parsedDate ? parsedDate.getFullYear() : currentYear
  );
  const [selectedMonth, setSelectedMonth] = React.useState<number>(
    parsedDate ? parsedDate.getMonth() : new Date().getMonth()
  );

  React.useEffect(() => {
    if (parsedDate) {
      setSelectedYear(parsedDate.getFullYear());
      setSelectedMonth(parsedDate.getMonth());
    }
  }, [parsedDate]);

  // Selectable years (e.g. 1950 to currentYear + 5)
  const years = React.useMemo(() => {
    const list: number[] = [];
    for (let y = currentYear + 5; y >= 1950; y--) {
      list.push(y);
    }
    return list;
  }, [currentYear]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    if (mode === "month-year") {
      onChange(format(date, "MMM yyyy"));
    } else {
      onChange(format(date, "yyyy-MM-dd"));
    }
    setOpen(false);
  };

  const handleMonthYearSelect = (year: number, monthIdx: number) => {
    setSelectedYear(year);
    setSelectedMonth(monthIdx);
    const d = new Date(year, monthIdx, 1);
    if (mode === "month-year") {
      onChange(format(d, "MMM yyyy"));
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const handleSetPresent = () => {
    onChange("Present");
    setOpen(false);
  };

  // Formatted display label
  const displayLabel = React.useMemo(() => {
    if (isPresent) return "Present";
    if (parsedDate) {
      return mode === "month-year"
        ? format(parsedDate, "MMM yyyy")
        : format(parsedDate, "MMM d, yyyy");
    }
    if (typeof value === "string" && value) return value;
    return null;
  }, [isPresent, parsedDate, value, mode]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full h-10 justify-between text-xs font-normal rounded-xl border-border/80 bg-background text-foreground hover:bg-muted/40 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none px-3",
            !displayLabel && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate whitespace-nowrap">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
            <span className="truncate whitespace-nowrap font-medium">
              {displayLabel || placeholder}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {Boolean(value) && (
              <span
                onClick={handleClear}
                role="button"
                tabIndex={0}
                className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Clear date"
              >
                <X className="h-3 w-3" />
              </span>
            )}
            <ChevronsUpDown className="h-3 w-3 opacity-40 shrink-0 ml-1" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-3 rounded-2xl shadow-xl border border-border/80 bg-card text-foreground"
        align="start"
      >
        <div className="space-y-3">
          {/* Combobox-styled Month & Year Selectors */}
          <div className="flex items-center gap-2 pb-2.5 border-b border-border/60">
            <MonthCombobox
              value={selectedMonth}
              onChange={(mIdx) => handleMonthYearSelect(selectedYear, mIdx)}
            />

            <YearCombobox
              value={selectedYear}
              years={years}
              onChange={(y) => handleMonthYearSelect(y, selectedMonth)}
            />

            {allowPresent && (
              <Button
                type="button"
                variant={isPresent ? "default" : "outline"}
                size="sm"
                onClick={handleSetPresent}
                className="h-8 px-2.5 text-[11px] rounded-xl ml-auto font-medium"
              >
                Present
              </Button>
            )}
          </div>

          {/* Month-Year Grid Mode */}
          {mode === "month-year" ? (
            <div className="grid grid-cols-3 gap-1.5 pt-1 w-[260px]">
              {SHORT_MONTHS.map((m, idx) => {
                const isCurrent =
                  parsedDate &&
                  parsedDate.getFullYear() === selectedYear &&
                  parsedDate.getMonth() === idx;
                return (
                  <Button
                    key={m}
                    type="button"
                    variant={isCurrent ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleMonthYearSelect(selectedYear, idx)}
                    className={cn(
                      "h-8 text-xs font-medium rounded-xl",
                      isCurrent
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                        : "hover:bg-muted/60"
                    )}
                  >
                    {m}
                  </Button>
                );
              })}
            </div>
          ) : (
            /* Day Calendar Mode */
            <Calendar
              mode="single"
              selected={parsedDate || undefined}
              month={new Date(selectedYear, selectedMonth)}
              onMonthChange={(m) => {
                setSelectedYear(m.getFullYear());
                setSelectedMonth(m.getMonth());
              }}
              onSelect={handleDateSelect}
              initialFocus
              className="p-0"
            />
          )}

          {/* Footer preset buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
            <button
              type="button"
              onClick={() => handleDateSelect(new Date())}
              className="text-[11px] text-cyan-400 hover:underline font-medium"
            >
              Today
            </button>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-[11px] text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
