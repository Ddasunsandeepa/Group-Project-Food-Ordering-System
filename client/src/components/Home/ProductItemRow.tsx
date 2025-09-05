import React, { useEffect, useState } from "react";
import { Heart, Maximize2 } from "lucide-react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { toast } from "sonner";
import { useUser } from "../../contexts/UserContext";
import { deleteData } from "../../api/Api";
import ProductZoom from "./ProductZoom";
import { formatPrice, truncateText } from "../../utils/helpers";
import RenderStars from "../Commons/RenderStars";
import { handleWishlistClick } from "../Commons/AddToWishlist";
import { useGlobalContext } from "../../contexts/GlobalContext";

interface ProductCardRowProps {
  product: Product;
  className?: string;
}

const ProductCardRow: React.FC<ProductCardRowProps> = ({
  product,
  className = "",
}) => {
  const { favorites, refreshFavorites } = useFavorites();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { user,isLoggedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { addRecentlyVisited } = useGlobalContext();

  const removeItem = async (id: string) => {
    try {
      await deleteData(`/api/myList/${id}`);
      toast.success("Item removed from wishlist!");
      refreshFavorites();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item. Please try again!");
    }
  };

  const onWishlistClick = (e: React.MouseEvent) =>
  handleWishlistClick(e, {
    product,
    user,
    isLoggedIn,
    isInWishlist,
    removeItem,
    refreshFavorites,
  });

  const isInStock = product.countInStock.toLowerCase() === "in stock";
  useEffect(() => {
    const found = favorites.some((fav) => fav.productId === product._id);
    setIsInWishlist(found);
  }, [favorites, product._id]);

  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className={`block group ${className}`
      }
      onClick={() => {
          addRecentlyVisited(product);
        }}
      >
        <div className="flex flex-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-[120px] relative">
          {/* Image Section */}
          <div className="relative w-[120px] h-full bg-gray-100 overflow-hidden flex-shrink-0">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">🍽️</span>
              </div>
            )}

            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                  {product.discount}%
                </div>
              </div>
            )}

            {isOpen && (
              <ProductZoom
                isInWishlist={isInWishlist}
                product={product}
                onClose={() => setIsOpen(false)}
              />
            )}

            {/* Overlay for out of stock */}
            {!isInStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-gray-900 font-semibold text-sm">
                    Out of Stock
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-row justify-between flex-1 p-4">
            <div className="flex flex-col justify-between h-full">
              {/* Title */}
              <div className="flex flex-col h-full justify-start">
                <h3 className="text-lg font-bold text-blue-600 mb-1 line-clamp-1 group-hover:text-blue-500 transition-colors">
                  {product.name}
                </h3>
                {/* Description */}
                <p className="text-gray-800 text-sm mb-1 leading-relaxed line-clamp-3 font-medium">
                  {truncateText(product.description, 120)}
                </p>
              </div>
              {/* Rating and Stock */}
              <div className="flex items-center justify-start space-x-6 mb-2">
                <div className="flex items-center gap-1">
                  <RenderStars rating={product.rating}  />
                </div>
                <span
                className={`text-sm font-semibold ${
                  isInStock ? "text-green-600" : "text-orange-600"
                }`}
              >
                {product.countInStock}
              </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-2">
              {/* Price and Wishlist */}
              <div className="flex flex-col h-full items-end justify-between pr-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsOpen(true);
                    }}
                    className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-transform duration-200 hover:scale-110"
                    title="View Product"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={onWishlistClick}
                    className={`w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center shadow transition-transform duration-200 hover:scale-110 ${
                      isInWishlist
                        ? "bg-white hover:bg-red-50"
                        : "bg-white/90 hover:bg-white"
                    }`}
                    title={
                      isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                    }
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist
                          ? "text-white fill-red-500"
                          : "text-gray-700 hover:text-red-500"
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {product.oldPrice && (
                      <span className="text-gray-400 text-lg line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                    <span className="text-green-700 text-xl font-bold">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCardRow;
