"use client";

import React, { useContext } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { UserContext } from "@/contexts/useContext";
import {
  LayoutDashboard,
  LayoutTemplate,
  Plus,
  LogOut,
  Moon,
  Sun,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearUser } = useContext(UserContext);
  const { isMobile, setOpenMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    clearUser();
    router.push("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const primaryNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      badge: "Overview",
    },
    {
      title: "Templates",
      url: "/resume-templates",
      icon: LayoutTemplate,
      badge: "4 Ready",
    },
  ];

  return (
    <Sidebar className="border-r border-border/60 bg-sidebar/95 backdrop-blur-xl">
      {/* Sidebar Header with Brand and Close Button */}
      <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group"
            onClick={() => isMobile && setOpenMobile(false)}
          >
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Image
                src="/rb-logo.png"
                alt="ResumeForge Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-foreground group-hover:text-cyan-400 transition-colors">
                Resume<span className="brand-gradient-text">Forge</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                AI & ATS Studio
              </span>
            </div>
          </Link>

          {/* Mobile Drawer Close Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
              onClick={() => setOpenMobile(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Quick Action: New Resume */}
        <div className="mt-4">
          <Button
            asChild
            size="sm"
            className="w-full brand-gradient-btn rounded-xl text-xs font-semibold shadow-md shadow-cyan-500/20"
          >
            <Link
              href="/resume-templates"
              onClick={() => isMobile && setOpenMobile(false)}
              className="flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Resume</span>
            </Link>
          </Button>
        </div>
      </SidebarHeader>

      {/* Sidebar Main Content */}
      <SidebarContent className="px-2 py-4 space-y-6">
        {/* Workspace Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu className="space-y-1">
              {primaryNavItems.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200",
                        isActive
                          ? "bg-cyan-500/15 text-cyan-400 font-bold shadow-sm shadow-cyan-500/10 border border-cyan-500/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Link
                        href={item.url}
                        onClick={() => isMobile && setOpenMobile(false)}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={cn("w-4 h-4", isActive ? "text-cyan-400" : "text-muted-foreground")} />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={cn(
                              "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                              isActive
                                ? "bg-cyan-400/20 text-cyan-300"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with User Profile & Controls */}
      <SidebarFooter className="p-3 border-t border-border/40 bg-card/60">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-muted/50 transition-colors text-left group">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Avatar className="w-8 h-8 border border-cyan-500/30 shrink-0 shadow-sm">
                    <AvatarImage
                      src={user?.profileImageUrl || ""}
                      alt={user?.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-cyan-500/20 text-cyan-300 font-bold text-xs">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
                    <span className="text-xs font-bold text-foreground truncate">
                      {user?.name || "Member"}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate">
                      {user?.email || "Account"}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              side="top"
              className="w-56 p-2 rounded-xl border border-border/80 bg-card/95 backdrop-blur-md shadow-2xl space-y-1"
            >
              <DropdownMenuLabel className="p-2">
                <p className="text-xs font-bold text-foreground">
                  {user?.name || "Member"}
                </p>
                <p className="text-[11px] text-muted-foreground truncate font-normal">
                  {user?.email}
                </p>
                {user?.provider === "google" && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mt-1">
                    <ShieldCheck className="w-3 h-3" /> Google Verified
                  </span>
                )}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Theme Toggle */}
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="cursor-pointer flex items-center justify-between text-xs py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-400" />
                  )}
                  <span>Toggle Theme</span>
                </div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-xs py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full text-xs rounded-xl border-border/80 hover:bg-muted/50"
          >
            <Link href="/sign-in" onClick={() => isMobile && setOpenMobile(false)}>
              Sign In
            </Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
