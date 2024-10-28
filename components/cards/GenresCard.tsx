import React, { useState } from "react";
import { Button } from "../ui/button";

interface GenresCardProp {
  title: string;
  isPartialSlide: boolean;
  activeIndex: number;
  onSelect: () => void;
  isSelected: boolean;
  iconBlack: any;
  iconWhite: any;
}

function GenresCard({
  title,
  isPartialSlide,
  activeIndex,
  onSelect,
  isSelected,
  iconBlack,
  iconWhite,
}: GenresCardProp) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <Button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect()}
        className={`bg-customServicesColor rounded-full w-[30vw] h-[30vw] md:w-[9vw] md:h-[9vw] text-[2vw] md:text-[1vw] font-bold hover:bg-white/90 hover:text-black 
              hover:font-bold transition-transform duration-300 ease-in-out active:scale-95 ${
                isPartialSlide ? "opacity-50 pointer-events-none" : ""
              } ${isSelected ? "bg-white/90" : ""}`}
      >
        {/* Center the icon within the button */}
        <div className="flex justify-center items-center absolute">
          {hovered || isSelected ? (
            <img
              src={iconBlack}
              style={{
                width: "5vw",
                height: "5vw",
              }}
            />
          ) : (
            <img
              src={iconWhite}
              style={{
                width: "5vw",
                height: "5vw",
              }}
            />
          )}
        </div>
        <h1 className="mt-[26vh] pointer-events-none text-white transform-none">
          {title}
        </h1>
      </Button>
    </div>
  );
}

export default GenresCard;
