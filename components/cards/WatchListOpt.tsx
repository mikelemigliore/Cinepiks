// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { IoCheckmark } from "react-icons/io5";
// import { Cross2Icon } from "@radix-ui/react-icons";
// import { SlArrowRight } from "react-icons/sl";

// interface WatchListOptProp {
//   src: string;
//   watchlistOptions: boolean;
// }

// function WatchListOpt({ src, watchlistOptions }: WatchListOptProp) {
//   const [expand, setExpand] = useState(false);
//   const handleImageClick = (e: React.MouseEvent) => {
//     if (watchlistOptions) {
//       e.preventDefault(); // Prevent default click behavior
//       e.stopPropagation(); // Stop the click event from bubbling
//     }
//   };

//   const handleMouseEnter = () => {
//     setExpand(true);
//   };

//   const handleMouseLeave = () => {
//     setExpand(false);
//   };

//   return (
//     <div onClick={handleImageClick} className="relative">
//       <img
//         src={src}
//         className={`w-[30vw] md:w-[14vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
//           watchlistOptions ? "opacity-45 pointer-events-none" : ""
//         }`}
//       />

//       {/* Overlay to block clicks */}
//       {watchlistOptions && (
//         <div className="absolute inset-0 z-40 pointer-events-auto" />
//       )}

//       {watchlistOptions && (
//         <div className="absolute top-0 right-0 flex flex-col space-y-[0.5vw] p-[1vw] z-50">
//           {/* Example Buttons */}
//           <Button
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             className={`rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500`}
//           >
//             {expand ? (
//               <div>Watched</div>
//             ) : (
//               <IoCheckmark className={`w-[1.2vw] h-[1.2vw] ml-[0.5vw]`} />
//             )}
//           </Button>
//           <Button className="px-[1vw] py-[1.2vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ">
//             Remove
//             <Cross2Icon className={`w-[1.2vw] h-[1.2vw] ml-[0.5vw]`} />
//           </Button>
//           <Link href="/singlemovie">
//             <Button className="px-[1vw] py-[1.2vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 ">
//               View
//               <SlArrowRight className={`w-[1vw] h-[1vw] ml-[0.5vw]`} />
//             </Button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default WatchListOpt;

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SlArrowRight } from "react-icons/sl";

interface WatchListOptProp {
  src: string;
  watchlistOptions?: boolean;
  type?: string; // Define possible values
}

function WatchListOpt({ src, watchlistOptions, type }: WatchListOptProp) {
  const [expand, setExpand] = useState(false);
  const [expandRemove, setExpandRemove] = useState(false);
  const [expandView, setExpandView] = useState(false);

  const href = type === "movie" ? "/singlemovie" : "/singleseries"

  const handleImageClick = (e: React.MouseEvent) => {
    if (watchlistOptions) {
      e.preventDefault(); // Prevent default click behavior
      e.stopPropagation(); // Stop the click event from bubbling
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

  return (
    <div onClick={handleImageClick} className="relative">
      <img
        src={src}
        className={`w-[30vw] md:w-[14vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
          watchlistOptions ? "opacity-60 pointer-events-none" : ""
        }`}
      />

      {/* Overlay to block clicks */}
      {watchlistOptions && (
        <div className="absolute inset-0 z-40 pointer-events-auto" />
      )}

      {watchlistOptions && (
        <div className="absolute top-0 right-0 flex p-[1vw] z-50">
          {/* Watched Button with expand effect */}
          <Button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
      )}
    </div>
  );
}

export default WatchListOpt;
