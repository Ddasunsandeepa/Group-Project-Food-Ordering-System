import { formatPrice } from "@/utils/helpers";
import React from "react";
import { Link } from "react-router-dom";

interface CartItemCardProps {
  productId: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  subTotal: number;
  onQuantityChange: (productId: string, newQuantity: number, size: string) => void;
  onRemove: (productId: string, size: string) => void;
  size: string;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  productId,
  title,
  description,
  imageUrl,
  price,
  quantity,
  subTotal,
  onQuantityChange,
  onRemove,
  size
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 border-b">
      {/* Product Info */}
      <div className="col-span-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <Link
              to={`/product/${productId}`}
              className="font-semibold hover:underline hover:text-blue-700 block truncate"
            >
              {title}
            </Link>
            <p className="text-gray-600 text-sm truncate">{description}</p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-2 text-center font-semibold whitespace-nowrap">
        {formatPrice(price)}
      </div>

      {/* Quantity */}
      <div className="col-span-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onQuantityChange(productId, quantity - 1, size)}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => onQuantityChange(productId, quantity + 1, size)}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="col-span-2 text-center text-green-700 font-semibold whitespace-nowrap">
        {formatPrice(subTotal)}
      </div>

      {/* Remove Button */}
      <div className="col-span-2 text-center">
        <button
          onClick={() => onRemove(productId, size)}
          className="w-24 text-red-500 hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
