import React, { useState } from "react";
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

interface EpisodeCardProp {
  episodeNumber: number;
  title: string;
  duration: string;
  score: string;
  img: string;
  watched: boolean;
  onWatch: () => void;
}

function EpisodeCard({
  episodeNumber,
  title,
  duration,
  score,
  img,
  onWatch,
  watched,
}: EpisodeCardProp) {
  // const [watched, setWatched] = useState(false);

  return (
    <div className=" relative w-[18vw] h-[17vw] rounded-2xl">
      <img className="rounded-2xl shadow-lg" src={img}></img>
      <div className="absolute top-0 right-[1vw] md:ml-[1rem] md:mt-[1rem] z-[1010]">
        <Button
          onClick={onWatch}
          className={`flex items-center justify-center  w-[2vw] h-[2vw] rounded-full bg-opacity-35 border-none bg-slate-300  hover:bg-slate-300  hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
            watched ? "bg-white/90" : ""
          }`}
        >
          <IoCheckmark
            className={`w-[4vw] h-[4vw] min-w-[17px] min-h-[17px] ${
              watched ? "text-black" : ""
            }`}
          />
        </Button>
      </div>
      <div className="flex mt-[0.8vw] justify-between">
        <div className="flex">
          <div className="text-[1vw] mr-[0.5vw]">{episodeNumber}.</div>
          <div className="text-[1vw] line-clamp-1">{title}</div>
        </div>

        <div className="mr-[1vw]">
          <Dialog>
            <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[5vw] md:h-[3.8vh] rounded-full text-sm md:text-[0.7vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
              View
              <SlArrowRight className="w-[1.7vw] h-[1.7vh] md:ml-[0.4vw]" />
            </DialogTrigger>
            <DialogContent className=" md:w-[35vw] md:h-[30vw] bg-customColorCard rounded-full">
              <img className="rounded-3xl shadow-lg w-full" src={img} />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full h-[15vw] mt-[5vw]`}
              />
              <div
                className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full h-[15vw] mt-[5vw]`}
              />
              <div className="ml-[1.5vw] mt-[-1.5vw]">
                <div className="flex justify-between relative z-[100]">
                  <div>
                    <div className="flex mt-[1vh]">
                      <div className="text-[1.3vw] mr-[0.5vw]">
                        {episodeNumber}.
                      </div>
                      <div className="text-[1.3vw] line-clamp-1">{title}</div>
                    </div>
                    <div className="text-[0.8vw] text-customTextColor flex">
                      <div className="mr-[1.5vw]">Octorber 4, 2005</div>
                      <div>{duration}</div>
                    </div>
                  </div>

                  <div className="h-[1.7vw] w-[4vw] bg-backgroundButton  flex items-center justify-center pr-[0.4vw] rounded-full mr-[2vw] mt-[1.5vw]">
                    <GoStarFill className="w-[2.5vw] h-[2.5vh]" />
                    {score}
                  </div>
                </div>

                <ScrollArea className="h-[5.5vw] mr-[1vw] mt-[1vw]">
                  <div className=" text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
                    While scavenging the deep ends of a derelict space station,
                    a group of young space colonists come face to face with the
                    most terrifying life form in the universe. While scavenging
                    the deep ends of a derelict space station, a group of young
                    space While scavenging the deep ends of a derelict space
                    station, a group of young space colonists come face to face
                    with the most terrifying life form in the universe. While
                    scavenging the deep ends of a derelict space station, a
                    group of young space While scavenging the deep ends of a
                    derelict space station, a group of young space colonists
                    come face to face with the most terrifying life form in the
                    universe. While scavenging the deep ends of a derelict space
                    station, a group of young space While scavenging the deep
                    ends of a derelict space station, a group of young space
                    colonists come face to face with the most terrifying life
                    form in the universe. While scavenging the deep ends of a
                    derelict space station, a group of young space
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="text-[0.7vw] text-customTextColor">{duration}</div>
      <p className="mt-[0.5vh] text-white text-[0.8vw]  max-w-[23rem] md:max-w-[17vw] line-clamp-2">
        {" "}
        While scavenging the deep ends of a derelict space station, a group of
        young space colonists come face to face with the most terrifying life
        form in the universe. While scavenging the deep ends of a derelict space
        station, a group of young space
      </p>
    </div>
  );
}

export default EpisodeCard;
