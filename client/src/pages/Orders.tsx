import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Calendar, User, Mail, Phone } from "lucide-react";

interface Product {
  _id: string;
  productTitle: string;
  quantity: number;
  subTotal: number;
  images: string;
  name: string;
}

interface Order {
  orderId: string;
  userId: string;
  products: Product[];
  name: string;
  phone: string;
  email: string;
  amount: number;
  status: string;
  dateCreated: string;
}

interface User {
  id: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "delivered":
      return "bg-emerald-100 text-emerald-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");

    if (!userDataString) {
      console.error("User data not found in localStorage.");
      setLoading(false);
      return;
    }

    try {
      const userData: User = JSON.parse(userDataString);
      if (!userData?.id) {
        console.error("User id not found in localStorage.");
        setLoading(false);
        return;
      }

      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/orders`)
        .then((res) => setOrders(res.data?.data || []))
        .catch((err) => console.error("Error fetching orders:", err))
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Error parsing user data:", err);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-500">Loading orders...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <Package className="w-8 h-8 text-blue-600" />
        <span>My Orders</span>
      </h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <Package className="w-16 h-16 mb-4" />
          <h2 className="text-xl font-semibold">No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg truncate">{order.orderId}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 gap-2 mb-4 text-gray-600 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{order.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{order.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{order.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(order.dateCreated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Amount */}
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="font-medium text-gray-900">Total:</span>
                <span className="text-xl font-bold text-gray-900">
                  Rs.{order.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;