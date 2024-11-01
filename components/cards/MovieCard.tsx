"use client";
import Container from "@/components/global/Container";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import TeaserCard from "./TeaserCard";

interface MovieCardProps {
  imgUrl: string;
  title?: string;
  className?: string; // Optional className prop
  isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
  isLastThreeSlides?: boolean;
  isLastOne?: boolean;
  list?: boolean;
  singlemovie?:boolean
  type?: string; // Define possible values
}

function MovieCard({
  imgUrl,
  title,
  isPartialSlide,
  isLastThreeSlides,
  isLastOne,
  list,
  singlemovie,
  type
}: MovieCardProps) {
  const [expandCard, setExpandCard] = useState(false);
  //const [showContent, setShowContent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Track if the view is desktop
  //const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  //const [activeCard, setActiveCard] = useState<string | null>(null); // Track active card

  // const handleActiveCard = () =>{
  //   setActiveCard(true)
  // }
  const href =
  type === "movie" ? `/singlemovie` : `/singleseries`;


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Set true for desktop view
    };

    handleResize(); // Check the initial screen size

    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (isDesktop && !list && !singlemovie) {
      //setShowContent(true);
      hoveredRef.current = true;
      setTimeout(() => {
        if (hoveredRef.current) setExpandCard(true);
      }, 1500);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      //setShowContent(false);
      hoveredRef.current = false;
      setExpandCard(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if the card is expanded or a button is clicked
    if (expandCard) {
      e.preventDefault();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Container
        className={`flex justify-center items-center transition-opacity duration-700 ease-in-out ${
          isPartialSlide ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Link href={href} passHref>
          <div
            className="relative"
            onClick={handleClick} // Handle click event for conditional navigation
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            {/* Poster Image */}
            {list ? (
              <img
                src={imgUrl}
                className={`w-[30vw] md:w-[14vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out`}
              />
            ) : singlemovie ? (
                <img
                  src={imgUrl}
                  className={`w-[30vw] md:w-[17vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out`}
                />
            ): (
              <img
                src={imgUrl}
                className={`w-[30vw] md:w-[12.6vw] md:rounded-2xl shadow-lg transition-opacity duration-500 ease-in-out ${
                  expandCard ? "opacity-0" : "opacity-100"
                }`}
              />
            )}

            {/* TeaserCard */}
            <div
              className={`absolute inset-0 md:w-[16.5rem] transition-all duration-500 ease-in-out transform ${
                expandCard ? "opacity-100 z-10 cursor-default" : "opacity-0 z-0"
              }`}
            >
              <TeaserCard
              href={href}
                title={title}
                imgUrl={imgUrl}
                isLastThreeSlides={isLastThreeSlides}
                isLastOne={isLastOne}
                expandCard={expandCard}
                //showContent={showContent}
                isDesktop={isDesktop}
              />
            </div>
          </div>
          <h1 className="pt-4 text-[0.8vw] font-semibold overflow-hidden overflow-ellipsis line-clamp-1">
            {title}
          </h1>
        </Link>
      </Container>
    </div>
  );
}

export default MovieCard;