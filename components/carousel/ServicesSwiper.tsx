import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperNavButtons from "@/utils/swiperButtons";
import { useState } from "react";
import "swiper/css/pagination";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import ServicesCard from "../cards/ServicesCard";

interface Prop {
  services: Array<{ id: number; title: string; img: any }>;
  logInPage?: boolean;
  description?: string;
  mediaType?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ServicesSwiper({
  services,
  logInPage,
  description,
  mediaType,
  onClick,
}: Prop) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  const activeServiceIds = services
    .filter((service) => selectedItems[service.id])
    .map((service) => service.id);

  const handleReload = () => {
    const queryParams = new URLSearchParams({
      type: mediaType === "movie" ? "movie" : "tv",
      servicesParam: JSON.stringify(activeServiceIds),
    });

    window.location.href = `/search?${queryParams.toString()}`;
  };

  const handleSelect = (id: number) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: !prevSelectedItems[id],
    }));
  };

  const isAnyItemSelected = Object.values(selectedItems).some(
    (isSelected) => isSelected
  );

  // let activeServices = [];

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80 ml-2 md:ml-0"
    >
      <div
        className={`ml-2 mb-4 md:ml-[3vw]  text-white text-xl md:text-[1.3vw] font-semibold`}
      >
        {logInPage ? (
          <h1>Discover What Your Favorite Streaming Services Have to Offer</h1>
        ) : (
          <h1>What's Your Platform?</h1>
        )}

        <div
          className={`text-[3.5vw] md:text-[0.9vw] pt-[1vh] pb-[1vh] font-medium text-gray-300`}
        >
          {logInPage ? (
            <h2>
              The streaming service icons below are for informational purposes
              only, indicating their offerings without implying any affiliation
              or availability on our platform.
            </h2>
          ) : (
            <h2>
              Select one or more tags, then click on 'Explore All' to view
              content offered by your favorite platform:
            </h2>
          )}
        </div>
      </div>

      <div className="ml-[2vw] md:ml-[3vw]">
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
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: -140,
            },
            768: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: -70,
            },
          }}
        >
          {services.map((service, index) => {
            const isPartialSlide =
              index === (activeIndex + 6) % services.length ||
              index === (activeIndex - 1 + services.length) % services.length;

            const isSelected = !!selectedItems[service.id];

            return (
              <SwiperSlide key={service.id} className="pb-[7vh] md:pb-[8vh]">
                <ServicesCard
                  logInPage={logInPage}
                  img={service.img}
                  title={service.title}
                  isPartialSlide={isPartialSlide}
                  activeIndex={activeIndex}
                  isSelected={isSelected}
                  id={service.id}
                  onSelect={() => handleSelect(service.id)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />

      {isAnyItemSelected && !logInPage ? (
        <Button
          onClick={(e) => {
            if (onClick) onClick(e);
            handleReload();
          }}
          onMouseDown={(e) => e.currentTarget.blur()}
          className={`ml-[1vw] h-[8vh] w-[93vw] md:h-[6vh] md:w-[20vw] md:ml-[3vw] md:w-[8vw] md:h-[6vh] md:text-[0.9vw] text-[4vw] rounded-full transition-transform duration-300 ease-in-out active:scale-95 bg-customServicesColor hover:bg-white/90 hover:text-black`}
        >
          Explore All
          <SlArrowRight className="w-[4vw] h-[4vw] md:w-[1vw] md:h-[1vw] ml-[4vw] md:ml-[1vw]" />
        </Button>
      ) : (
        <div
          className={`ml-[1vw] h-[8vh] w-[93vw] md:h-[6vh] md:w-[20vw] md:ml-[3vw] md:w-[8vw] md:h-[6vh] md:text-[0.9vw] text-[4vw] rounded-full bg-customDisabledColor/40 text-gray-500 cursor-not-allowed pointer-events-none flex items-center justify-center ${
            logInPage ? "hidden" : ""
          }`}
        >
          Explore All
          <SlArrowRight className="w-[4vw] h-[4vw] md:w-[1vw] md:h-[1vw] ml-[4vw] md:ml-[1vw]" />
        </div>
      )}
    </div>
  );
}

export default ServicesSwiper;
