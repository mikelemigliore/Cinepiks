import React from "react";
import { Button } from "../ui/button";


interface SelectedFilterProp{
  all: boolean;
  buy: boolean;
  rent: boolean;
  subscription: boolean;
}
interface TagsHowToWatchProp {
  selectedFilters:SelectedFilterProp
  toggleFilter:(filter: keyof SelectedFilterProp)=> void
}

function TagsHowToWatch({
  selectedFilters,
  toggleFilter,
}: TagsHowToWatchProp) {

  return (
    <div className="flex transition-transform duration-700 ease-in-out">
        <div className="flex">
          <Button
            onClick={() =>toggleFilter("all")}
            className={`md:px-[1vw] md:h-[4.5vh] px-[3vw] h-[5vh] bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] mr-[1.5vw] text-[4vw] md:text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              selectedFilters.all ? "bg-white/90 text-black " : ""
            }`}
          >
            All
          </Button>
          <Button
            onClick={() =>toggleFilter("subscription")}
            className={`md:px-[1vw] md:h-[4.5vh] px-[3vw] h-[5vh] bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] mr-[1.5vw] text-[4vw] md:text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              selectedFilters.subscription ? "bg-white/90 text-black" : ""
            }`}
          >
            Subscription
          </Button>
          <Button
            onClick={() =>toggleFilter("rent")}
            className={`md:px-[1vw] md:h-[4.5vh] px-[3vw] h-[5vh] bg-customServicesColor rounded-full flex justify-center items-center md:mr-[0.5vw] mr-[1.5vw] text-[4vw] md:text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              selectedFilters.rent ? "bg-white/90 text-black " : ""
            }`}
          >
            Rent
          </Button>
          <Button
            onClick={() =>toggleFilter("buy")}
            className={`md:px-[1vw] md:h-[4.5vh] px-[3vw] h-[5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[1vw] text-[4vw] md:text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              selectedFilters.buy ? "bg-white/90 text-black" : ""
            }`}
          >
            Buy
          </Button>
        </div>
    </div>
  );
}

export default TagsHowToWatch;










