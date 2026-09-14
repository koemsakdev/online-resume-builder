"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { ProfileAccount } from "../ui/profile-account";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavbarLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const NavbarLayout = ({ children, title }: NavbarLayoutProps) => {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (title) return title;
    if (pathname === "/dashboard") return "My Resumes";
    if (pathname === "/resume-templates") return "Template Gallery";
    if (pathname.startsWith("/resume-templates/")) return "Resume Studio";
    return "Dashboard";
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Sticky Glassmorphism Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-xl px-4 sm:px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-9 w-9 rounded-xl border border-border/80 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-colors" />
          <Separator orientation="vertical" className="h-5" />

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Workspace
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-bold text-foreground">
              {getPageTitle()}
            </span>
          </nav>
        </div>

        {/* Right Side User Profile & Actions */}
        <div className="flex items-center gap-3">
          <ProfileAccount />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default NavbarLayout;
