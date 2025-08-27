import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import CategoryModule from "@/contexts/CategoryContext";

const { CategoryContext } = CategoryModule;

const FeaturedCategories = () => {
  const { categories, loading, error } = useContext(CategoryContext);

  // Featured category names
  const featuredCategoryNames = ["Pizza", "Meal", "Drinks", "Dessert", "Combo"];

  const offerString =
    "Do not miss the current offers until the end of November";

  // Filter only featured categories
  const featuredCategories = categories.filter((cat) =>
    featuredCategoryNames.includes(cat.name.trim())
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-6">
      {/* Header */}
      <div className="flex flex-col items-center sm:items-start justify-start gap-2 w-full">
        <h3 className="text-base md:text-2xl font-bold text-gray-700">
          FEATURED CATEGORIES
        </h3>
        <p className="text-sm md:text-base font-normal text-gray-500">{offerString}</p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2 md:gap-4 w-full p-2 md:p-4">
        {loading || error
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div
                className="h-40 flex flex-col justify-start items-start gap-y-2 bg-white rounded-xl shadow-md"
                key={idx}
              >
                <Skeleton className="w-full h-[60%] rounded-xl" />
                <div className="flex flex-col justify-start items-start gap-y-2">
                  <Skeleton className="h-5 w-[80%] rounded-xl" />
                  <Skeleton className="h-4 w-[40%] rounded-xl" />
                </div>
              </div>
            ))
          : featuredCategories.map((cat) => (
              <Link
                to={`/categories/${cat._id}`}
                key={cat._id}
                className="block"
              >
                <Card className="hover:shadow-lg min-w-12 transition-transform hover:scale-[1.02]">
                  <CardContent
                    className="p-3 flex flex-col items-center justify-center gap-4"
                    style={{ backgroundColor: cat.color || "#f4f4f4" }}
                  >
                    <img
                      src={cat.images?.[0]}
                      alt={cat.name}
                      className="hidden app-xs:inline-block w-full h-[60%] object-cover rounded-md"
                    />
                    <h4 className="text-sm font-semibold text-gray-700 text-center">
                      {cat.name}
                    </h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
