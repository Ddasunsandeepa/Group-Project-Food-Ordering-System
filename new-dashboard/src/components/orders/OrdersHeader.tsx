"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, UserPlus, X } from "lucide-react";

interface OrdersStats {
  totalToday: number;
  completed: number;
  canceled: number;
}

interface OrdersHeaderProps {
  stats: OrdersStats;
  onAddOrder?: () => void;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  stats
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/10 rounded-lg">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {stats.totalToday}
              </div>
            </div>
          </div>
          <CardTitle className="text-white text-lg font-semibold">
            Total Orders Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm mb-4">
            Orders placed in the system today
          </p>
        </CardContent>
      </Card>

      {/* Total Orders Today */}
      <Card className="bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/10 rounded-lg">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {stats.completed}
              </div>
            </div>
          </div>
          <CardTitle className="text-white text-lg font-semibold">
            Completed Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm">
            Orders successfully completed today
          </p>
          <div className="mt-3 flex items-center text-white/60 text-xs">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
            Keep up the good work
          </div>
        </CardContent>
      </Card>

      {/* Canceled Orders */}
      <Card className="bg-gradient-to-br from-red-700 to-red-900 border-red-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/10 rounded-lg">
              <X className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {stats.canceled}
              </div>
            </div>
          </div>
          <CardTitle className="text-white text-lg font-semibold">
            Canceled Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm">
            Orders that were canceled or failed
          </p>
          <div className="mt-3 flex items-center text-white/60 text-xs">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            Monitor for improvements
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
