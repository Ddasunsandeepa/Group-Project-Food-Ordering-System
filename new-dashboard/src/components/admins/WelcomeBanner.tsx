"use client";

import * as React from "react";
import { useAdminUser } from "@/contexts/AdminUserContext";

interface SuperAdminWelcomeBannerProps {
  imageUrl?: string; // optional background image
}

export const SuperAdminWelcomeBanner: React.FC<SuperAdminWelcomeBannerProps> = ({
  imageUrl = "/admin-page.webp",
}) => {
  const { admin } = useAdminUser();

  if (!admin?.isSuper) return null; 

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 my-6 overflow-hidden">
      {/* Text content */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome, {admin.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          You have super admin privileges. Manage other admins safely from here.
        </p>
      </div>

      {/* Blurred image on the right */}
      {imageUrl && (
        <div className="absolute top-0 right-0 h-full w-1/3 overflow-hidden">
          <img
            src={imageUrl}
            alt="Admin background"
            className="h-full w-full object-cover opacity-30 blur-xl pointer-events-none select-none"
          />
        </div>
      )}
    </div>
  );
};
