"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OrderTable() {
  const mockOrders = [
    {
      id: "ORD-1001",
      dateTime: "2025-08-28 14:35",
      itemsCount: 2,
      paid: "Paid",
      status: "Active",
    },
    {
      id: "ORD-1002",
      dateTime: "2025-08-28 15:10",
      itemsCount: 3,
      paid: "Pending",
      status: "Active",
    },
    {
      id: "ORD-1003",
      dateTime: "2025-08-28 16:05",
      itemsCount: 1,
      paid: "Paid",
      status: "Completed",
    },
    {
      id: "ORD-1004",
      dateTime: "2025-08-28 16:45",
      itemsCount: 4,
      paid: "Pending",
      status: "Active",
    },
    {
      id: "ORD-1005",
      dateTime: "2025-08-28 17:20",
      itemsCount: 2,
      paid: "Paid",
      status: "Completed",
    },
  ];

  const handleClaim = (orderId: string) => {
    console.log("Claim order:", orderId);
    toast.success(`Order ${orderId} claimed successfully!`);
    // Add your claim logic here
  };

    const handleClose = (orderId: string) => {
    console.log("Claim order:", orderId);
    toast.success(`Order ${orderId} closed successfully!`);
    // Add your claim logic here
  };


  const getPaidBadgeClasses = (order: (typeof mockOrders)[0]) => {
    if (order.status === "Completed") return "bg-gray-600 text-gray-200";
    if (order.paid === "Paid") return "bg-green-600 text-white";
    if (order.paid === "Pending") return "bg-amber-600 text-white";
    return "bg-gray-500 text-white";
  };

  return (
    <div className="bg-gray-950 mb-20 mt-8 rounded-lg shadow-md border border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-gray-100">Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Items
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Paid Status
              </th>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-950 divide-y divide-gray-800">
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className={order.status === "Completed" ? "opacity-60" : ""}
              >
                <td className="px-4 py-3 text-gray-200">{order.id}</td>
                <td className="px-4 py-3 text-gray-200">{order.dateTime}</td>
                <td className="px-4 py-3 text-gray-200">{order.itemsCount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getPaidBadgeClasses(
                      order
                    )}`}
                  >
                    {order.paid}
                  </span>
                </td>
                <td className="px-4 py-3 text-center flex  gap-2">
                  <div className="flex items-center justify-start gap-2">
                      <button className="text-amber-500 hover:text-amber-400">
                        <Eye className="w-5 h-5 inline-block" />
                      </button>
                      {order.status !== "Completed" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                          onClick={() => handleClaim(order.id)}
                        >
                          Claim
                        </Button>
                      )}
                       {order.status !== "Completed" && (
                        <Button
                          size="sm"
                          className="bg-red-800 hover:bg-red-700 text-white px-2 py-1 rounded"
                          onClick={() => handleClose(order.id)}
                        >
                          Close
                        </Button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
