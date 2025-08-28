import { ReactNode } from "react";
import { Outlet } from "react-router-dom"; // Make sure you import Outlet
import { AppSidebar } from "@/components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type Props = {
  children?: ReactNode; // optional children
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
        </header>
        {children || <Outlet />} {/* Render children or Outlet for nested routes */}
      </SidebarInset>
    </SidebarProvider>
  );
}
