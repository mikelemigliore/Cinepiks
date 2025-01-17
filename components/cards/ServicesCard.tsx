// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { IoTvOutline, IoTv } from "react-icons/io5";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMasksTheater } from "@fortawesome/free-solid-svg-icons"; // Example icon

// interface ServicesCardProp {
//   title: string;
//   isPartialSlide: boolean;
//   activeIndex: number;
//   onSelect: () => void;
//   isSelected: boolean;
//   iconBlack: any;
//   iconWhite: any;
// }
// function ServicesCard({
//   title,
//   isPartialSlide,
//   activeIndex,
//   onSelect,
//   isSelected,
//   iconBlack,
//   iconWhite,
// }: ServicesCardProp) {
//   //const [isSelected, setIsSelected] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div className="relative">
//       <Button
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         onClick={() => onSelect()}
//         className={`bg-customServicesColor pt-[10rem] rounded-full w-[12rem] h-[12rem] text-2xl font-bold hover:bg-white/90 hover:text-black
//               hover:font-bold transition-transform duration-300 ease-in-out active:scale-95 ${
//                 isPartialSlide ? "opacity-50 pointer-events-none" : ""
//               } ${isSelected ? "bg-white/90" : ""}`}
//       >
//         {/* Center the icon within the button */}
//         <div className="flex justify-center items-center absolute mb-[10rem]">
//           {hovered || isSelected ? (
//             <img
//               src={iconBlack}
//               style={{
//                 width: "6rem",
//                 height: "6rem",
//               }}
//             />
//           ) : (
//             <img
//               src={iconWhite}
//               style={{
//                 width: "6rem",
//                 height: "6rem",
//               }}
//             />
//           )}
//         </div>
//         <h1 className="mt-[7rem] pointer-events-none text-white transform-none">
//           {title}
//         </h1>
//       </Button>
//     </div>
//   );
// }

// export default ServicesCard;
import React from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ServiceCardProp {
  title: string;
  isPartialSlide: boolean;
  activeIndex: number;
  onSelect: () => void;
  isSelected: boolean;
  img: any;
  logInPage?: boolean;
  id:number
}

function ServicesCard({
  isPartialSlide,
  title,
  activeIndex,
  onSelect,
  isSelected,
  img,
  logInPage,
  id
}: ServiceCardProp) {
  return (
    <div>
      {logInPage ? (
        <Dialog>
          <DialogTrigger
            className={`flex justify-center items-center hover:scale-105 transition-transform duration-300 bg-customServicesColor  rounded-3xl w-[45vw] md:w-[14vw] md:h-[9vw] h-[30vw] text-[2vw] md:text-[1.5vw] font-bold hover:bg-white/90 hover:text-black 
              hover:font-bold transition-transform duration-300 ease-in-out ${
                isPartialSlide ? "opacity-50 pointer-events-none" : ""
              } ${isSelected ? "bg-white/90" : "bg-customServicesColor"}`}
          >
            <img src={img} alt={title} className="w-[25vw] md:w-[8vw]" />
          </DialogTrigger>
          <DialogContent className="w-[93vw] md:w-[35vw] md:h-[23vw] h-[112vw] bg-customColorCard rounded-3xl">
            <div className="flex justify-center items-center">
              <img className="w-[40vw] h-[18vw] md:w-[17vw] md:h-[9vw] md:my-[2vw] my-[12vw]" src={img} />
            </div>

            {/* <div
              className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full h-[15vw] mt-[5vw]`}
            />
            <div
              className={`z-[10] absolute inset-0 bg-gradient-to-t from-customColorCard to-transparent w-full h-[15vw] mt-[5vw]`}
            /> */}

            <div className="md:ml-[1.5vw] ml-[4vw] md:mt-[-1.5vw] mt-[-6vw]">
              {/* <div className="flex justify-between relative z-[100]">
                <div>
                  <div className="flex mt-[1vh]">
                    <div className="text-[1.3vw] line-clamp-1">{title}</div>
                  </div>
                </div>
              </div> */}

              <div className="md:h-[5.5vw] mr-[1vw] md:mt-[1vw]">
                <div className=" text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
                  Although this website is not affiliated with any streaming
                  service and does not provide the ability to watch content
                  directly, it serves as a tool to explore content offered by
                  your favorite streaming services, keep track of movies and
                  series you've watched, and discover new titles to enjoy. Sign
                  up and start now.
                </div>
              </div>
              <div className="flex justify-end md:mt-[1.5vw] mt-[5vw] md:mr-[1vw] mr-[6vw] md:space-x-[0.5vw] space-x-[6vw]">
                <Link
                  href="/homepage"
                  className="flex justify-center items-center active:scale-95 md:w-[9vw] w-[40vw] md:h-[4.5vh] h-[6vh] rounded-full text-sm md:text-[0.8vw] text-[3.5vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-slate-300 hover:bg-opacity-20"
                >
                  Continue As Guest
                </Link>
                <Link
                  href="/singup"
                  className="flex justify-center items-center active:scale-95 md:w-[6vw] w-[40vw] md:h-[4.5vh] h-[6vh] rounded-full text-sm md:text-[0.8vw] text-[3.5vw] bg-white/70 hover:bg-white/90 text-black font-bold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div>
          <Button
            onClick={() => {
              onSelect(); // Handle selection
            }}
            onMouseDown={(e) => e.currentTarget.blur()} // Remove focus on click
            onTouchEnd={(e) => e.currentTarget.blur()} // Handle touch events for mobile
            className={`hover:scale-105 transition-transform duration-300 bg-customServicesColor pt-[19vh] rounded-3xl w-[45vw] md:w-[14vw] text-[2vw] md:text-[1.5vw] font-bold hover:bg-white/90 hover:text-black 
              hover:font-bold transition-transform duration-300 ease-in-out active:scale-95 ${
                isPartialSlide ? "opacity-50 pointer-events-none" : ""
              } ${isSelected ? "bg-white/90" : "bg-customServicesColor"}`}
          >
            <img
              src={img}
              alt={title}
              className="w-[25vw] md:w-[8vw] mb-[18vh]"
            />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ServicesCard;
