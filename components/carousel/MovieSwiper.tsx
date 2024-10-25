import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "../cards/MovieCard";
import SwiperNavButtons from "@/utils/swiperButtons";
import { useState } from "react";
import "swiper/css/pagination"; // Import Swiper pagination styles
import { Button } from "../ui/button";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

interface Props {
  movies: Array<{ id: number; title: string; imgUrl: string }>;
  title:string;
}

function MovieSwiper({ movies, title }: Props) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80" //bottom-[3rem]
    >
      <div className="ml-2 mb-4 md:ml-16 md:mb-2 text-white text-xl md:text-3xl font-semibold">
        <h1>
          {title}
          <Link href="/search">
            <Button
              variant="ghost"
              className={`md:w-36 ml-4 md:h-12 rounded-full text-sm md:text-lg !bg-transparent hover:text-white 
          md:transition-all md:duration-500 md:ease-in-out md:transform
          ${
            showButtons
              ? "opacity-100 md:translate-x-0 visible"
              : "opacity-100 md:opacity-0 md:-translate-x-10 md:invisible"
          }
        `}
            >
              View All
              <SlArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-5" />
            </Button>
          </Link>
        </h1>
      </div>

      <div className="">
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
          {movies.map((movie, index) => {
            // Define how to find the "8th" slide (partial one)
            const isPartialSlide =
              index === (activeIndex + 7) % movies.length || // Next partial slide on the right
              index === (activeIndex - 1 + movies.length) % movies.length; // Previous partial slide on the left

            const isLastThreeSlides =
              (index >= (activeIndex + 6) % movies.length &&
                index <= (activeIndex + 7) % movies.length) || // Next partial slides on the right
              (index >= (activeIndex - 3 + movies.length) % movies.length &&
                index <= (activeIndex - 1 + movies.length) % movies.length); // Previous partial slides on the left

            const isLastOne =
            index === movies.length - 1;

            return (
              <SwiperSlide className="pb-12 md:pb-16" key={movie.id}>
                <MovieCard
                  imgUrl={movie.imgUrl}
                  title={movie.title}
                  isPartialSlide={isPartialSlide}
                  isLastThreeSlides={isLastThreeSlides}
                  isLastOne={isLastOne}
                  className="" // Apply negative margin
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Pass the swiper instance to the SwiperNavButtons allowing the navigation buttons inside that component to control the Swiper (e.g., move to the next or previous slide) */}
        <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons}/>
      </div>
    </div>
  );
}

export default MovieSwiper;
