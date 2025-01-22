import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoStarFill, GoUnmute } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";
import { Button } from "../ui/button";
import { IoCheckmark } from "react-icons/io5";
import handleSeasonBtn from "@/utils/handleSeasonBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import { useGetSeasonQuery } from "@/app/features/season/seasonSlice";
import { setSeasonData } from "@/app/features/dbSlice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface EpisodeCardProp {
  episodeNumber: number;
  title: string;
  duration: string;
  score: string;
  img: string;
  watched: boolean;
  onWatch: () => void;
  description: string;
  date: string;
  selectedSeason: number;
  Id: number;
  isDesktop: boolean;
  //progressValue: number;
}

function EpisodeCard({
  episodeNumber,
  title,
  duration,
  score,
  img,
  onWatch,
  watched,
  description,
  date,
  selectedSeason,
  Id,
  isDesktop,
}: // progressValue,
//handleSeason,
EpisodeCardProp) {
  const [isWatched, setIsWatched] = useState(false);
  const [episodeWatched, setEpisodeWatched] = useState(true);
  const dispatch = useDispatch();

  // const episodeWatched = false

  const seasondb = useSelector((state: RootState) => state.content.season);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (seasondb?.length > 0) {
        const data = seasondb.filter((item) => item.seriesId === Id);
        const res =
          data
            .filter((item) => item.seasonNumber === selectedSeason)
            ?.flatMap((item) => item.episodes) || [];

        setIsWatched(res.some((ep: any) => ep.episodeNumber === episodeNumber));
      }
    };

    fetchMovieDetails();
  }, [seasondb, selectedSeason, Id, episodeNumber]);

  const formatDate = (date: string | undefined) => {
    if (date) {
      // Extract only the date part (before the 'T')
      const datePart = date.split("T")[0];
      const [year, month, day] = datePart.split("-");

      // Lookup table for month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Convert the month number to a month name
      const monthName = monthNames[parseInt(month, 10) - 1];

      // Remove leading zeros from the day
      const formattedDay = parseInt(day, 10);

      // Format the final string
      const formattedDate = `${monthName} ${formattedDay}, ${year}`;
      return formattedDate;
    } else {
      return "Not Available";
    }
  };

  const handleSeason = () => {
    //const episodeValue = progressValue; // ✅ Ensure episodeValue is defined correctly
    // setEpisodeWatched(true)
    handleSeasonBtn(
      dispatch,
      selectedSeason,
      episodeNumber,
      Id,
      isWatched,
      episodeWatched
    );
  };

  const handleClick = () => {
    onWatch();
    handleSeason();
  };

  return (
    <div className=" relative md:w-[18vw] w-[75vw] md:h-[17vw] h-[70vw] rounded-2xl">
      <img className="rounded-2xl shadow-lg" src={img}></img>
      <div className="absolute top-0 md:right-[1vw] right-[5vw] md:ml-[1rem] md:mt-[1rem] mt-[1rem] z-[1010]">
        <Button
          onClick={() => handleClick()}
          className={`flex items-center justify-center  md:w-[2vw] md:h-[2vw] w-[10vw] h-[10vw] rounded-full bg-opacity-35 border-none bg-slate-300  hover:bg-slate-300  hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
            isWatched ? "bg-white/90" : ""
          }`}
        >
          <IoCheckmark
            className={`w-[4vw] h-[4vw] min-w-[17px] min-h-[17px] ${
              isWatched ? "text-black" : ""
            }`}
          />
        </Button>
      </div>
      <div className="flex md:mt-[0.8vw] justify-between  mt-[3vw]">
        <div className="flex">
          <div className="md:text-[1vw] text-[4vw] mr-[0.5vw]">
            {episodeNumber}.
          </div>
          <div className="md:text-[1vw] text-[4vw] line-clamp-1">{title}</div>
        </div>

        <div className="mr-[1vw]">
          <Dialog>
            <DialogTrigger className="flex justify-center items-center h-[4vh] w-[20vw] md:pl-[0.4vw] md:w-[5vw] md:h-[3.8vh] rounded-full text-sm md:text-[0.7vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
              View
              <SlArrowRight className="w-[1.7vw] h-[1.7vh] md:ml-[0.4vw] ml-[3vw]" />
            </DialogTrigger>
            <DialogContent className=" md:w-[35vw] md:h-[30vw]  h-[52vh] bg-customColorCard rounded-2xl">
              <VisuallyHidden>
                <DialogTitle></DialogTitle>
              </VisuallyHidden>
              <img className="rounded-3xl shadow-lg w-full" src={img} />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full md:h-[15vw] md:mt-[5vw] h-[30vw] mt-[27vw]`}
              />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full md:h-[15vw] md:mt-[5vw] h-[30vw] mt-[27vw]`}
              />
              <div className="md:ml-[1.5vw] md:mt-[-1.5vw] ml-[3vw] mt-[-3vw]">
                <div className="flex justify-between relative z-[100]">
                  <div>
                    <div className="flex mt-[1vh]">
                      <div className="md:text-[1.3vw] text-[4vw] mr-[0.5vw]">
                        {episodeNumber}.
                      </div>
                      <div className="md:text-[1.3vw] text-[4vw] line-clamp-1">
                        {title}
                      </div>
                    </div>
                    <div className="md:text-[0.8vw] text-[3vw] text-customTextColor flex">
                      <div className="mr-[1.5vw]">{formatDate(date)}</div>
                      <div>{duration}</div>
                    </div>
                  </div>

                  <div className="md:h-[1.7vw] md:w-[4vw] h-[9vw] w-[20vw] bg-backgroundButton  flex items-center justify-center pr-[0.4vw] rounded-full md:mr-[2vw] mr-[6vw] mt-[1.5vw]">
                    <GoStarFill className="md:w-[2.5vw] md:h-[2.5vh] w-[5vw] h-[5vh] md:mr-[0vw] mr-[2vw]" />
                    {score}
                  </div>
                </div>

                <ScrollArea className="md:h-[5.5vw] h-[70vh] mr-[1vw] mt-[1vw]">
                  <div className=" text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
                    {description}
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="md:text-[0.7vw] text-[3vw] text-customTextColor">
        {duration}
      </div>
      <p className="mt-[0.5vh] text-white md:text-[0.8vw] text-[3.5vw]  max-w-[23rem] md:max-w-[17vw] line-clamp-2">
        {" "}
        {description}
      </p>
    </div>
  );
}

export default EpisodeCard;
