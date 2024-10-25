import React from "react";

// Define the props type for DotsCarousel
interface DotsCarouselProps {
  totalSlides: number;
  activeSlide: number;
}

function DotsCarousel({ totalSlides, activeSlide }: DotsCarouselProps) {
  return (
    <div className="flex justify-center space-x-2 absolute z-50 border">
      {/* Creates an array with totalSlides number of elements. */}
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={`w-10 h-10 rounded-full bg-blue-500 ${
            index === activeSlide ? "bg-white" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default DotsCarousel;
