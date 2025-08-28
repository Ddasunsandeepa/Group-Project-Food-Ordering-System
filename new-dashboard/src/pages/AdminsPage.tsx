"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminUser, useAdminUser } from "@/contexts/AdminUserContext";
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
import AdminTable from "@/components/admins/AdminTable";


export default function AdminPage() {
  const { admin } = useAdminUser();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
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
          const nonSuperAdmins = data.admins.filter((a: AdminUser) => !a.isSuper);
          setAdmins(nonSuperAdmins);

          // Managers: anyone with "write" or "manager" permission
          const totalManagers = nonSuperAdmins.filter((a: AdminUser) =>
            a.permissions.some((p) => p === "write" || p === "super")
          ).length;

          // View-only: anyone with only "view" permission
          const totalViewers = nonSuperAdmins.filter((a: AdminUser) =>
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

const handleDeleteAdmin = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this admin?")) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin.token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to delete admin");

    toast.success("Admin deleted successfully");

    // Refresh admins list
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  } catch (err) {
    toast.error("Something went wrong");
    console.error(err);
  }
};

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

      <AdminTable admins={admins} onDelete={handleDeleteAdmin} />

    </div>
  );
}
