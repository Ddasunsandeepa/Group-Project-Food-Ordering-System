"use client";

import * as React from "react";
import { useAdminUser } from "@/contexts/AdminUserContext";

interface DashboardWelcomeBannerProps {
  imageUrl?: string; 
  message?: string; 
}

export const DashboardWelcomeBanner: React.FC<DashboardWelcomeBannerProps> = ({
  imageUrl = "/admin-page.webp",
  message,
}) => {
  const { admin } = useAdminUser();

  if (!admin) return null; // Only show if admin is logged in

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 overflow-hidden">
      {/* Text content */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome, {admin.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {message ?? "Here’s what’s happening in your dashboard today."}
        </p>
      </div>

      {/* Blurred image on the right */}
      {imageUrl && (
        <div className="absolute top-0 right-0 h-full w-1/3 overflow-hidden">
          <img
            src={imageUrl}
            alt="Dashboard background"
            className="h-full w-full object-cover opacity-30 blur-xl pointer-events-none select-none"
          />
        </div>
      )}
    </div>
  );
};
