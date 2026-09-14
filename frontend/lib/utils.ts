import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSafeDate(d: any, formatStr = "MMM yyyy"): string {
  if (!d) return "";
  if (typeof d === "string") {
    // If it's already human formatted like "Jan 2021" or "Present"
    if (d.toLowerCase() === "present") return "Present";
    const parsed = new Date(d);
    if (!isNaN(parsed.getTime())) {
      try {
        return format(parsed, formatStr);
      } catch (e) {
        return d;
      }
    }
    return d;
  }
  if (d instanceof Date && !isNaN(d.getTime())) {
    try {
      return format(d, formatStr);
    } catch (e) {
      return "";
    }
  }
  return "";
}
