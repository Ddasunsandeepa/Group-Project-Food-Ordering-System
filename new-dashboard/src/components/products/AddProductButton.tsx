"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddProductButtonProps {
  onClick: () => void;
}

export default function AddProductButton({ onClick }: AddProductButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="w-40 h-40 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 text-foreground text-base font-semibold gap-2"
    >
      <Plus className="w-12 h-12" />
      Add Product
    </Button>
  );
}
