"use client";

import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react"; // notification icon

type Props = {
  children?: ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="ml-auto pr-4 pt-2 relative">
            <button className="relative p-2 rounded hover:bg-gray-800">
              <Bell className="w-5 h-5 text-gray-200" />
              {/* Optional notification badge */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-gray-950" />
            </button>
          </div>
        </header>
        {children || <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  );
}
