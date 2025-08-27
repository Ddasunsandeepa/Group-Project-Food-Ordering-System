import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../../contexts/FavoritesContext";

const WishlistIndicator: React.FC = () => {
  const { favorites, loading } = useFavorites();
  
  // console.log("WishlistIndicator - Favorites:", favorites);

  const wishlistCount = loading ? 0 : favorites.length;

  return (
    <Link
      to="/favorites"
      className="relative bg-red-50 rounded-full p-4 hover:bg-red-100 transition-colors"
    >
      <Heart className="text-red-500" />
      {wishlistCount >= 0 && (
        <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {wishlistCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistIndicator;
