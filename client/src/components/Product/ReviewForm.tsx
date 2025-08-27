import React, { useState } from "react";
import { Rating } from "@mui/material";
import { Button } from "../ui/button";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api/Api";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

interface ReviewFormProps {
  productID: string;
  onReviewSubmitted?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productID,
  onReviewSubmitted,
}) => {
  const [reviewData, setReviewData] = useState({
    review: "",
    customerRating: 0,
  });
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setReviewData((prev) => ({
      ...prev,
      customerRating: value || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!user) return;

    const formPayload = {
      customerId: user.id,
      customerName: user.name,
      review: reviewData.review,
      customerRating: reviewData.customerRating,
      productId: productID,
    };

    if (!formPayload.review || formPayload.customerRating <= 0) {
      setLoading(false);
      return;
    }

    try {
      const result = await postData<typeof formPayload>(
        "/api/productReviews/add",
        formPayload
      );

      if (!result) {        
        toast.error("Failed to submit review. Please try again!");
        throw new Error("Failed to submit review");
      }
      setLoading(false);
      toast.success(
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600 w-5 h-5" />
          <span className="text-black font-semibold">
            Review submitted successfully!
          </span>
        </div>
      );

      // Reset form
      setReviewData({ review: "", customerRating: 0 });

      // Refresh reviews list if provided
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      setLoading(false);
      toast.error("Error submitting review. Please try again!");
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="relative col-md-10">
      <form className="reviewForm" onSubmit={handleSubmit}>
        <h4 className="mt-8 text-2xl font-bold text-gray-800 mb-6">
          Add a review
        </h4>

        <div className="form-group my-4">
          <textarea
            className="form-control w-[70%] p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-app-main"
            placeholder="Write a Review"
            name="review"
            onChange={handleInputChange}
            value={reviewData.review}
            rows={6}
            disabled={!user}
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <div className="flex items-center gap-3">
            <Rating
              name="customerRating"
              value={reviewData.customerRating}
              precision={0.5}
              onChange={handleRatingChange}
              readOnly={!user}
            />
            <span className="text-gray-500 text-lg font-medium">
              ({reviewData.customerRating.toFixed(1)})
            </span>
          </div>
        </div>

        <div className="form-group mt-6">
          <Button
            type="submit"
            className="text-lg bg-header-catbtn hover:bg-header-catbtnhover text-white font-semibold w-fit py-6 px-6 rounded-full transition-colors duration-200 flex items-center gap-2"
            disabled={!user || loading}>
            <span>{loading ? "Submitting..." : "Submit Review"}</span>
          </Button>
        </div>
      </form>

      {!user && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
          <p className="text-gray-700 text-lg font-medium mb-4">
            You must be logged in to write a review.
          </p>
          <Button
            onClick={() => navigate("/sign-in")}
            className="text-lg bg-header-catbtn hover:bg-header-catbtnhover text-white font-semibold w-fit py-6 px-6 rounded-full transition-colors duration-200 flex items-center gap-2"
          >
            Login to Review
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
