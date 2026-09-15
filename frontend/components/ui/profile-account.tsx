"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { LogOut, LayoutDashboard, Sparkles, ShieldCheck } from "lucide-react";
import { UserContext } from "@/contexts/useContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ProfileAccount() {
  const { user, clearUser } = useContext(UserContext);
  const [avatarFallback, setAvatarFallback] = useState("U");
  const router = useRouter();

  useEffect(() => {
    if (user?.name) {
      const nameParts = user.name.trim().split(" ");
      if (nameParts.length > 1 && nameParts[0] && nameParts[1]) {
        setAvatarFallback(`${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase());
      } else if (nameParts[0]) {
        setAvatarFallback(nameParts[0][0].toUpperCase());
      } else {
        setAvatarFallback("U");
      }
    } else if (user?.email) {
      setAvatarFallback(user.email[0].toUpperCase());
    } else {
      setAvatarFallback("U");
    }
  }, [user?.name, user?.email]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-transform active:scale-95"
          aria-label="User Account Menu"
        >
          <Avatar className="cursor-pointer size-9 border border-cyan-500/30 shadow-sm hover:border-cyan-500/60 transition-colors">
            <AvatarImage
              className="object-cover"
              src={user?.profileImageUrl || ""}
              alt={user?.name || "User Avatar"}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold text-xs">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60 p-2 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-xl shadow-slate-900/10 dark:shadow-cyan-950/30"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-2 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground truncate max-w-[170px]">
              {user?.name || "User Account"}
            </p>
            {user?.provider === "google" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Google
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-normal truncate">
            {user?.email || "No email available"}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem asChild className="cursor-pointer text-xs py-2 rounded-xl">
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-cyan-500" />
            <span>My Resumes</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer text-xs py-2 rounded-xl">
          <Link href="/resume-templates" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Create New Resume</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="cursor-pointer text-xs py-2 text-red-500 dark:text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-xl flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
