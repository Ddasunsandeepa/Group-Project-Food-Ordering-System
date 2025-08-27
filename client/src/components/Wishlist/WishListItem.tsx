import React from "react";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Heart, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteData } from "@/api/Api";
import { toast } from "sonner";
import RenderStars from "../Commons/RenderStars";
// import { useUser } from "../../contexts/UserContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const WishListItem: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
    const { refreshFavorites } = useFavorites();
  //   const { user } = useUser();

  const removeItem = async (id: string) => {
    try {
      await deleteData(`/api/myList/${id}`);
      toast.success("Item removed from wishlist!");
      refreshFavorites()
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item. Please try again!");
    }
  };

  const isInStock = product.countInStock.toLowerCase() === "in stock";

  return (
    <>
      <Link to={`/product/${product._id}`} className="block group">
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
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

            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 ">
              <div
                className={`w-10 h-10 bg-white backdrop-blur-sm cursor-default rounded-full flex items-center justify-center shadow-lg transition-all duration-200`}
              >
                <Heart className={`w-5 h-5 text-white fill-red-500`} />
              </div>
            </div>

            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-3 left-3 z-20">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                  {product.discount}%
                </div>
              </div>
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

            {/* Stock Status */}
            <div className="mb-3">
              <span className="text-green-600 text-sm font-semibold">
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
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                {product.oldPrice && (
                  <span className="text-gray-400 text-lg line-through">
                    ${product.oldPrice}
                  </span>
                )}
                <span className="text-red-500 text-xl font-bold">
                  ${product.price}
                </span>
              </div>
              <Button
                className="bg-gray-400 flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation(); 
                  e.preventDefault(); 
                  removeItem(product._id);
                }}
              >
                <Trash className="w-4 h-4" />
                <span>Remove</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default WishListItem;
