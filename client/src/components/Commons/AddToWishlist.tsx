import { toast } from "sonner";
import { postData } from "../../api/Api";
import { CheckCircle } from "lucide-react";
import { Product, User } from "../../types";

interface WishlistData {
  product: Product
  user: User | null;
  isLoggedIn : boolean;
  isInWishlist: boolean;
  removeItem: (id: string) => void;
  refreshFavorites: () => void;
}

export const handleWishlistClick = async (
  e: React.MouseEvent,
  { product, user, isLoggedIn, isInWishlist, removeItem, refreshFavorites }: WishlistData
) => {
  e.preventDefault();
  e.stopPropagation();

  if (!isLoggedIn || !user?.id) {
  toast.error("You must be logged in to add items to wishlist.");
  return;
}


  if (isInWishlist) {
    removeItem(product._id);
    return;
  }

  const data = {
    productTitle: product.name,
    images: product.images[0],
    rating: Number(product.rating),
    price: product.price,
    productId: product._id,
    userId: user?.id,
  };

  try {
    const response = await postData("/api/myList/add/", data);

    if (response) {
      toast.success(
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600 w-5 h-5" />
          <span className="text-black font-semibold">
            Item added to wishlist!
          </span>
        </div>
      );
      refreshFavorites();
    } else {
      toast.error("Failed to add to wishlist.");
    }
  } catch (err) {
    console.error("Wishlist error:", err);
    toast.error("An error occurred.");
  }
};
