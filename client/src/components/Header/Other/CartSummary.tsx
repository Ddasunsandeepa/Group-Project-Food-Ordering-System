import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/helpers";
import React from "react";

const CartSummary: React.FC = () => {
  const { cartTotal } = useCart();

  return (
    <div className="">
      <span className="text-lg font-semibold text-gray-800 select-none">
        {formatPrice(cartTotal)}
      </span>
    </div>
  );
};

export default CartSummary;
