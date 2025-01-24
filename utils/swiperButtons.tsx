import React, { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "@/components/ui/button";

interface SwiperNavButtonsProps {
  swiper: any;
  showButtons: boolean;
}

function SwiperNavButtons({ swiper, showButtons }: SwiperNavButtonsProps) {
  const [isFirst, setFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    if (swiper) {
      setFirst(swiper.isBeginning);
      setIsLast(swiper.isEnd);

      swiper.on("slideChange", () => {
        setFirst(swiper.isBeginning);
        setIsLast(swiper.isEnd);
      });
    }
  }, [swiper]);

  return (
    <div className="">
      {!isLast && showButtons && (
        <Button
          onClick={() => swiper?.slideNext()}
          variant="ghost"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 !bg-transparent hover:text-white text-white/70 border-none hidden md:block"
        >
          <SlArrowRight className="w-9 h-9" />
        </Button>
      )}

      {!isFirst && showButtons && (
        <Button
          onClick={() => swiper?.slidePrev()}
          variant="ghost"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 !bg-transparent hover:text-white text-white/70 border-none hidden md:block"
        >
          <SlArrowLeft className="w-9 h-9" />
        </Button>
      )}
    </div>
  );
}

export default SwiperNavButtons;
