import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "../cards/MovieCard";
import SwiperNavButtons from "@/utils/swiperButtons";
import { useState } from "react";
import "swiper/css/pagination";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  medias?: Array<{
    id: number;
    title: string;
    name?: string;
    poster_path: string;
    showType: string;
    backdrop_path: string;
    genre_ids: number[];
  }>;
  title?: string;
  mediaType: string;
  logInPage?: boolean;
  itemsGenres?: Array<{
    id: number;
    name: string;
  }>;
  description: string;
  serviceId?: number;
  isLoading?: boolean;
}

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  isLoading,
}: Props) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleReload = () => {
    if (serviceId) {
      const queryParams = new URLSearchParams({
        type: mediaType === "movie" ? "movie" : "series",
        servicesParam: JSON.stringify([serviceId]), // Hulu 15 , Prime 119
      });
      window.location.href = `/search?${queryParams.toString()}`;
    } else {
      const queryParams = new URLSearchParams({
        type: mediaType === "movie" ? "movie" : "series",
        customParam: description,
      });

      window.location.href = `/search?${queryParams.toString()}`;
    }
  };

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80"
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
              <Button
                variant="ghost"
                onClick={(e) => {
                  if (onClick) onClick(e);
                  handleReload();
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
            </div>
          )}
        </h1>
      </div>

      <div className="lg:ml-[2.5vw] lg:mr-[3vw] md:ml-[-3vw] md:mr-[12vw] mb-[5vh] md:mb-[0vh]">
        {medias.length > 0 ? (
          <>
            <Swiper
              speed={1000}
              modules={[Navigation, Pagination]}
              slidesPerView={2}
              slidesPerGroup={2}
              spaceBetween={-5}
              loop={false}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              breakpoints={{
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
              }}
            >
              {medias.map((media, index) => {
                const isPartialSlide =
                  index === (activeIndex + 7) % medias.length ||
                  index === (activeIndex - 1 + medias.length) % medias.length;

                const isLastThreeSlides =
                  (index >= (activeIndex + 6) % medias.length &&
                    index <= (activeIndex + 7) % medias.length) ||
                  (index >= (activeIndex - 3 + medias.length) % medias.length &&
                    index <= (activeIndex - 1 + medias.length) % medias.length);

                const isLastOne = index === medias.length - 1;

                return (
                  <SwiperSlide className="md:pb-[8vh] pb-[6vh]" key={index}>
                    <MovieCard
                      logInPage={logInPage}
                      type={mediaType === "series" ? "tv" : "movie"}
                      imgBackdrop={media.backdrop_path}
                      imgUrl={media.poster_path}
                      genre={media.genre_ids}
                      title={media.title}
                      name={media.name}
                      itemsGenres={itemsGenres}
                      id={media.id}
                      isPartialSlide={isPartialSlide}
                      isLastThreeSlides={isLastThreeSlides}
                      isLastOne={isLastOne}
                      isLoading={isLoading}
                      className=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <SwiperNavButtons
              swiper={swiperInstance}
              showButtons={showButtons}
            />
          </>
        ) : (
          <Swiper
            speed={1000}
            modules={[Navigation, Pagination]}
            slidesPerView={2}
            slidesPerGroup={2}
            spaceBetween={-5}
            loop={false}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            breakpoints={{
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
            }}
          >
            {Array.from({ length: 7 }).map((_, index) => {
              return (
                <SwiperSlide
                  key={`skeleton-${index}`}
                  className="md:pb-[8vh] pb-[6vh]"
                >
                  <Skeleton className="w-[46vw] h-[33vh] bg-backgroundButton md:h-[40vh] md:w-[12.6vw] rounded-3xl ml-[3vw] md:ml-[0vw]" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
      {/* )} */}
    </div>
  );
}

export default MovieSwiper;
