"use client";

import React, { useMemo } from "react";
import { Review } from "../../types";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewsTabProps {
  productID: string;
  reviews: Review[];
  loading: boolean;
  onReviewSubmitted: () => void;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews, loading }) => {
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (
      reviews.reduce((acc, r) => acc + (r.customerRating || 0), 0) /
      reviews.length
    ).toFixed(1);
  }, [reviews]);

  if (loading) {
    return <p className="text-gray-400">Loading reviews...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Analytics */}
      <div className="flex items-center gap-4">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-5 h-5",
                i < Math.round(Number(avgRating)) ? "fill-yellow-400" : "text-gray-600"
              )}
            />
          ))}
        </div>
        <span className="text-gray-200 font-semibold">{avgRating}/5</span>
        <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
      </div>

      {/* Reviews list */}
      <div className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <Card
              key={review._id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-200 font-medium">{review.customerName}</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < (review.customerRating || 0)
                          ? "fill-yellow-400"
                          : "text-gray-600"
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm">{review.review}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
