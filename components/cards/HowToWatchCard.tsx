import React from "react";
//import PerfectScrollbar from "react-perfect-scrollbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { AiFillLike } from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";
import Link from "next/link";

const howtowatch = [
  {
    id: 1,
    logo: "/genresIcons/Netflix_Symbol_RGB.png",
    platform: "Netflix",
    size: "h-[4vw] w-[3vw]",  // Custom size for Netflix logo
    rated: "R",
    runtime: "2h 36m",
    link: "https://www.netflix.com/browse",
  },
  {
    id: 2,
    logo: "/genresIcons/hulu-Green-digital.png",
    size: "h-[3vw] w-[2.5vw]",  // Custom size for Netflix logo
    platform: "Hulu",
    rated: "R",
    runtime: "2h 36m",
    link: "https://www.hulu.com/hub/home",
  },
  {
    id: 3,
    logo: "/genresIcons/pngaaa.com-650580.png",
    platform: "AppleTv",
    size: "h-[3vw] w-[2.5vw]",  // Custom size for Netflix logo
    rated: "R",
    runtime: "2h 36m",
    link: "https://tv.apple.com/",
  },
  {
    id: 4,
    platform: "Peacock",
    logo: "/genresIcons/Peacock-Emblem.png",
    size: "h-full w-full bg-white",  // Custom size for Netflix logo
    rated: "R",
    runtime: "2h 36m",
    link: "https://www.peacocktv.com/watch/home?orig_ref=https://www.google.com/",
  },
  {
    id: 5,
    platform: "Prime Video",
    logo: "/genresIcons/Amazon_Prime_Video_logo.svg.png",
    size: "h-full w-full bg-white border-white border-4",  // Custom size for Netflix logo
    rated: "R",
    runtime: "2h 36m",
    link: "https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root",
  },
  {
    id: 6,
    platform: "Disney+",
    logo: "/genresIcons/Disney+_2024.svg.png",
    size: "h-full w-[22vw] bg-white border-white border-4",  // Custom size for Netflix logo
    rated: "R",
    runtime: "2h 36m",
    link: "https://www.disneyplus.com/",
  },
  {
    id: 7,
    platform: "Paramount+",
    logo: "/genresIcons/paramount-seeklogo.svg",
    size: "h-full w-[15vw] bg-white border-white border-4",  // Custom size for Netflix logo
    rated: "R",
    runtime: "2h 36m",
    link: "https://www.paramountplus.com/?ds_rl=1289065&ftag=PPM-02-10aeg8j&vndid=google$null$null$paramount%20plu&gad_source=1&gclid=Cj0KCQjwsoe5BhDiARIsAOXVoUvkLMlmJK0rxcC08-BUlnfWf-WLEVNaU4fDTQHM7c-GEiet0c7dUu8aAsLPEALw_wcB&gclsrc=aw.ds",
  },
  {
    id: 8,
    platform: "Max",
    logo: "/genresIcons/20230413031451!Max_logo.svg",
    size: "h-full w-[22vw] bg-white border-white border-4",  // Custom size for Netflix logo
    rated: "R",
    runtime: "2h 36m",
    link: "https://www.max.com/",
  },
];

function HowToWatchCard() {
  return (
    <ScrollArea className="h-[21.5vw]">
      <div>
        {howtowatch.map((howtowatchItem) => (
          <div
            key={howtowatchItem.id}
            className="w-[34.5vw] h-[5vw] bg-buttonColor rounded-[1vw] mb-[0.4vw] mr-[1vw]"
          >
            <div className="flex h-full items-center gap-x-[1vw] mx-[1vw]">
              <div className="w-[18vw] h-[3.3vw] bg-black rounded-[1vw] flex items-center justify-center">
                {howtowatchItem.logo && (
                  <img
                    src={howtowatchItem.logo}
                    alt={`${howtowatchItem.platform} logo`}
                    className={`${howtowatchItem.size} object-contain rounded-[1vw]`}
                  />
                )}
              </div>
              <div className="w-full text-start text-[0.9vw]">
                Platform
                <div className="text-customTextColor text-[0.9vw]">
                  {howtowatchItem.platform}
                </div>
              </div>
              <div className="w-full text-start text-[0.9vw]">
                Rated
                <div className="text-customTextColor text-[0.9vw]">
                  {howtowatchItem.rated}
                </div>
              </div>
              <div className="w-full text-start text-[0.9vw]">
                Runtime
                <div className="text-customTextColor text-[0.9vw]">
                  {howtowatchItem.runtime}
                </div>
              </div>
              <div className="flex h-full items-center">
                <Link
                  href={howtowatchItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="flex justify-center items-center h-10 w-28 md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                    Watch
                    <CiPlay1 className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default HowToWatchCard;
