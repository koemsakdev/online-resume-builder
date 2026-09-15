"use client";

import React from "react";
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
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  LayoutTemplate,
  Plus,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

export const AppSidebar = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

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

      {/* Sidebar Footer */}
      <SidebarFooter className="p-3 border-t border-border/40 bg-card/40">
        <div className="flex items-center justify-between px-2 py-1 text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground/80">ResumeRise</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">
            v1.0
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
