import React from "react";
import clsx from "clsx";

interface RibbonBadgeProps {
  label: string;
  className?: string;
  color?: string;
}

const RibbonBadge: React.FC<RibbonBadgeProps> = ({
  label,
  className,
  color = "bg-red-600", // Default color
}) => {
  return (
    <div
      className={clsx(
        "absolute top-5 left-[-40px] w-[180px] -rotate-45 text-white text-xs font-bold text-center py-1 shadow-md",
        color,
        className
      )}
    >
      {label}
    </div>
  );
};

export default RibbonBadge;
