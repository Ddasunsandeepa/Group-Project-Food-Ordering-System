"use client";

import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "@/contexts/ProductContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tag,
  Grid3X3,
  Palette,
  DollarSign,
  Package,
  Star,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { formatPrice } from "@/utils/helpers";
import RenderStars from "@/utils/RenderStars";
import { ProductDetailActions } from "@/components/products/ViewActionBar";
import ProductReviewSection from "@/components/products/ProductReviewSection";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProductContext();
  const navigate = useNavigate();

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="p-6 text-gray-200 bg-gray-950 min-h-screen">
        <h2 className="text-xl font-semibold">Product not found</h2>
      </div>
    );
  }

  // ✅ define handlers here
  const handleEdit = () => navigate(`/dashboard/products/${product._id}/edit`);
  const handleDelete = () => console.log("Delete", product._id);

  return (
    <ProductDetails
      product={product}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

interface ProductDetailsProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductDetails({
  product,
  onEdit,
  onDelete,
}: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const generateTags = () => {
    const tags = [product.catName, product.type];
    if (product.isFeatured) tags.push("featured");
    if (product.discount && product.discount > 0) tags.push("special");
    return tags.filter(Boolean);
  };

  const stockStatus = product.countInStock; // "In Stock" or "Out Of Stock"
  const inStock = stockStatus.toLowerCase() === "in stock";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Product Gallery */}
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-gray-700">
                {product.images[selectedImageIndex] ? (
                  <img
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-gray-500" />
                  </div>
                )}
                {product.isFeatured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-600 text-white">NEW</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {product.isFeatured && index === 0 && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            {product.name}
          </h1>

          {/* Info grid */}
          <div className="space-y-4">
            <InfoRow
              icon={<Grid3X3 className="w-5 h-5 text-gray-400" />}
              label="Category"
              value={product.category.name}
            />
            <InfoRow
              icon={<Palette className="w-5 h-5 text-gray-400" />}
              label="Type"
              value={product.type}
            />
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Tag className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-medium">Tags</span>
              </div>
              <span className="text-gray-300">:</span>
              <div className="flex flex-wrap gap-2">
                {generateTags().map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-gray-700 text-gray-200 hover:bg-gray-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {/* Price & stock */}
            <InfoRow
              icon={<DollarSign className="w-5 h-5 text-gray-400" />}
              label="Price"
              value={formatPrice(product.price)}
            />
            <InfoRow
              icon={<Package className="w-5 h-5 text-gray-400" />}
              label="Stock"
              value={
                <Badge
                  variant={inStock ? "default" : "destructive"}
                  className={
                    inStock
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }
                >
                  {stockStatus}
                </Badge>
              }
            />
            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Star className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-medium">Review</span>
              </div>
              <span className="text-gray-300">:</span>
              <div className="flex items-center gap-2">
                <RenderStars rating={product.rating} />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-medium">Description</span>
              </div>
              <span className="text-gray-300">:</span>
              <p className="text-gray-200 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
          {/* actions now work */}
          <ProductDetailActions onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
      <ProductReviewSection product={product} />
    </div>
  );
}

// Small reusable component
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 flex-shrink-0">
        {icon}
        <span className="text-gray-400 font-medium">{label}</span>
      </div>
      <span className="text-gray-300">:</span>
      <span className="text-gray-200">{value}</span>
    </div>
  );
}
