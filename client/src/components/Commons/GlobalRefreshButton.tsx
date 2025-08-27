import React from "react";
import { runAllRefetchers } from "@/utils/GlobalRefetchManager";
import { RefreshCcw } from "lucide-react";

const GlobalRefreshButton: React.FC = () => {
  const handleClick = () => {
    runAllRefetchers();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-sm px-4 py-2 border rounded bg-white shadow hover:bg-gray-100"
    >
      <RefreshCcw className="w-4 h-4" />
      Refresh All
    </button>
  );
};

export default GlobalRefreshButton;
