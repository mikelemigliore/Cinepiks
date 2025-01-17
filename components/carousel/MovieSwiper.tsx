import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "../cards/MovieCard";
import SwiperNavButtons from "@/utils/swiperButtons";
import { useEffect, useState } from "react";
import "swiper/css/pagination"; // Import Swiper pagination styles
import { Button } from "../ui/button";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

interface Props {
  //tmdbId?:number[];
  //image?: string[];
  medias?: Array<{
    id: number;
    //image: string;
    title: string;
    name?: string;
    poster_path: string;
    showType: string;
    backdrop_path: string;
    genre_ids: number[];
  }>;
  //mediaRapid?: MediaRapid[];
  title?: string;
  mediaType: string; // this line was commented
  logInPage?: boolean;
  itemsGenres?: Array<{
    id: number;
    name: string;
  }>;
  //getGenreNames: () => void;
  description: string;
  serviceId?: number;
}

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function MovieSwiper({
  medias = [],
  title,
  logInPage,
  itemsGenres = [],
  mediaType,
  onClick,
  description,
  serviceId,
}: //image = [],
//tmdbId = []
// mediaRapid = [],
Props) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleReload = () => {
    // Serialize the medias array and store it in sessionStorage
    //sessionStorage.setItem("movieData", JSON.stringify(medias));
    if (serviceId) {
      // Define the query parameters
      const queryParams = new URLSearchParams({
        type: mediaType === "movie" ? "movie" : "series",
        servicesParam: JSON.stringify([serviceId]), // Hulu 15 , Prime 119
      });
      // Navigate to the search page with query parameters
      window.location.href = `/search?${queryParams.toString()}`;
    } else {
      // Define the query parameters
      const queryParams = new URLSearchParams({
        type: mediaType === "movie" ? "movie" : "series",
        customParam: description, // Add your custom parameter here
      });

      // Navigate to the search page with query parameters
      window.location.href = `/search?${queryParams.toString()}`;
    }
  };

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80" //bottom-[3rem]
    >
      <div className="ml-2 mb-4 md:ml-[3.7vw] md:mb-[2vh] text-white md:text-[1.5vw] text-[5vw] font-semibold">
        <h1 className="flex">
          <div>{title}</div>
          {logInPage ||
          title === "More Like This" ||
          title === "Recomendations" ? (
            <div></div>
          ) : (
            <div>
              {/* <Link href="/search"> */}
              <Button
                variant="ghost"
                onClick={(e) => {
                  if (onClick) onClick(e); // Call the passed onClick handler if provided
                  handleReload(); // Reload the page
                }}
                className={`md:w-[7vw] ml-4 rounded-full md:text-[1vw] text-[3vw] !bg-transparent hover:text-white 
          md:transition-all md:duration-500 md:ease-in-out md:transform
          ${
            showButtons
              ? "opacity-100 md:translate-x-0 visible"
              : "opacity-100 md:opacity-0 md:-translate-x-10 md:invisible"
          }
        `}
              >
                View All
                <SlArrowRight className="w-4 h-4 md:w-4 md:h-4 md:ml-[.5vw] ml-[2vw]" />
              </Button>
              {/* </Link> */}
            </div>
          )}
        </h1>
      </div>

      <div className="lg:ml-[2.5vw] lg:mr-[3vw] md:ml-[-3vw] md:mr-[12vw] mb-[5vh] md:mb-[0vh]">
        {medias.length > 0 ? (
          <Swiper
            speed={1000}
            modules={[Navigation, Pagination]}
            slidesPerView={2}
            slidesPerGroup={2}
            spaceBetween={-5}
            loop={false} // Ensure loop is enabled
            pagination={{ clickable: true }} // Add pagination with clickable dots
            //The onSwiper callback is a function that gets called once Swiper is ready and fully set up. It gives you access to the Swiper instance
            // (which is like Swiper's control panel). This instance allows you to use its built-in methods, like moving to the next or previous slide.
            //Think of the Swiper instance like a remote control for your TV. Once your TV is turned on (initialized), you can use the remote to change the channel (move between slides).
            //By doing the onSwiper, we are updating the state, giving it the "remote control" to the next and prev buttons. Thats is why they work only with state
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            breakpoints={{
              // when window width is >= 640px
              1024: {
                slidesPerView: 7,
                slidesPerGroup: 7,
                spaceBetween: -5,
              },
              768: {
                slidesPerView: 6,
                slidesPerGroup: 6,
                spaceBetween: -70,
              },
              // // when window width is >= 768px
              // 768: {
              //   slidesPerView: 3,
              //   slidesPerGroup: 3,
              //   spaceBetween: 20,
              // },
              // when window width is >= 1024px
              // 1024: {
              //   slidesPerView: 7,
              //   slidesPerGroup: 7,
              //   spaceBetween: -110,
              // },
            }}
          >
            {medias.map((media, index) => {
              // Define how to find the "8th" slide (partial one)

              //console.log(description === "newMoviesOnNetflix" ? media: "");

              const isPartialSlide =
                index === (activeIndex + 7) % medias.length || // Next partial slide on the right
                index === (activeIndex - 1 + medias.length) % medias.length; // Previous partial slide on the left

              const isLastThreeSlides =
                (index >= (activeIndex + 6) % medias.length &&
                  index <= (activeIndex + 7) % medias.length) || // Next partial slides on the right
                (index >= (activeIndex - 3 + medias.length) % medias.length &&
                  index <= (activeIndex - 1 + medias.length) % medias.length); // Previous partial slides on the left

              const isLastOne = index === medias.length - 1;

              return (
                <SwiperSlide className="md:pb-[8vh] pb-[6vh]" key={media.id}>
                  <MovieCard
                    logInPage={logInPage}
                    type={mediaType}
                    // type={media.showType}
                    imgBackdrop={media.backdrop_path}
                    imgUrl={media.poster_path}
                    //image={image[0]}
                    genre={media.genre_ids}
                    title={media.title}
                    name={media.name}
                    itemsGenres={itemsGenres}
                    id={media.id}
                    //tmdbId={tmdbId}
                    //getGenreNames={getGenreNames}
                    isPartialSlide={isPartialSlide}
                    isLastThreeSlides={isLastThreeSlides}
                    isLastOne={isLastOne}
                    className="" // Apply negative margin
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <h1>Loading...</h1>
        )}

        {/* Pass the swiper instance to the SwiperNavButtons allowing the navigation buttons inside that component to control the Swiper (e.g., move to the next or previous slide) */}
        <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />
      </div>
    </div>
  );
}

export default MovieSwiper;
