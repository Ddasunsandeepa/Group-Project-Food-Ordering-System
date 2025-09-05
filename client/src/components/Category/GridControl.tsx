import React from "react";
import { ArrowLeft, Grid3X3, LayoutGrid, List } from "lucide-react";
import ViewToggleButton from "./ViewToggleButton";
import { Link } from "react-router-dom";

interface GridControlProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
}

const GridControl: React.FC<GridControlProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-between items-center mb-6 bg-blue-50 p-2 rounded-lg">
      <div className="flex space-x-2">
        <Link
          className="p-3 flex flex-row space-x-1 rounded-full transition-colors duration-200 bg-gray-200 text-gray-500 hover:text-gray-800"
          to={"/"}
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      <div className="flex space-x-2">
        <ViewToggleButton
          icon={List}
          isActive={viewMode === "list"}
          onClick={() => setViewMode("list")}
        />
        <ViewToggleButton
          icon={LayoutGrid}
          isActive={viewMode === "grid2"}
          onClick={() => setViewMode("grid2")}
        />
        <ViewToggleButton
          icon={Grid3X3}
          isActive={viewMode === "grid"}
          onClick={() => setViewMode("grid")}
        />
      </div>
    </div>
  );
};

export default GridControl;
