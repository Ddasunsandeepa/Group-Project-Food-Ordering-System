import React, { useEffect, useState } from "react";
import { Heart, Maximize2 } from "lucide-react";
import { Product } from "../../types";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { toast } from "sonner";
import { useUser } from "../../contexts/UserContext";
import { deleteData } from "../../api/Api";
import ProductZoom from "./ProductZoom";
import { formatPrice, truncateText } from "../../utils/helpers";
import RenderStars from "../Commons/RenderStars";
import { handleWishlistClick } from "../Commons/AddToWishlist";
import { useGlobalContext } from '../../contexts/GlobalContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites, refreshFavorites } = useFavorites();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { user, isLoggedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { addRecentlyVisited } = useGlobalContext();
  const navigate = useNavigate();

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

  const [isFading, setIsFading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    addRecentlyVisited(product);
    setIsFading(true); // trigger fade-out    
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      navigate(`/product/${product._id}`);
    }, 200); 
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
      <div  className={`block group cursor-pointer transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
        onClick={handleClick}>
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
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

            {/* Hover Action Buttons */}
            {isHovered && (
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                  title="View Product"
                >
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={onWishlistClick}
                  className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 ${
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
            )}

            {isOpen && (
              <ProductZoom isInWishlist={isInWishlist} product={product} onClose={() => setIsOpen(false)} />
                
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
          <div className="p-4">
            {/* Title */}
            <h3 className="text-lg font-bold text-blue-600 mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-gray-800 text-sm mb-3 leading-relaxed line-clamp-2 font-medium">
              {truncateText(product.description)}
            </p>

            {/* Stock Status */}
            <div className="mb-3">
              <span className={`${isInStock ? "text-green-600" : "text-orange-600"} text-sm font-semibold`}>
                {product.countInStock}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-1">
                <RenderStars rating={product.rating}  />
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-2">
              {product.oldPrice && (
                <span className="text-gray-400 text-lg line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-red-500 text-xl font-bold">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
