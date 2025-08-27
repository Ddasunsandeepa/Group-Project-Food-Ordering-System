import React from "react";
import WishListItem from "./WishListItem";
import { Product } from "../../types";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface WishlistGridProps {
  loading: boolean;
}

const WishlistGrid: React.FC<WishlistGridProps> = ({ loading }) => {
  const { favorites } = useFavorites();
  const formattedFavorites: Product[] = favorites.map((fav) => ({
    _id: fav._id,
    name: fav.productTitle,
    description: "No description available", // placeholder
    category: {
      _id: "",
      name: "",
      description: "",
      images: [],
      color: "",
      __v: 0,
      id: "",
    },
    type: "",
    price: fav.price,
    oldPrice: undefined,
    isFeatured: false,
    countInStock: "In stock", // optional placeholder
    discount: undefined,
    size: [],
    productSize: [],
    rating: fav.rating,
    images: [fav.images],
    dateCreated: "",
    __v: 0,
    catName: "",
  }));

  return (
    <div className="md:w-2/3 lg:w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {loading ? (
          <div className="text-gray-500 col-span-full flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto mb-4"></div>
              Loading...
            </div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-gray-500 col-span-full flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <p className="text-lg">No items in wishlist.</p>
              <p className="text-sm text-gray-400 mt-2 mb-4">
                Start adding your favorite meals!
              </p>
              <Link to={"/"} >
                <Button className="bg-app-main hover:bg-app-bannerbtnhover text-black font-semibold">Go Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          formattedFavorites.map((product) => (
            <WishListItem key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistGrid;
