import React, { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "@/components/ui/button";

interface SwiperNavButtonsProps {
  swiper: any; // Type can be improved if you have the swiper types
  showButtons: boolean; // Pass down the visibility state as a prop
}

function SwiperNavButtons({ swiper, showButtons }: SwiperNavButtonsProps) {
  const [isFirst, setFirst] = useState(true); // For tracking if it's the first slide
  const [isLast, setIsLast] = useState(false); // For tracking if it's the last slide

  // Hook to update the state when the swiper instance or the active slide changes
  useEffect(() => {
    if (swiper) {
      // Set initial state based on Swiper's current state
      setFirst(swiper.isBeginning);//Swiper has a built-in property called isBeginning, which is true if the current slide is the first slide
      setIsLast(swiper.isEnd);//Similarly, isEnd is a Swiper property that is true if the current slide is the last slide

      // Listen to the slide change event
      //Here, you are using Swiper's built-in event listener (on) to listen for the slideChange event. This event is triggered every time the user navigates to a 
      //different slide (either by clicking the arrows or using swiping gestures).
      // swiper.on('slideChange', callback): This listens for the slideChange event, and when it happens, the callback function is executed.
      // Callback Function: Inside the callback, you update the state again by calling:
      // setIsBeginning(swiper.isBeginning): Updates whether the current slide is the first one.
      //setIsEnd(swiper.isEnd): Updates whether the current slide is the last one
      swiper.on('slideChange', () => {
        setFirst(swiper.isBeginning);
        setIsLast(swiper.isEnd);
      });
    }
  }, [swiper]);//The hook will run whenever the swiper dependency changes

  return (
    <div className=''>
      {/* Conditionally render the right button if it's not the last slide */}
      {!isLast && showButtons && (
        <Button
          onClick={() => swiper?.slideNext()}
          variant="ghost"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 !bg-transparent hover:text-white text-white/70 border-none"
        >
          <SlArrowRight className="w-9 h-9" />
        </Button>
      )}

      {/* Conditionally render the left button if it's not the first slide */}
      {!isFirst && showButtons && (
        <Button
          onClick={() => swiper?.slidePrev()}
          variant="ghost"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 !bg-transparent hover:text-white text-white/70 border-none"
        >
          <SlArrowLeft className="w-9 h-9" />
        </Button>
      )}
    </div>
  );
}

export default SwiperNavButtons;