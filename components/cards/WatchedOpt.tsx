import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SlArrowRight } from "react-icons/sl";
import StarRating from "../starRating/StarRating";
import handleWatchedBtn from "@/utils/handleWatchedBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";

const watchedItem = [
  {
    id: 1,
    type: "movie",
    title: "Deadpool & Wolverine",
    imgUrl:
      "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
  },
];

interface WatchedOptProp {
  src: string;
  watchlistOptions?: boolean;
  mediaType: string; // Define possible values
  watchedOptions?: boolean;
  id: number;
}

function WatchedOpt({
  src,
  watchlistOptions,
  mediaType,
  watchedOptions,
  id,
}: WatchedOptProp) {
  const [expand, setExpand] = useState(false);
  const [expandRemove, setExpandRemove] = useState(false);
  const [expandView, setExpandView] = useState(false);
  const [scores, setScores] = useState<Record<number, number | null>>({});
  const [isAdded, setIsAdded] = useState(true);
  const [value, setValue] = React.useState<number>(0);

  const dispatch = useDispatch();

  const href = mediaType === "movie" ? "/singlemovie" : "/singleseries";

  const scoredb = useSelector((state: RootState) => state.content.score);

  useEffect(() => {
    const Score = scoredb.map((score) => score.id).includes(id);

    if (Score) {
      const res = scoredb.filter((item: any) => {
        return item.id === id;
      });
      console.log("RES", res);

      setValue(res[0].score);
    } else {
      setValue(0);
    }
  }, [id]); // Run only once when the component mounts or id changes

  const handleImageClick = (e: React.MouseEvent) => {
    if (watchedOptions) {
      e.preventDefault(); // Prevent default click behavior
      e.stopPropagation(); // Stop the click event from bubbling
    }
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

  const handleScoreChange = (movieId: number, newValue: number | null) => {
    setScores((prevScores) => ({
      ...prevScores,
      [movieId]: newValue,
    }));
  };

  const handleWatched = () => {
    handleWatchedBtn(dispatch, setIsAdded, isAdded, id, mediaType);
  };

  return (
    <div onClick={handleImageClick} className="relative">
      <img
        src={src}
        className={`w-[46vw] md:w-[14vw] rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
          watchedOptions ? "opacity-45 pointer-events-none" : ""
        }`}
      />

      {/* Overlay to block clicks */}
      {watchedOptions && (
        <div className="absolute inset-0 z-40 pointer-events-auto" />
      )}

      {watchedOptions && (
        <div>
          <div className="absolute top-0 right-0 flex p-[1vw] z-50">
            {/* Watched Button with expand effect */}

            <div className="absolute top-0 right-0 flex p-[1vw] z-50">
              <Button
                onMouseEnter={handleMouseEnterRemove}
                onMouseLeave={handleMouseLeaveRemove}
                onClick={() => handleWatched()}
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

            <div className="absolute top-0 right-0 flex p-[1vw] mt-[3vw] z-50">
              <Link href={href}>
                <Button
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
              </Link>
            </div>
          </div>
          <div className="absolute flex bottom-0 left-0 p-[1vw]">
            <img
              className="w-[2vw] h-[2vw]"
              src="genresIcons/icons8-star.svg"
            />
            <div className="font-bold text-[1vw] flex items-end ml-[0.5vw]">
              {`${value === 0 ? "--" : value} / 5`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchedOpt;
