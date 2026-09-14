import React from "react";
import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from "../ui/scroll-area";
import { ProfileAccount } from "../ui/profile-account";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarInset>
      <header className="flex sticky top-0 z-50 w-full items-center">
        <div className="flex h-16 w-full items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="px-4">
          <ProfileAccount />
        </div>
      </header>
      <ScrollArea className="flex-1 w-full border-t dark:border-gray-800 border-gray-100 overflow-y-auto">
        {children}
      </ScrollArea>
    </SidebarInset>
  );
};

export default DashboardLayout;
