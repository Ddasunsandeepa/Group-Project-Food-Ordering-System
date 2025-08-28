"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AdminUser } from "@/contexts/AdminUserContext";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AdminRowProps {
  admin: AdminUser;
  onDelete?: (id: string) => void;
}

const AdminRow: React.FC<AdminRowProps> = ({ admin, onDelete }) => {
  // Determine role label
  let roleLabel: string;
  if (admin.isSuper) {
    roleLabel = "Super Admin";
  } else if (admin.permissions.some((p) => p === "write")) {
    roleLabel = "Manager";
  } else if (admin.permissions.every((p) => p === "view")) {
    roleLabel = "Kitchen Staff";
  } else {
    roleLabel = "Admin"; // fallback
  }
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/admins/${admin.id}/edit`);
  };

  return (
    <tr className="hover:bg-gray-900 transition">
      {/* Name + Avatar */}
      <td className="px-4 py-3 text-sm text-gray-200 flex items-center gap-3">
        <Avatar className="h-8 w-8 bg-grayscale">
          <AvatarImage src={""} alt={admin.name} />
          <AvatarFallback className="rounded-lg bg-gray-600">
            {admin.name?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span>{admin.name}</span>
      </td>

      {/* Email with copy button */}
      <td className="px-4 py-3 text-sm text-gray-200">
        <div className="flex items-center gap-2">
          <span>{admin.email}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(admin.email);
              toast.success("Email copied!");
            }}
            className="p-1 rounded hover:bg-gray-800 transition"
            title="Copy email"
          >
            <Copy size={14} className="text-gray-400 hover:text-white" />
          </button>
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-3 text-sm text-gray-200">
        {roleLabel === "Super Admin" && (
          <span className="px-2 py-1 rounded bg-purple-700 text-white text-xs">
            {roleLabel}
          </span>
        )}
        {roleLabel === "Manager" && (
          <span className="px-2 py-1 rounded bg-gradient-to-br from-emerald-600 to-emerald-800 text-white text-xs">
            {roleLabel}
          </span>
        )}
        {roleLabel === "Kitchen Staff" && (
          <span className="px-2 py-1 rounded bg-gradient-to-br from-amber-600 to-amber-800 text-white text-xs">
            {roleLabel}
          </span>
        )}
        {roleLabel === "Admin" && (
          <span className="px-2 py-1 rounded bg-gray-700 text-white text-xs">
            {roleLabel}
          </span>
        )}
      </td>

      {/* Permissions */}
      <td className="px-4 py-3 text-sm text-gray-200">
        {admin.permissions && admin.permissions.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {admin.permissions.map((perm, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
              >
                {perm}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 italic">No permissions</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-sm text-center">
        {!admin.isSuper && (
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(admin.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default AdminRow;
