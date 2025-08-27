import React from "react";
import { ShoppingCart } from "lucide-react"; // Or your preferred icon library

interface EmptyCartMessageProps {
  itemCount?: number;
  onGoShopping: () => void;
}

const EmptyCartMessage: React.FC<EmptyCartMessageProps> = ({
  itemCount = 0,
  onGoShopping,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-6">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">
          {itemCount}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>

      <button
        onClick={onGoShopping}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        Go Shopping
      </button>
    </div>
  );
};

export default EmptyCartMessage;
