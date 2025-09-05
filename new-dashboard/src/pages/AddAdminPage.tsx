"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, User, Shield} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Permission, useAdminUser } from "@/contexts/AdminUserContext";

export default function AdminAddPage() {
  const navigate = useNavigate();
  const { admin } = useAdminUser();

  // Only super admins can add admins
  useEffect(() => {
    if (!admin?.isSuper) {
      navigate("/");
      toast.error("You do not have permission to add new admins.");
    }
  }, [admin, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isSuper: false,
    permissions: [] as Permission[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePermission = (perm: Permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create admin");

      const data = await res.json();
      toast.success(`Admin created successfully.`);
      console.log("Created admin:", data.name);
      navigate("/dashboard/admins");
      setFormData({ name: "", email: "", password: "", isSuper: false, permissions: [] });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create admin");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 mb-20">
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
            <h1 className="text-2xl font-bold text-white">Add New Admin</h1>
            <p className="text-sm text-gray-400">Enter admin details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <User className="w-5 h-5" /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter admin name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter admin email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter password"
                />
              </div>
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
                  onChange={handleChange}
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
                          ? "bg-blue-600 text-white"
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
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-400 hover:bg-orange-500 min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Admin
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
