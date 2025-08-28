"use client";

import { Plus } from "lucide-react"; // or any icon you prefer
import { Button } from "@/components/ui/button";

interface AddProductButtonProps {
  onClick: () => void;
}

export default function AddProductButton({ onClick }: AddProductButtonProps) {
  return (
    <Button variant="default" size="lg" onClick={onClick} className="flex items-center gap-2">
      <Plus className="w-4 h-4" />
      Add Product
    </Button>
  );
}
