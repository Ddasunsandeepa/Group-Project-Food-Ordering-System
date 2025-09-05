"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, Shield } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AdminUser, Permission, useAdminUser } from "@/contexts/AdminUserContext";

export default function AdminEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin: currentAdmin } = useAdminUser();

  const [formData, setFormData] = useState<AdminUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only super admins can edit admins
  useEffect(() => {
    if (!currentAdmin?.isSuper) {
      toast.error("You do not have permission to edit admins.");
      navigate("/");
    }
  }, [currentAdmin, navigate]);

  // Load admin details from API
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/${id}`);
        if (!res.ok) throw new Error("Failed to fetch admin");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load admin data.");
        navigate("/dashboard/admins");
      }
    };
    if (id) fetchAdmin();
  }, [id, navigate]);

  if (!formData) return <p className="text-white text-center mt-10">Loading admin...</p>;

  const togglePermission = (perm: Permission) => {
    setFormData(prev => {
      if (!prev) return prev;
      const permissions = prev.permissions.includes(perm)
        ? prev.permissions.filter(p => p !== perm)
        : [...prev.permissions, perm];
      return { ...prev, permissions };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isSuper: formData.isSuper,
          permissions: formData.permissions,
        }),
      });

      if (!res.ok) throw new Error("Failed to update admin");
      const data = await res.json();
      toast.success(`Admin "${data.admin.name}" updated successfully.`);
      navigate("/dashboard/admins");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update admin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-950 py-6">
      <div className="px-8 mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Admin</h1>
            <p className="text-sm text-gray-400">Update admin permissions below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info (Display only) */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-400">
                <span className="font-medium text-gray-200">Name: </span>
                {formData.name}
              </p>
              <p className="text-gray-400">
                <span className="font-medium text-gray-200">Email: </span>
                {formData.email}
              </p>
            </CardContent>
          </Card>

          {/* Role */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Shield className="w-5 h-5" /> Role & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isSuper"
                  name="isSuper"
                  checked={formData.isSuper}
                  onChange={(e) =>
                    setFormData(prev => prev ? { ...prev, isSuper: e.target.checked } : prev)
                  }
                  className="w-4 h-4"
                />
                <Label htmlFor="isSuper" className="text-gray-300">
                  Super Admin
                </Label>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">Permissions</Label>
                <div className="flex flex-wrap gap-2">
                  {(["view", "write"] as Permission[]).map((perm) => (
                    <Badge
                      key={perm}
                      variant={formData.permissions.includes(perm) ? "default" : "outline"}
                      onClick={() => togglePermission(perm)}
                      className={`cursor-pointer ${
                        formData.permissions.includes(perm)
                          ? "bg-green-600 text-white"
                          : "border-gray-600 text-gray-300"
                      }`}
                    >
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="text-white hover:bg-amber-500"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-400 hover:bg-orange-500 text-white min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
