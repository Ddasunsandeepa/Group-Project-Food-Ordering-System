import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Heart,
  ArrowLeftRight,
  Minus,
  Plus,
  X,
  CheckCircle,
} from "lucide-react";
import { Product } from "../../types";
import { deleteData, postData } from "@/api/Api";
import { toast } from "sonner";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useUser } from "../../contexts/UserContext";
import ShinyButton from "../Commons/ShinyButton";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import RenderStars from "../Commons/RenderStars";
import { useCart } from "../../contexts/CartContext";

type ProductZoomProps = {
  isInWishlist?: boolean;
  product: Product;
  onClose: (e: React.MouseEvent) => void;
};

const ProductZoom: React.FC<ProductZoomProps> = ({
  isInWishlist,
  product,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shine, setShine] = useState(false);
  const [discountCal, setDiscountCal] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.size[0] || "");
  const isInStock = product.countInStock.toLowerCase() === "in stock";
  const { refreshFavorites } = useFavorites();
  const { user, isLoggedIn } = useUser();
  const { addToCart } = useCart();

  const modalRoot = document.getElementById("ProductZoom-root");
  if (!modalRoot) return null;

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

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn || !user?.id) {
      toast.error("You must be logged in to add items to wishlist.");
      return;
    }

    if (isInWishlist) {
      removeItem(product._id);
    } else {
      const data = {
        productTitle: product.name,
        images: product.images[0],
        rating: Number(product.rating),
        price: product.price,
        productId: product._id,
        userId: user.id,
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
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product is null.");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }
    addToCart(product, selectedSize, quantity);
    if (isInStock) {
      toast.success(
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600 w-5 h-5" />
          <span className="text-black font-semibold">
            {quantity} {product.name} added to cart!
          </span>
        </div>
      );
    } else
      toast.success(
        <div className="flex items-center gap-3">
          <CheckCircle className="text-orange-600 w-5 h-5" />
          <div className="flex flex-col justify-center items-start">
            <span className="text-black font-semibold">
              {quantity} {product.name} added to cart!
            </span>
            <span className="text-red-500 font-semibold">Out of Stock</span>
          </div>
        </div>
      );
  };

  const triggerFromOtherComponent = () => {
    setShine(true);
    setTimeout(() => setShine(false), 1200); // prevent permanent true
  };

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.discount || 0;
  const hasDiscount = discountPercentage > 0;
  const discount =
    hasDiscount && product.oldPrice
      ? ` ${formatPrice(product.oldPrice - product.price)}`
      : "";

  const updateDiscountCalculationUP = () => {
    if (product.oldPrice && product.price) {
      const discountAmount = product.oldPrice - product.price;
      setDiscountCal(discountAmount * (quantity + 1));
    }
  };

  const updateDiscountCalculationDOWN = () => {
    if (product.oldPrice && product.price) {
      const discountAmount = product.oldPrice - product.price;
      setDiscountCal(discountAmount * (quantity - 1));
    }
  };
  const catLink = `/categories/${product.category._id}`;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl relative w-full max-w-4xl max-h-[70vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose(e);
          }}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={
                    product.images[selectedImage] ||
                    "https://via.placeholder.com/600x600?text=No+Image"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discountPercentage}%
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedImage(index);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Category and Rating */}
              <div className="flex items-center justify-start gap-5">
                <Link
                  to={catLink}
                  className="px-3 py-1 rounded-full text-sm font-semibold text-gray-700"
                  style={{
                    backgroundColor: product.category.color || "#6B7280",
                  }}
                >
                  {product.category.name || "Unknown Category"}
                </Link>
                {product.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <RenderStars rating={product.rating} />
                    <span className="text-sm text-gray-600 ml-2 user-select-none">
                      ({product.rating})
                    </span>
                  </div>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-2xl lg:text-3xl font-bold text-red-500">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg lg:text-xl text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              {/* <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p> */}

              {/* Size Selection */}
              {product.size.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.size.map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedSize(size);
                        }}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedSize === size
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Stock */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        triggerFromOtherComponent();
                        updateDiscountCalculationDOWN();
                        setQuantity(Math.max(1, quantity - 1));
                      }}
                      className="p-3 bg-gray-100 cursor-pointer hover:bg-blue-50 transition-colors rounded-full"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        triggerFromOtherComponent();
                        updateDiscountCalculationUP();
                        setQuantity(quantity + 1);
                      }}
                      className="p-3 bg-gray-100 cursor-pointer hover:bg-blue-50 transition-colors rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-3">
                    <span
                      className={`${
                        isInStock ? "text-green-600" : "text-orange-600"
                      } text-sm font-semibold`}
                    >
                      {product.countInStock}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <ShinyButton
                  triggerGlow={shine}
                  className="flex-1 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                >
                  <div className="w-full flex flex-col items-center justify-center gap-1">
                    <span className="text-base font-semibold tracking-wide">
                      Add To Cart
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-white/80 font-normal">
                        Save{" "}
                        {discountCal == 0 && (
                          <span className="text-green-400 font-bold">
                            {" "}
                            {discount}
                          </span>
                        )}
                        {discountCal > 0 && (
                          <span className="text-green-400 font-bold">
                            {" "}
                            {formatPrice(discountCal)}
                          </span>
                        )}
                        {" now!!"}
                      </span>
                    )}
                  </div>
                </ShinyButton>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlistClick(e);
                  }}
                  className={`p-3 rounded-lg border transition-all ${
                    isInWishlist
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <ArrowLeftRight className="w-5 h-5" />
                </button>
              </div>

              {/* Product Details Grid */}
              {/* <div className="border-t pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">
                      Product ID:
                    </span>
                    <span className="ml-2 text-gray-600 font-mono text-xs">
                      {product._id}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Type:</span>
                    <span className="ml-2 text-gray-600">{product.type}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Featured:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {product.isFeatured ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Category:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {product.catName}
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ProductZoom;
