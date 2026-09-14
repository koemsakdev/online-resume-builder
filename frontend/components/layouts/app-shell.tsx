"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

interface AppShellProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AppShell = ({ children, defaultOpen = true }: AppShellProps) => {
  const pathname = usePathname();

  // Pages that should have a clean, full-width layout without the dashboard sidebar:
  // - Landing page ('/')
  // - Auth pages ('/sign-in', '/sign-up')
  const isCleanPage = pathname === "/" || pathname?.startsWith("/sign-");

  if (isCleanPage) {
    return <div className="min-h-screen w-full flex flex-col">{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="min-h-screen flex flex-col">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppShell;

