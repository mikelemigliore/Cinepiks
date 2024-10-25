"use client"
import Container from "@/components/global/Container";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TeaserCard from "./TeaserCard";

interface MovieCardProps {
  imgUrl: string;
  title: string;
  className?: string; // Optional className prop
  isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
  isLastThreeSlides?: boolean;
  isLastOne?:boolean;
}

function MovieCard({
  imgUrl,
  title,
  isPartialSlide,
  isLastThreeSlides,
  isLastOne
}: MovieCardProps) {
  const [expandCard, setExpandCard] = useState(false);
  //const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  //const [activeCard, setActiveCard] = useState<string | null>(null); // Track active card

  // const handleActiveCard = () =>{
  //   setActiveCard(true)
  // }

  const handleMouseEnter = () => {
    hoveredRef.current = true;
    setTimeout(() => {
      if (hoveredRef.current) setExpandCard(true);
    }, 1500);
  };
  
  const handleMouseLeave = () => {
    hoveredRef.current = false;
    setExpandCard(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if the card is expanded or a button is clicked
    if (expandCard) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <Container
        className={`flex justify-center items-center transition-opacity duration-700 ease-in-out ${
          isPartialSlide ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Link href="/singlemovie" passHref>
          <div
            className="relative"
            onClick={handleClick} // Handle click event for conditional navigation
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Poster Image */}
            <img
              src={imgUrl}
              className={`w-[12rem] rounded-xl md:w-[16.5rem] md:rounded-3xl shadow-lg transition-opacity duration-500 ease-in-out ${
                expandCard ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* TeaserCard */}
            <div
              className={`absolute inset-0 md:w-[16.5rem] transition-all duration-500 ease-in-out transform ${
                expandCard ? "opacity-100 z-10 cursor-default" : "opacity-0 z-0"
              }`}
            >
              <TeaserCard
                title={title}
                imgUrl={imgUrl}
                isLastThreeSlides={isLastThreeSlides}
                isLastOne={isLastOne}
              />
            </div>
          </div>
          <h1 className="pt-4 font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
            {title}
          </h1>
        </Link>
      </Container>
    </div>
  );
}

export default MovieCard;









// import Container from "@/components/global/Container";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import TeaserCard from "./TeaserCard";

// interface MovieCardProps {
//   imgUrl: string;
//   title: string;
//   className?: string; // Optional className prop
//   isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
//   isLastThreeSlides: boolean;
//   isLastOne:boolean;
// }

// function MovieCard({
//   imgUrl,
//   title,
//   isPartialSlide,
//   isLastThreeSlides,
//   isLastOne
// }: MovieCardProps) {
//   const [expandCard, setExpandCard] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   //const [activeCard, setActiveCard] = useState<string | null>(null); // Track active card

//   // const handleActiveCard = () =>{
//   //   setActiveCard(true)
//   // }

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (hovered) {
//       timer = setTimeout(() => {
//         setExpandCard(true);
//       }, 700); // Trigger the expansion after 700ms
//     } else {
//       setExpandCard(false); // Immediately collapse the card when the cursor leaves
//     }

//     return () => clearTimeout(timer); // Cleanup the timer on unmount or hover state change
//   }, [hovered]);

//   const handleClick = (e: React.MouseEvent) => {
//     // Prevent navigation if the card is expanded or a button is clicked
//     if (expandCard) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <div className="relative">
//       <Container
//         className={`flex justify-center items-center transition-opacity duration-700 ease-in-out ${
//           isPartialSlide ? "opacity-50 pointer-events-none" : ""
//         }`}
//       >
//         <Link href="/singlemovie" passHref>
//           <div
//             className="relative"
//             onClick={handleClick} // Handle click event for conditional navigation
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//           >
//             {/* Poster Image */}
//             <img
//               src={imgUrl}
//               className={`w-[12rem] rounded-xl md:w-[16.5rem] md:rounded-3xl shadow-lg transition-opacity duration-500 ease-in-out ${
//                 expandCard ? "opacity-0" : "opacity-100"
//               }`}
//             />

//             {/* TeaserCard */}
//             <div
//               className={`absolute inset-0 md:w-[16.5rem] transition-all duration-500 ease-in-out transform ${
//                 expandCard ? "opacity-100 z-10 cursor-default" : "opacity-0 z-0"
//               }`}
//             >
//               <TeaserCard
//                 title={title}
//                 imgUrl={imgUrl}
//                 isLastThreeSlides={isLastThreeSlides}
//                 isLastOne={isLastOne}
//               />
//             </div>
//           </div>
//           <h1 className="pt-4 font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
//             {title}
//           </h1>
//         </Link>
//       </Container>
//     </div>
//   );
// }

// export default MovieCard;
