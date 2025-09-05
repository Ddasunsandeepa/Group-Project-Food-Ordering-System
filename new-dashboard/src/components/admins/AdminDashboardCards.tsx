"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, Eye, ArrowRight } from "lucide-react";

interface AdminDashboardStats {
  totalManagers: number;
  totalViewers: number;
}

interface AdminDashboardCardsProps {
  stats: AdminDashboardStats;
  onAddAdmin?: () => void;
}

export const AdminDashboardCards: React.FC<AdminDashboardCardsProps> = ({
  stats,
  onAddAdmin,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Create New Admin Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/10 rounded-lg">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <CardTitle className="text-white text-lg font-semibold">
            Create New Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm mb-4">
            Add a new administrator to manage your food delivery system
          </p>
          <Button
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/40"
            variant="outline"
            onClick={onAddAdmin}
          >
            Add Admin
          </Button>
        </CardContent>
      </Card>

      {/* Total Managers Card */}
      <Card className="bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/10 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.totalManagers}</div>
            </div>
          </div>
          <CardTitle className="text-white text-lg font-semibold">
            Restaurant Managers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm">
            Active managers with full access to restaurant operations and order management
          </p>
          <div className="mt-3 flex items-center text-white/60 text-xs">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
            All systems operational
          </div>
        </CardContent>
      </Card>

      {/* Kitchen Staff/Viewers Card */}
      <Card className="bg-gradient-to-br from-amber-600 to-amber-800 border-amber-500 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/10 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.totalViewers}</div>
            </div>
          </div>
          <CardTitle className="text-white text-lg font-semibold">
            Kitchen Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm">
            Kitchen staff with view-only access to orders and menu information
          </p>
          <div className="mt-3 flex items-center text-white/60 text-xs">
            <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
            Read-only permissions
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
