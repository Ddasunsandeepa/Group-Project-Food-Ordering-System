"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminUser } from "@/contexts/AdminUserContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { SuperAdminWelcomeBanner } from "@/components/admins/WelcomeBanner";
import { AdminDashboardCards } from "@/components/admins/AdminDashboardCards";

interface Admin {
  _id: string;
  name: string;
  permissions: string[];
  isSuper: boolean;
}

export default function AdminPage() {
  const { admin } = useAdminUser();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [stats, setStats] = useState({ totalManagers: 0, totalViewers: 0 });

  useEffect(() => {
    if (!admin?.isSuper) {
      navigate("/", { replace: true });
      toast.error("Access denied. Super Admins only.");
    }
  }, [admin, navigate]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/admin`);
        const data = await res.json();

        if (data.status) {
          // Exclude super admins
          const nonSuperAdmins = data.admins.filter((a: Admin) => !a.isSuper);
          setAdmins(nonSuperAdmins);

          // Managers: anyone with "write" or "manager" permission
          const totalManagers = nonSuperAdmins.filter((a: Admin) =>
            a.permissions.some((p) => p === "write" || p === "super")
          ).length;

          // View-only: anyone with only "view" permission
          const totalViewers = nonSuperAdmins.filter((a: Admin) =>
            a.permissions.every((p) => p === "view")
          ).length;

          setStats({ totalManagers, totalViewers });
        } else {
          toast.error(data.msg || "Failed to fetch admins");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while fetching admins.");
      }
    };

    fetchAdmins();
  }, []);

  if (!admin?.isSuper) {
    return null;
  }

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Admin Panel</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SuperAdminWelcomeBanner />
      <AdminDashboardCards
        stats={stats}
        onAddAdmin={() => navigate("/dashboard/admins/add")}
      />

      {/* Optional: List all admins */}
      {admins.map((a) => (
        <div key={a._id}>{a.name}</div>
      ))}
    </div>
  );
}
