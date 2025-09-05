import React from "react";
import type { LucideIcon } from "lucide-react";

interface ViewToggleButtonProps {
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full transition-colors duration-200 ${
        isActive ? "text-blue-500 bg-gray-200" : "bg-gray-200 text-gray-500 hover:text-gray-800"
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default ViewToggleButton;
