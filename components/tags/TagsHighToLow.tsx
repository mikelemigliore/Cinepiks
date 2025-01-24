import React from "react";
import { Button } from "../ui/button";

interface TagsHowToWatchProp {
  hightolow: boolean;
  lowtohigh: boolean;
  handleHightolow: () => void;
  handleLowtohigh: () => void;
}

function TagsHowToWatch({
  hightolow,
  lowtohigh,
  handleHightolow,
  handleLowtohigh,
}: TagsHowToWatchProp) {

  return (
    <div className="flex transition-transform duration-700 ease-in-out">
      <div className="flex">
        <Button
          onClick={handleHightolow}
          className={`md:px-[1vw] md:h-[4.5vh] px-[3vw] h-[5vh]  bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] mr-[1.5vw] text-[4vw] md:text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
            hightolow ? "bg-white/90 text-black " : ""
          }`}
        >
          High To Low
        </Button>
        <Button
          onClick={handleLowtohigh}
          className={`md:px-[1vw] md:h-[4.5vh] px-[3vw] h-[5vh]  bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] mr-[1.5vw] text-[4vw] md:text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
            lowtohigh ? "bg-white/90 text-black" : ""
          }`}
        >
          Low To High
        </Button>
      </div>
    </div>
  );
}

export default TagsHowToWatch;
