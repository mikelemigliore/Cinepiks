import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperNavButtons from "@/utils/swiperButtons";
import { useState } from "react";
import "swiper/css/pagination"; // Import Swiper pagination styles
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import ServicesCard from "../cards/ServicesCard";
import Link from "next/link";
import GenresCard from "../cards/GenresCard";

interface GenresProp {
  genres: Array<{ id: number; title: string ,iconBlack:any,iconWhite:any}>;
}

function GenresSwiper({ genres }: GenresProp) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // State to track the selected items by their ID
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  // Handle the selection of a specific item
  const handleSelect = (id: number) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: !prevSelectedItems[id], // Toggle the selection for the clicked item
    }));
  };

  // Check if any item is selected
  const isAnyItemSelected = Object.values(selectedItems).some(
    (isSelected) => isSelected
  );

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80"
    >
      <div className="ml-2 mb-4 md:ml-16 md:mb-2 text-white text-xl md:text-3xl font-semibold">
        <h1>What's Your Genre?</h1>
        <h2 className="text-base md:text-lg pt-4 pb-4 font-medium text-gray-300">
        Select one or more tags, then click on 'Explore All' to view content from your favorite genres :
        </h2>
      </div>

      <div className="ml-2 md:ml-16">
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
              slidesPerView: 9,
              slidesPerGroup: 9,
              spaceBetween: -140,
            },
          }}
        >
          {genres.map((genre, index) => {
            const isPartialSlide =
              index === (activeIndex + 9) % genres.length || // Next partial slide on the right
              index === (activeIndex - 1 + genres.length) % genres.length; // Previous partial slide on the left

            const isSelected = !!selectedItems[genre.id]; // Check if the current service is selected

            return (
                <SwiperSlide key={genre.id} className="pb-12 md:pb-16">
                  <GenresCard
                    title={genre.title}
                    iconBlack={genre.iconBlack}
                    iconWhite={genre.iconWhite}
                    isPartialSlide={isPartialSlide}
                    activeIndex={activeIndex}
                    isSelected={isSelected}
                    onSelect={() => handleSelect(genre.id)} // Pass the specific id to the handler
                  />
                </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />

      {/* Explore All button with disabled state */}
      {/* Conditionally render Link only when the button is enabled */}
      {isAnyItemSelected ? (
        <Link href="/search">
          <Button
            onClick={() => console.log("Explore All clicked")}
            className={`ml-2 h-[3rem] w-[10rem] md:ml-16 md:w-[10rem] md:h-[3.5rem] text-md rounded-full transition-transform duration-300 ease-in-out active:scale-95 bg-customServicesColor hover:bg-white/90 hover:text-black`}
          >
            Explore All
            <SlArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-5" />
          </Button>
        </Link>
      ) : (
        <div className="ml-2 h-[3rem] w-[10rem] md:ml-16 md:w-[10rem] md:h-[3.5rem] text-md rounded-full bg-customDisabledColor/40 text-gray-500 cursor-not-allowed pointer-events-none flex items-center justify-center">
          Explore All
          <SlArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-5" />
        </div>
      )}
    </div>
  );
}

export default GenresSwiper;
