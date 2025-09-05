import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import WishlistGrid from "../components/Wishlist/WishlistGrid";

export default function WishList() {
  const { loading } = useFavorites();
  const { user } = useUser();
  const location = useLocation();

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="w-full bg-[url('/wishlist-banner.webp')] bg-cover bg-top md:p-8 flex items-center justify-center font-lato bg-white/90">
        <div className="flex flex-col justify-start gap-y-4 items-center bg-[url('/wishlist-banner.webp')] backdrop-blur-md bg-cover bg-center py-12 px-4 md:px-12 md:rounded-2xl shadow-lg text-center md:max-w-lg">
          <div className="relative backdrop-blur-lg bg-white/10 flex flex-col justify-start gap-y-4 items-center py-12 px-4 md:px-8 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Log in to save your favorite cravings!
            </h2>
            <p className="text-white mb-6 font-light">
              Create an account or sign in to start building your personalized
              wishlist of delicious meals.
            </p>
            <Link to="/sign-in" state={{ from: location.pathname }}>
              <button
                className="bg-app-bannerbtn hover:bg-app-bannerbtnhover text-black font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
                aria-label="Sign In or Sign Up"
              >
                Sign In / Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="w-full h-full p-8 flex flex-col md:flex-row gap-6">
      {/* Left Column - Image Sidebar */}
      <div className="md:w-1/3 lg:w-1/4">
        <div className="h-full bg-[url('/wishlist-banner.webp')] bg-cover bg-center py-8 px-6 flex flex-col items-center justify-start rounded-2xl shadow-lg sticky top-4">
          <div className="relative backdrop-blur-xl rounded-xl bg-white/20 flex flex-col justify-start gap-y-2 items-center py-12 px-4 text-center">
            <p className="text-2xl font-bold text-white">
              🍽️ {user?.name}'s Wishlist
            </p>
            <p className="text-sm text-white/90 leading-relaxed">
              Your saved meals are just a click away!
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Product Grid */}
      <WishlistGrid loading={loading} />
    </div>
  );
}
