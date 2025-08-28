"use client";

import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, Plus, X, Tag, Image as ImageIcon, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryModule from "../contexts/CategoryContext";
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
          <img src={src} alt="Category" className="w-full h-full object-cover" onError={() => setImageError(true)} />
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

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  const predefinedColors = [
    "#fca5a5", "#fdba74", "#fde68a", "#86efac", "#93c5fd",
    "#c4b5fd", "#f9a8d4", "#67e8f9", "#d9f99d", "#fcd34d"
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-12 h-10 p-1 bg-gray-800 border-gray-700 rounded cursor-pointer" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-gray-800 border-gray-700 text-white focus:border-blue-500"
          placeholder="#000000"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {predefinedColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-full border-2 ${value === color ? "border-white" : "border-gray-600"} hover:scale-110 transition-transform`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CategoryAddPage() {
  const { refetch } = useContext(CategoryContext);
  const navigate = useNavigate();
  const { admin } = useAdminUser();

  const hasPermission = (perm: Permission) => admin?.permissions?.includes(perm);

  useEffect(() => {
    if (!hasPermission("write")) {
      navigate("/");
      toast.error("You do not have permission to add categories.");
    }
  }, [admin, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#93c5fd",
    images: [] as string[],
  });

  const [newImage, setNewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string) => setFormData((prev) => ({ ...prev, color }));

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, newImage.trim()] }));
      setNewImage("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/category/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create category");

      const data = await res.json();
      toast.success(`Category "${data.name}" created successfully.`);
      setFormData({ name: "", description: "", color: "#93c5fd", images: [] });
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasPermission("view")) return null;

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Category</h1>
            <p className="text-sm text-gray-400">Enter category details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Tag className="w-5 h-5" /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Category Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-800 border-gray-700 text-white focus:border-blue-500" placeholder="Enter category name" />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Input id="description" name="description" value={formData.description} onChange={handleChange} className="bg-gray-800 border-gray-700 text-white focus:border-blue-500" placeholder="Enter category description" />
              </div>
            </CardContent>
          </Card>

          {/* Color */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Palette className="w-5 h-5" /> Color Theme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="color" className="text-gray-300 mb-3 block">Category Color</Label>
              <ColorPicker value={formData.color} onChange={handleColorChange} />
              <div className="mt-3 p-3 rounded-lg border border-gray-700 bg-gray-800">
                <p className="text-sm text-gray-400 mb-2">Preview:</p>
                <div className="w-full h-12 rounded-lg flex items-center justify-center text-white font-medium" style={{ backgroundColor: formData.color }}>
                  {formData.name || "Category Name"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> Category Images
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 ml-2">{formData.images.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.images.map((img, idx) => <ImageItem key={idx} src={img} onRemove={() => handleRemoveImage(idx)} />)}
                </div>
              )}
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex gap-2">
                <Input value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="Enter image URL" className="bg-gray-800 border-gray-700 text-white focus:border-blue-500" />
                <Button type="button" onClick={handleAddImage} disabled={!newImage.trim()}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-orange-400 hover:bg-orange-500 min-w-[120px]">
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2"><Save className="w-4 h-4" /> Save Category</div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
