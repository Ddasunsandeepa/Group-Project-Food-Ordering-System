"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAdminUser } from "@/contexts/AdminUserContext";
import { User, Mail, Lock, Edit2, Save, X } from "lucide-react";

type UpdatePayload = {
  name?: string;
  email?: string;
  password?: string;
};

export function UserSettings() {
  const { admin, refetchAdmin } = useAdminUser();
  const [editField, setEditField] = useState<null | "name" | "email" | "password">(null);
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [tempValue, setTempValue] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempValue(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (field: "name" | "email" | "password") => {
    if (field === "password" && tempValue.password !== tempValue.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: UpdatePayload = {};
      if (field === "password") {
        payload.password = tempValue.password;
      } else {
        payload[field] = tempValue[field];
      }

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/${admin?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to update");

      toast.success("Updated successfully");

      // Update formData immediately
      setFormData(prev => ({
        ...prev,
        ...payload,
        password: "",
        confirmPassword: "",
      }));

      // Update tempValue to match saved data
      setTempValue(prev => ({
        ...prev,
        ...payload,
        password: "",
        confirmPassword: "",
      }));

      // Reset editing field
      setEditField(null);

      // Update context
      refetchAdmin?.();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = (field: "name" | "email" | "password") => {
    // Reset temp value and close editing
    setTempValue(prev => ({ ...prev, [field]: formData[field] }));
    if (field === "password") {
      setTempValue(prev => ({ ...prev, password: "", confirmPassword: "" }));
    }
    setEditField(null);
  };

  const renderField = (
    label: string,
    value: string,
    icon: JSX.Element,
    fieldKey: "name" | "email" | "password"
  ) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col w-full">
          <Label className="text-gray-300 text-sm">{label}</Label>
          {editField === fieldKey ? (
            fieldKey === "password" ? (
              <>
                <Input
                  type="password"
                  name="password"
                  placeholder="New password"
                  value={tempValue.password}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={tempValue.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                />
              </>
            ) : (
              <Input
                name={fieldKey}
                value={tempValue[fieldKey]}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            )
          ) : (
            <span className="text-gray-400">{fieldKey === "password" ? "••••••••" : value}</span>
          )}
        </div>
      </div>

      {editField !== fieldKey ? (
        <Edit2
          className="w-5 h-5 text-gray-400 cursor-pointer hover:text-amber-500"
          onClick={() => setEditField(fieldKey)}
        />
      ) : (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-white min-w-[90px] flex items-center justify-center gap-1"
            onClick={() => handleSave(fieldKey)}
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4" /> Save
          </Button>
          <Button
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 text-white min-w-[90px]"
            onClick={() => handleCancel(fieldKey)}
            disabled={isSubmitting}
          >
            <X className="w-4 h-4" /> Cancel
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Card className="bg-gray-900 border-gray-800 mt-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl text-white font-semibold tracking-wide">
          User Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderField("Name", formData.name, <User className="w-5 h-5 text-gray-400" />, "name")}
        {renderField("Email", formData.email, <Mail className="w-5 h-5 text-gray-400" />, "email")}
        {renderField("Password", "••••••••", <Lock className="w-5 h-5 text-gray-400" />, "password")}
      </CardContent>
    </Card>
  );
}
