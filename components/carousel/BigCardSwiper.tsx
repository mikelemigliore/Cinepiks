import React, { useState } from "react";
import BigCard from "../cards/BigCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperNavButtons from "@/utils/swiperButtons";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemsBigCardsProp {
  id: number;
  type?: string;
  title: string;
  name?: string;
  poster_path: string;
  showType: string;
  backdrop_path: string;
  genre_ids: number[];
  description: string;
  imdb_id?: string;
}

interface BigCardProps {
  itemBigCards: ItemsBigCardsProp[];
  mediaType: string;
  isLoading?: boolean;
}

function BigCardSwiper({ itemBigCards, mediaType, isLoading }: BigCardProps) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const href = mediaType === "movie" ? "singlemovie" : "singleseries";

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80"
    >
      <div className="ml-2 mb-4 md:ml-[3.7vw] md:mb-[2vh] text-white md:text-[1.5vw] text-[5vw] font-semibold">
        {mediaType === "movie" ? (
          <h1>Popular Movies</h1>
        ) : (
          <h1>Popular Series</h1>
        )}
      </div>

      {itemBigCards.length > 0 ? (
        <Swiper
          speed={1000}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={-5}
          loop={false}
          pagination={{ clickable: true }}
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
            1024: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: -110,
            },
          }}
        >
          {itemBigCards.slice(0, 5).map((itemBigCard, index) => {
            const isPartialSlide =
              index === (activeIndex + 1) % 5 ||
              index === (activeIndex - 1 + 5) % 5;

            const isLastOne = index === 4;
            console.log(mediaType === "series" ? itemBigCard : "");

            return (
              <SwiperSlide className="pb-[8vh]" key={itemBigCard.id}>
                <BigCard
                  id={itemBigCard.id}
                  isPartialSlide={isPartialSlide}
                  isLastOne={isLastOne}
                  seriesImdbId={itemBigCard.imdb_id}
                  mediaType={mediaType === "series" ? "tv" : "movie"}
                  href={href}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Skeleton className="w-[96vw] md:w-[90vw] h-[74vh] md:h-[71vh] bg-backgroundButton rounded-2xl ml-2 md:ml-[3.5vw]" />
      )}

      <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />
    </div>
  );
}

export default BigCardSwiper;
