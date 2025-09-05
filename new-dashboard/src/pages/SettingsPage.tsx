"use client";

import { DashboardWelcomeBanner } from "@/components/home/WelcomeBannerHome";
import { UserSettings } from "@/components/settings/UserSettings";
// import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


export default function SettingsPage() {
//   const navigate = useNavigate();


  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings Panel</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

    <DashboardWelcomeBanner message="Adjust settings for your platform"/>
    <UserSettings />
    
    </div>
  );
}
