"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Permission, useAdminUser } from "@/contexts/AdminUserContext";

interface ProductDetailActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductDetailActions({
  onEdit,
  onDelete,
}: ProductDetailActionsProps) {
  const { admin } = useAdminUser();

  const hasPermission = (perm: Permission) => admin?.permissions?.includes(perm);

  return (
    <div className="flex items-center gap-3 mt-4">
      {hasPermission("write") && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-blue-200 bg-blue-800/30 border-blue-600 hover:bg-blue-700 hover:text-gray-100"
          onClick={onEdit}
        >
          <Edit className="w-5 h-5" />
          Edit
        </Button>
      )}

      {hasPermission("super") && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-red-400/90 border-red-400/80 hover:bg-red-700 hover:text-white"
          onClick={onDelete}
        >
          <Trash className="w-5 h-5" />
          Delete
        </Button>
      )}
    </div>
  );
}
