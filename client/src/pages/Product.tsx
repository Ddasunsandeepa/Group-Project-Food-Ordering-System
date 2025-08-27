import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ArrowLeftRight,
  Minus,
  Plus,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/UserContext";
import { deleteData, fetchDataFromApi, postData } from "@/api/Api";
import ShinyButton from "../components/Commons/ShinyButton";
import { Product as ProductType } from "../types";
import { formatPrice, truncateText } from "../utils/helpers";
import ProductSkeleton from "../components/Product/ProductSkeleton";
import RenderStars from "../components/Commons/RenderStars";
import ProductReviewSection from "../components/Product/ProductReviewSection";
import RelatedProducts from "../components/Product/RelatedProducts";
import RecentlyVisitedProducts from "../components/Product/RecentlyVisitedProducts";
import { useCart } from "../contexts/CartContext";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shine, setShine] = useState(false);
  const [discountCal, setDiscountCal] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const { favorites, refreshFavorites } = useFavorites();
  const { user } = useUser();
  const { addToCart } = useCart();

  useEffect(() => {
    // console.log("Scrolling to top because product id changed:", id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchDataFromApi<ProductType>(`/api/products/${id}`);
        if (data) {
          setProduct(data);
          setSelectedSize(data.size?.[0] || "");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const isInWishlist = favorites.some((fav) => fav.productId === id);
  const isInStock = product?.countInStock.toLowerCase() === "in stock";

  const triggerFromOtherComponent = () => {
    setShine(true);
    setTimeout(() => setShine(false), 1200);
  };

  const discountPercentage = product?.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product?.discount || 0;

  const hasDiscount = discountPercentage > 0;

  const updateDiscountCalculationUP = () => {
    if (product?.oldPrice && product.price) {
      const discountAmount = product.oldPrice - product.price;
      setDiscountCal(discountAmount * (quantity + 1));
    }
  };

  const updateDiscountCalculationDOWN = () => {
    if (product?.oldPrice && product.price) {
      const discountAmount = product.oldPrice - product.price;
      setDiscountCal(discountAmount * (quantity - 1));
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

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    if (isInWishlist) {
      try {
        await deleteData(`/api/myList/${product._id}`);
        toast.success("Item removed from wishlist!");
        refreshFavorites();
      } catch {
        toast.error("Failed to remove item. Please try again!");
      }
    } else {
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
      } catch {
        toast.error("An error occurred.");
      }
    }
  };

  if (loading) return <ProductSkeleton />;
  if (error || !product)
    return (
      <div className="p-10 text-red-500">{error || "Product not found"}</div>
    );

  const discount =
    hasDiscount && product.oldPrice
      ? ` ${formatPrice(product.oldPrice - product.price)}`
      : "";

  const catLink = `/categories/${product.category._id}`;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex flex-col justify-start items-start">
      <div className="bg-white w-full lg:w-[90%] mx-auto p-2 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Images */}
          <div className="space-y-4 lg:col-span-1">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square group">
              <img
                src={
                  product.images[selectedImage] ||
                  "https://via.placeholder.com/600"
                }
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-400 ease-in-out group-hover:scale-125"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discountPercentage}%
                </div>
              )}
            </div>
            {product.images.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                      selectedImage === i
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-14 lg:col-span-3 lg:pl-12 lg:pt-2 ">
            <div className="flex flex-col space-y-4">
              <div className="space-y-1 flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-normal text-gray-500">
                    Category :
                  </span>
                  <Link
                    to={catLink}
                    className="py-1 rounded-full text-sm font-semibold text-gray-700 hover:text-blue-700"
                  >
                    {product.category.name}
                  </Link>
                  {product.rating > 0 && (
                    <div className="flex items-center">
                      <RenderStars rating={product.rating} />
                      <span className="ml-4 text-gray-600 text-sm">
                        ({product.rating})
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {product.oldPrice && (
                  <span className="text-base text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-xl text-red-500 font-bold">
                  {formatPrice(product.price)}
                </span>
              </div>
              <span
                className={`text-sm lg:w-fit rounded-full px-3 py-2 font-normal ${
                  isInStock
                    ? "text-green-600 bg-green-100"
                    : "text-orange-600 bg-red-100"
                }`}
              >
                {product.countInStock}
              </span>
              <div className="mb-10">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {truncateText(product.description, 150)}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-9">
              {/* Size */}
              {product.size.length > 0 && (
                <div className="flex items-center space-x-8 w-full">
                  <h3 className="text-sm font-normal text-gray-600">Size</h3>
                  <div className="flex gap-3">
                    {product.size.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedSize(s);
                          triggerFromOtherComponent();
                        }}
                        className={`px-6 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          selectedSize === s
                            ? "bg-header-catbtn text-white border-header-catbtn"
                            : "border-gray-500 text-gray-700 hover:border-gray-400 bg-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Quantity & Add to Cart Section */}
              <div className="flex flex-row justify-start items-center gap-6 w-full">
                {/* Quantity Controls */}
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        triggerFromOtherComponent();
                        updateDiscountCalculationDOWN();
                        setQuantity(quantity - 1);
                      }
                    }}
                    className="p-3 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-700" />
                  </button>
                  <span className="w-12 text-center text-base font-medium text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      triggerFromOtherComponent();
                      updateDiscountCalculationUP();
                      setQuantity(quantity + 1);
                    }}
                    className="p-3 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                {/* Add to Cart Button */}
                <ShinyButton
                  onClick={handleAddToCart}
                  triggerGlow={shine}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="text-sm font-semibold">Add To Cart</span>
                    </div>
                    {hasDiscount && (
                      <span className="text-sm text-white/80">
                        Save{" "}
                        {discountCal === 0 ? (
                          <span className="text-green-300 font-bold">
                            {discount}
                          </span>
                        ) : (
                          <span className="text-green-300 font-bold">
                            {formatPrice(discountCal)}
                          </span>
                        )}
                        {" now!!"}
                      </span>
                    )}
                  </div>
                </ShinyButton>
                {/* Action Buttons */}
                <button
                  onClick={handleWishlistClick}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isInWishlist
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
                  />
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <ArrowLeftRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReviewSection product={product} />
      <RelatedProducts categoryId={product.category._id} />
      <RecentlyVisitedProducts />
    </div>
  );
};

export default Product;
