import React from "react";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2  font-normal text-xl transition-colors ${
      isActive
        ? "border-b-2 bg-blue-50/20 border-blue-500 text-blue-600"
        : "bg-white text-gray-500 hover:bg-gray-50/20 hover:border-b-2 hover:border-gray-300"
    }`}
  >
    {label}
  </button>
);

export default Tab;