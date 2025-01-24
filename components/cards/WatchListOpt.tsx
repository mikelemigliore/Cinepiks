import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoCheckmark } from "react-icons/io5";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SlArrowRight } from "react-icons/sl";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
import { useDispatch } from "react-redux";
import handleWatchedBtn from "@/utils/handleWatchedBtn";
import { useRouter } from "next/navigation";

interface WatchListOptProp {
  src: string;
  watchlistOptions?: boolean;
  mediaType: string;
  id: number;
  isDesktop: boolean;
}

function WatchListOpt({
  src,
  watchlistOptions,
  mediaType,
  id,
  isDesktop,
}: WatchListOptProp) {
  const [expand, setExpand] = useState(false);
  const [expandRemove, setExpandRemove] = useState(false);
  const [expandView, setExpandView] = useState(false);
  const [isAdded, setIsAdded] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const href = mediaType === "movie" ? "/singlemovie" : "/singleseries";

  const handleImageClick = (e: React.MouseEvent) => {
    if (watchlistOptions) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseEnter = () => {
    setExpand(true);
  };

  const handleMouseLeave = () => {
    setExpand(false);
  };

  const handleMouseEnterRemove = () => {
    setExpandRemove(true);
  };

  const handleMouseLeaveRemove = () => {
    setExpandRemove(false);
  };

  const handleMouseEnterView = () => {
    setExpandView(true);
  };

  const handleMouseLeaveView = () => {
    setExpandView(false);
  };

  const handleAdded = async () => {
    handleWatchlistBtn(dispatch, setIsAdded, true, id, mediaType);
  };

  const handleWatched = async () => {
    handleWatchedBtn(dispatch, setIsAdded, false, id, mediaType);
    handleWatchlistBtn(dispatch, setIsAdded, true, id, mediaType);
  };

  return (
    <div onClick={handleImageClick} className="relative">
      <img
        src={src}
        className={`w-[46vw] md:w-[14vw] rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out pointer-events-none ${
          watchlistOptions || !isDesktop ? "opacity-60" : ""
        }`}
      />

      {watchlistOptions && (
        <div className="absolute inset-0 z-40 pointer-events-auto" />
      )}

      {watchlistOptions && isDesktop ? (
        <div className="absolute top-0 right-0 flex p-[1vw] z-50">
          <Button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleWatched}
            className={`flex items-center justify-center transition-all duration-300 rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl ${
              expand
                ? "px-[1vw] py-[1.2vw] hover:bg-white/90 hover:text-black active:scale-95"
                : "px-[0.7vw] py-[1.2vw]"
            }`}
          >
            {expand ? (
              <div className="flex">
                <span>Watched</span>
                <IoCheckmark className="w-[1.2vw] h-[1.2vw] ml-[1vw]" />
              </div>
            ) : (
              <IoCheckmark className="w-[1.2vw] h-[1.2vw]" />
            )}
          </Button>

          <div className="absolute top-0 right-0 flex p-[1vw] mt-[3vw] z-50">
            <Button
              onMouseEnter={handleMouseEnterRemove}
              onMouseLeave={handleMouseLeaveRemove}
              onClick={handleAdded}
              className={`flex items-center justify-center transition-all duration-300 rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl ${
                expandRemove
                  ? "px-[1vw] py-[1.2vw] hover:bg-white/90 hover:text-black active:scale-95"
                  : "px-[0.7vw] py-[1.2vw]"
              }`}
            >
              {expandRemove ? (
                <div className="flex">
                  <span>Remove</span>
                  <Cross2Icon className="w-[1.2vw] h-[1.2vw] ml-[1vw]" />
                </div>
              ) : (
                <Cross2Icon className="w-[1.2vw] h-[1.2vw]" />
              )}
            </Button>
          </div>

          <div className="absolute top-0 right-0 flex p-[1vw] mt-[6vw] z-50">
            <Button
              onClick={() => router.push(`${href}/${id}`)}
              onMouseEnter={handleMouseEnterView}
              onMouseLeave={handleMouseLeaveView}
              className={`flex items-center justify-center transition-all duration-300 rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl ${
                expandView
                  ? "px-[1vw] py-[1.2vw] hover:bg-white/90 hover:text-black active:scale-95"
                  : "px-[0.7vw] py-[1.2vw]"
              }`}
            >
              {expandView ? (
                <div className="flex">
                  <span>View</span>
                  <SlArrowRight className="w-[1.2vw] h-[1.2vw] ml-[1vw]" />
                </div>
              ) : (
                <SlArrowRight className="w-[1.2vw] h-[1.2vw]" />
              )}
            </Button>
          </div>
        </div>
      ) : !isDesktop ? (
        <div className="space-y-[5vh]">
          <div className="absolute bottom-[7vh] right-0 flex p-[1vw]  z-50">
            <Button
              onClick={handleWatched}
              className={`items-center justify-center transition-all duration-300 rounded-full bg-slate-300 bg-opacity-10 backdrop-blur-xl w-[12vw] h-[12vw] md:w-[11vw] md:h-[5vh] hover:bg-white/90 hover:text-black active:scale-95
              `}
            >
              <IoCheckmark className="w-[5vw] h-[5vh] md:w-[1vw] md:h-[1vw]" />
            </Button>
          </div>

          <div className="absolute bottom-0 right-0 flex p-[1vw]  z-50">
            <Button
              onClick={handleAdded}
              className={`flex items-center justify-center transition-all duration-300 rounded-full text-base md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl w-[12vw] h-[12vw] md:w-[11vw] md:h-[5vh] hover:bg-white/90 hover:text-black active:scale-95`}
            >
              <Cross2Icon className="w-[5vw] h-[5vh] md:w-[1vw] md:h-[1vw]" />
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default WatchListOpt;
