"use client";

import React, { useContext, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import CategoryModule from "../contexts/CategoryContext";
import {
  Save,
  ArrowLeft,
  Plus,
  X,
  Package,
  DollarSign,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "@/contexts/ProductContext";
import { Product } from "@/types";
import { toast } from "sonner";
import { Permission, useAdminUser } from "@/contexts/AdminUserContext";

const { CategoryContext } = CategoryModule;

interface ImageItemProps {
  src: string;
  onRemove: () => void;
}

function ImageItem({ src, onRemove }: ImageItemProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative group">
      <div className="aspect-video w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        {!imageError ? (
          <img
            src={src}
            alt="Product image"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-500" />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>
      <p className="text-xs text-gray-400 mt-1 truncate" title={src}>
        {src}
      </p>
    </div>
  );
}

export default function ProductEditPage() {
  const { categories } = useContext(CategoryContext);
  const { products, fetchProducts } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product | null>(null);
  const [newImage, setNewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { admin } = useAdminUser();

  const hasPermission = (perm: Permission) => {
    return admin?.permissions?.includes(perm);
  };

  useEffect(() => {
    if (!hasPermission("write")) {
      navigate("/");
      toast.error("You do not have permission to edit products.");
    }
  }, [admin, navigate]);

  // Load product from context by param
  useEffect(() => {
    if (products && id) {
      const prod = products.find((p) => p._id === id);
      if (prod) setFormData({ ...prod });
    }
  }, [products, id]);

  if (!formData)
    return <p className="text-white text-center mt-10">Loading product...</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleAddImage = () => {
    if (newImage.trim() && formData) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()],
      });
      setNewImage("");
    }
  };

  const handleRemoveImage = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        images: formData.images.filter((_, i) => i !== index),
      });
    }
  };

  const handleAddSize = (size: string) => {
    if (!formData) return;
    if (formData.size.includes(size)) return;
    setFormData({ ...formData, size: [...formData.size, size] });
  };

  const handleRemoveSize = (size: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      size: formData.size.filter((s) => s !== size),
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find((c) => c._id === e.target.value);
    if (selected && formData) {
      setFormData({ ...formData, category: selected, catName: selected.name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/products/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // sends the entire formData
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to update product");

      console.log("Product updated:", data.product);
      toast.success(`${data.product.name} updated successfully.`);

      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Product</h1>
              <p className="text-sm text-gray-400">
                Update product information and settings
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
            ID: {formData._id}
          </Badge>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Package className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                    placeholder="Enter product description"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={formData.category._id}
                    onChange={handleCategoryChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="type" className="text-gray-300">
                    Type
                  </Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portion Sizes */}
          <Card className="bg-gray-900 text-white border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                Portion Sizes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {["Small", "Medium", "Large"].map((size) => (
                  <Button
                    key={size}
                    type="button"
                    onClick={() => handleAddSize(size)}
                    disabled={formData.size.includes(size)}
                    className="bg-gray-700 text-white hover:bg-gray-600"
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {formData.size.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.size.map((s) => (
                    <Badge
                      key={s}
                      className="bg-orange-400 text-white flex items-center gap-1"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(s)}
                        className="ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing & Stock
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price" className="text-gray-300">
                    Current Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="oldPrice" className="text-gray-300">
                    Original Price
                  </Label>
                  <Input
                    id="oldPrice"
                    name="oldPrice"
                    type="number"
                    step="0.01"
                    value={formData.oldPrice || ""}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="countInStock" className="text-gray-300">
                    Stock Status
                  </Label>
                  <select
                    id="countInStock"
                    name="countInStock"
                    value={formData.countInStock} // now this will be "In Stock" or "Out of Stock"
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Product Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <Label className="text-gray-300 font-medium">
                    Featured Product
                  </Label>
                  <p className="text-sm text-gray-400">
                    Show this product in featured sections
                  </p>
                </div>
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("isFeatured", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Product Images
                <Badge
                  variant="secondary"
                  className="bg-gray-800 text-gray-300 ml-2"
                >
                  {formData.images.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.images.map((img, index) => (
                    <ImageItem
                      key={index}
                      src={img}
                      onRemove={() => handleRemoveImage(index)}
                    />
                  ))}
                </div>
              )}
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex gap-2">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Enter image URL"
                  className="bg-gray-800 border-gray-700 text-white focus:border-blue-500"
                />
                <Button
                  type="button"
                  onClick={handleAddImage}
                  disabled={!newImage.trim()}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-400 hover:bg-orange-400 min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
