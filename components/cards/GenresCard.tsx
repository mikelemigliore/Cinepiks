import React, { useEffect, useState } from "react";
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  return (
    <div className="relative">
      <Button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect()}
        className={`hover:scale-[1.03] transition-transform duration-300 bg-customServicesColor rounded-full w-[40vw] h-[40vw] md:w-[9vw] md:h-[9vw] text-[2vw] md:text-[1vw] font-bold hover:bg-white/90 hover:text-black 
              hover:font-bold transition-transform duration-300 ease-in-out active:scale-[0.99] ${
                isPartialSlide ? "opacity-50 pointer-events-none" : ""
              } ${isSelected ? "bg-white/90" : ""}`}
      >
        <div className="flex justify-center items-center absolute">
          {hovered || isSelected ? (
            <img
              src={iconBlack}
              className="md:w-[5vw] md:h-[5vw] w-[20vw] h-[20vw]"
            />
          ) : (
            <img
              src={iconWhite}
              className="md:w-[5vw] md:h-[5vw] w-[20vw] h-[20vw]"
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
