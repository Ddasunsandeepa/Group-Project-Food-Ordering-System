import * as React from "react";
import { Link, useLocation } from "react-router-dom";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./SidebarUser";
import { useAdminUser } from "@/contexts/AdminUserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { admin } = useAdminUser();

  // Navigation structure matching your routes
  const data = {
    navMain: [
      {
        title: "Dashboard",
        items: [{ title: "Home", url: "/", isActive: false }],
      },
      {
        title: "Management",
        items: [
          { title: "Products", url: "/dashboard/products", isActive: false },
          { title: "Categories", url: "/dashboard/categories", isActive: false },
          { title: "Orders", url: "/dashboard/orders", isActive: false },
          { title: "Messages", url: "#", isActive: false },
          { title: "Notifications", url: "#", isActive: false },
          // Only show Admins tab if user is super admin
          ...(admin?.isSuper
            ? [{ title: "Admins", url: "/dashboard/admins", isActive: false }]
            : []),
        ],
      },
      {
        title: "Settings",
        items: [
          { title: "Settings", url: "/dashboard/settings", isActive: false },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2 className="text-lg font-bold px-4 py-2">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="pb-5">
        {admin && <NavUser user={admin} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}