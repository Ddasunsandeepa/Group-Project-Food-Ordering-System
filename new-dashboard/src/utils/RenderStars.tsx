import React from "react";
import { Star } from "lucide-react"; // Replace with your own icon if needed

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, className = "" }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= max; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-app-main fill-app-main" />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <div key={i} className="relative w-5 h-5">
          <Star className="w-5 h-5 text-gray-300 absolute" />
          <Star className="w-5 h-5 text-orange-400 fill-orange-400 absolute clip-half" />
        </div>
      );
    } else {
      stars.push(
        <Star key={i} className="w-5 h-5 text-gray-300" />
      );
    }
  }

  return <div className={`flex gap-1 ${className}`}>{stars}</div>;
};

export default StarRating;
