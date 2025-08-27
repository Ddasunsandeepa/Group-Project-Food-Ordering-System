import React from "react";
import { Review } from "../../types";
import RenderStars from "../Commons/RenderStars";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const userInitial = review.customerName.split("")[0].toUpperCase();

  return (
    <div className="bg-black/30 rounded-2xl drop-shadow-lg border-2 flex flex-col justify-between border-gray-200 p-6 w-full">
      <div className="flex flex-col items-start justify-start mb-4">
        <div className="flex flex-row justify-start items-center gap-2">
          <RenderStars rating={review.customerRating} />
          <span className="text-white/80 font-semibold">({review.customerRating})</span>
        </div>
        <p className="text-white text-base leading-relaxed mb-6 font-normal pt-4 max-w-[90%]">
          {review.review}
        </p>
      </div>

      {(review._id || review.customerName) && (
        <div className="bg-gradient-to-r from-app-main/80 to-orange-500/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-row justify-start items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={""} alt={review._id} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <span className="text-white font-semibold text-lg">
                {review.customerName || "Anonymous"}
              </span>
            </div>

            {/* Helpful buttons */}
            <div className="flex flex-col items-end justify-center gap-2 pr-4">
              <span className="text-sm font-light text-white">Was this Helpful?</span>
              <div className="flex items-center gap-4 text-white/90 text-sm font-semibold">
                <button
                  aria-label="Thumbs up"
                  className="hover:text-white transition-colors"
                >
                  <FaThumbsUp className="h-3 w-3" />
                </button>
                <button
                  aria-label="Thumbs down"
                  className="hover:text-white transition-colors"
                >
                  <FaThumbsDown className="h-3 w-3"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
