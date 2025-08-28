"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Permission, useAdminUser } from "@/contexts/AdminUserContext";

interface CategoryActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryActions({ onEdit, onDelete }: CategoryActionsProps) {
  const { admin } = useAdminUser();

  const hasPermission = (perm: Permission) => {
    return admin?.permissions?.includes(perm);
  };

  return (
    <div className="flex justify-center gap-2">
      {hasPermission("write") && (
        <Button
          variant="outline"
          size="sm"
          className="text-blue-200 bg-blue-800/30 border-blue-600 hover:bg-blue-700 hover:text-gray-100"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4 mr-1" />
        </Button>
      )}

      {hasPermission("super") && (
        <Button
          variant="outline"
          size="sm"
          className="text-red-400/90 border-red-400/80 hover:bg-red-700 hover:text-white"
          onClick={onDelete}
        >
          <Trash className="w-4 h-4 mr-1" />
        </Button>
      )}
    </div>
  );
}
