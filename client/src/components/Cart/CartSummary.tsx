import React from "react";
import { Loader2, Package } from "lucide-react";
import { formatPrice } from "@/utils/helpers";

interface CartSummaryProps {
  subTotal: number;
  shippingCost?: number;
  location?: string;
  loading?: boolean;
  onCheckout: () => void;
  isCartEmpty?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subTotal,
  shippingCost = 20,
  location = "Colombo",
  onCheckout,
  isCartEmpty = false,
  loading = false,
}) => {
  const total = subTotal + shippingCost;

  return (
    <div className="fixed right-12 bottom-12 w-80 bg-white rounded-lg shadow-2xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">CART TOTALS</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">SubTotal</span>
          <span className="text-green-600 font-semibold">
            {formatPrice(subTotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">{formatPrice(shippingCost)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimate For</span>
          <span className="text-gray-500">{location}</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-red-600">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={isCartEmpty || loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2
    ${
      isCartEmpty || loading
        ? "bg-gray-300 text-gray-700"
        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
    }
  `}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Package className="w-5 h-5" />
            Proceed To Checkout
          </>
        )}
      </button>
    </div>
  );
};

export default CartSummary;
