import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SimpleSwiperProps } from "../../types";

const SimpleSwiper: React.FC<SimpleSwiperProps> = ({
  children,
  slidesPerView,
  spaceBetween,
  autoplay,
  autoplayDelay = 3000,
  loading,
  error,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const maxSlide = Math.max(0, totalSlides - slidesPerView);

  // Autoplay
  useEffect(() => {
    if (!autoplay || totalSlides <= slidesPerView || loading || error) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, maxSlide, totalSlides, slidesPerView, loading, error]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const translatePercentage = (currentSlide * 100) / slidesPerView;
  // console.log("loop >",totalSlides,slidesPerView)
  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center">
        {totalSlides > slidesPerView && currentSlide != 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${translatePercentage}%)`,
              width: `${(totalSlides * 100) / slidesPerView}%`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{
                  width: `${100 / totalSlides}%`,
                  paddingRight: index < slides.length - 1 ? `${spaceBetween}px` : "0",
                }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {totalSlides > slidesPerView && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleSwiper;