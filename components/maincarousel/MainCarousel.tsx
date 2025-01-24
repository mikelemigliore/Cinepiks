import React, { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MainCarouseulitem from "./MainCarouseulitem";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaProp {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  videoKey?: string;
  release_date?: string;
  overview?: string;
}

interface Props {
  medias: MediaProp[];
  title?: string;
  logInPage?: boolean;
  itemsGenres?: Array<{
    id: number;
    name: string;
  }>;
  mediaType: string;
  inTheatersLoading: boolean;
}

function MainCarousel({
  medias = [],
  title,
  logInPage,
  itemsGenres = [],
  mediaType,
  inTheatersLoading,
}: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = 10;
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalSlides, isTransitioning]);

  const formatDate = (date: string | undefined) => {
    if (date) {
      const [year, month, day] = date.split("-");
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    } else {
      return "Not Available";
    }
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-customColor h-[5vh] top-[53.1vh] z-20 md:h-[15vh] md:top-[90vh] md:z-40" />
      {inTheatersLoading ? (
        <div className="relative w-full h-screen flex justify-center items-center rounded-2xl">
          <Skeleton className="md:w-[10vw] md:h-[4vh] w-[40vw] h-[3vh] bg-backgroundButton rounded-2xl ml-[4vw] md:ml-[0vw] absolute top-[37vh] md:top-[30vh] left-[5%] md:left-[4%]" />
          <Skeleton className="md:w-[20vw] md:h-[6vh] w-[30vw] h-[4vh] bg-backgroundButton rounded-2xl ml-[4vw] md:ml-[0vw] absolute top-[41vh] md:top-[35vh] left-[5%] md:left-[4%]" />
          <Skeleton
            className={`${
              isDesktop
                ? `w-[35vw] h-[15vh] bg-backgroundButton rounded-2xl ml-[4vw] md:ml-[0vw] absolute top-[41vh] md:top-[42vh] left-[5%] md:left-[4%]`
                : ``
            }`}
          />
          <div className="ml-[4vw] md:ml-[0vw] absolute top-[47vh] md:top-[58vh] left-[5%] md:left-[4%] z-50 flex justify-center md:flex-row">
            <div className="mb-4 md:mb-0">
              <Skeleton className="h-[6vh] w-[30vw] bg-backgroundButton max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full mr-3" />
            </div>
            <div>
              <Skeleton
                className={`h-[6vh] w-[35vw] bg-backgroundButton max-w-[10rem] md:w-[8vw] md:h-[6vh] max-w-[15rem] rounded-full`}
              />
            </div>
          </div>
          <div>
            <Skeleton className="md:w-[20vw] md:h-[6vh] w-[60vw] h-[4vh] absolute bg-backgroundButton bottom-[40vh] md:bottom-[15vh] left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 rounded-2xl" />
          </div>
        </div>
      ) : (
        <Carousel
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          totalSlides={totalSlides}
        >
          <CarouselContent>
            {medias.slice(0, 10).map((media, index) => (
              <CarouselItem
                key={media.id}
                className="relative w-full h-screen flex justify-center items-center px-0 md:px-0"
              >
                <div>
                  <MainCarouseulitem
                    media={media}
                    index={index}
                    activeSlide={activeSlide}
                    setActiveSlide={setActiveSlide}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    isDesktop={isDesktop}
                    formatDate={formatDate}
                    mediaType={mediaType}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute bottom-[40vh] md:bottom-[17vh] left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`h-[1vh] md:h-[1.5vh] rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? "w-[5vw] md:w-[4vw] bg-white"
                    : "w-[2vw] md:w-[0.75vw] bg-gray-500"
                }`}
              />
            ))}
            <CarouselPrevious
              className=" mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 md:w-[2vw] w-[6vw]"
              onClick={handlePrev}
            />
            <CarouselNext
              className=" mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 md:w-[2vw] w-[6vw]"
              onClick={handleNext}
            />
          </div>
        </Carousel>
      )}
    </div>
  );
}

export default MainCarousel;
