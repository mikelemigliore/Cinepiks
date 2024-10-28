import React, { useState } from "react";
import BigCard from "../cards/BigCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import SwiperNavButtons from "@/utils/swiperButtons";

interface BigCardProps {
  moviesBigCards: Array<{
    id: number;
    title: string;
    imgUrl: string;
    genres1: string;
    genres2: string;
    genres3: string;
    rated: string;
    time: string;
    description: string;
  }>;
}

function BigCardSwiper({ moviesBigCards }: BigCardProps) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80" //bottom-[3rem]
    >
      <div className="ml-2 mb-4 md:ml-[3.7vw] md:mb-[2vh] text-white text-[1.5vw] font-semibold">
        <h1>
          Popular
          <Link href="/search">
            <Button
              variant="ghost"
              className={`md:w-[7vw] ml-4 rounded-full text-[1vw] !bg-transparent hover:text-white 
          md:transition-all md:duration-500 md:ease-in-out md:transform
          ${
            showButtons
              ? "opacity-100 md:translate-x-0 visible"
              : "opacity-100 md:opacity-0 md:-translate-x-10 md:invisible"
          }
        `}
            >
              View All
              <SlArrowRight className="w-5 h-5 md:w-4 md:h-4 md:ml-[.5vw] " />
            </Button>
          </Link>
        </h1>
      </div>

      <Swiper
        speed={1000}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        slidesPerGroup={1}
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
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: -110,
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
        {moviesBigCards.map((moviesBigCard, index) => {
          // Define how to find the "8th" slide (partial one)
          const isPartialSlide =
            index === (activeIndex + 1) % moviesBigCards.length || // Next partial slide on the right
            index ===
              (activeIndex - 1 + moviesBigCards.length) % moviesBigCards.length; // Previous partial slide on the left

          const isLastOne = index === moviesBigCards.length - 1;

          return (
            <SwiperSlide className="pb-[8vh]" key={moviesBigCard.id}>
              <BigCard
                image={moviesBigCard.imgUrl}
                title={moviesBigCard.title}
                isPartialSlide={isPartialSlide}
                isLastOne={isLastOne}
                genres1={moviesBigCard.genres1}
                genres2={moviesBigCard.genres2}
                genres3={moviesBigCard.genres3}
                rated={moviesBigCard.rated}
                time={moviesBigCard.time}
                description={moviesBigCard.description}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />
    </div>
  );
}

export default BigCardSwiper;
