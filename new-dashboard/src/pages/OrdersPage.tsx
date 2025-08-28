"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { useState } from "react";
// import { useOrdersContext } from "@/contexts/OrdersContext";
import OrderTable from "@/components/orders/OrderTable";
// import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
     const [stats] = useState({ totalToday: 0, completed: 0, canceled: 0 });
//   const { orders } = useOrdersContext(); // Assumes you have an OrdersContext
//   const totalOrders = orders.length;
//   const navigate = useNavigate();

//   const handleAddOrder = () => {
//     navigate("/dashboard/orders/add");
//   };

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <OrdersHeader stats={stats} />

      {/* Table */}
      <OrderTable />
    </div>
  );
}
