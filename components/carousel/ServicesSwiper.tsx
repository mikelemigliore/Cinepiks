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

interface Prop {
  services: Array<{ id: number; title: string; img: any }>;
  logInPage?: boolean;
  description?: string;
  mediaType?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Button Element
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
  //const [activeServices, setActiveServices] = useState<{ id: number; title: string; img: any }[]>([]);

  // State to track the selected items by their ID
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  // Get only the IDs of the selected services
  const activeServiceIds = services
    .filter((service) => selectedItems[service.id])
    .map((service) => service.id);

  //console.log(activeServiceIds);

  const handleReload = () => {
    // Serialize the medias array and store it in sessionStorage
    //sessionStorage.setItem("movieData", JSON.stringify(medias));

    // Define the query parameters
    const queryParams = new URLSearchParams({
      type: mediaType === "movie" ? "movie" : "tv",
      servicesParam: JSON.stringify(activeServiceIds), // Convert activeServices to a string
    });
    console.log("queryParams.toString()", queryParams.toString());

    // Navigate to the search page with query parameters
    window.location.href = `/search?${queryParams.toString()}`;
  };

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

  // let activeServices = [];

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative z-80"
    >
      <div
        className={`ml-2 mb-4 md:ml-[3vw] text-white text-xl md:text-[1.3vw] font-semibold`}
      >
        {logInPage ? (
          <h1>Discover What Your Favorite Streaming Services Have to Offer</h1>
        ) : (
          <h1>What's Your Platform?</h1>
        )}

        <div
          className={`text-[2vw] md:text-[0.9vw] pt-[1vh] pb-[1vh] font-medium text-gray-300`}
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

      <div className="ml-[1vw] md:ml-[3vw]">
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
          }}
        >
          {services.map((service, index) => {
            const isPartialSlide =
              index === (activeIndex + 6) % services.length || // Next partial slide on the right
              index === (activeIndex - 1 + services.length) % services.length; // Previous partial slide on the left

            const isSelected = !!selectedItems[service.id]; // Check if the current service is selected

            //const activeServices = (services.filter((service) => selectedItems[service.id]));
            //setActiveServices((prev: any) => [...prev, isSelected]);

            //console.log(activeServices);

            return (
              <SwiperSlide key={service.id} className="pb-[5vh] md:pb-[8vh]">
                <ServicesCard
                  logInPage={logInPage}
                  img={service.img}
                  title={service.title}
                  isPartialSlide={isPartialSlide}
                  activeIndex={activeIndex}
                  isSelected={isSelected}
                  id={service.id}
                  onSelect={() => handleSelect(service.id)} // Pass the specific id to the handler
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />

      {/* Explore All button with disabled state */}
      {isAnyItemSelected && !logInPage ? (
        // <Link href="/search">
        <Button
          onClick={(e) => {
            if (onClick) onClick(e); // Call the passed onClick handler if provided
            handleReload(); // Reload the page
          }}
          onMouseDown={(e) => e.currentTarget.blur()} // Blurs the button to reset active/focus state
          className={`ml-[1vw] h-[6vh] w-[20vw] md:ml-[3vw] md:w-[8vw] md:h-[6vh] text-[0.9vw] rounded-full transition-transform duration-300 ease-in-out active:scale-95 bg-customServicesColor hover:bg-white/90 hover:text-black`}
        >
          Explore All
          <SlArrowRight className="w-[1vw] h-[1vw] ml-[1vw] md:ml-[1vw]" />
        </Button>
      ) : (
        // </Link>
        <div
          className={`ml-[1vw] h-[6vh] w-[20vw] md:ml-[3vw] md:w-[8vw] md:h-[6vh] text-[0.9vw] rounded-full bg-customDisabledColor/40 text-gray-500 cursor-not-allowed pointer-events-none flex items-center justify-center ${
            logInPage ? "hidden" : ""
          }`}
        >
          Explore All
          <SlArrowRight className="w-[1vw] h-[1vw] ml-[1vw] md:ml-[1vw]" />
        </div>
      )}
    </div>
  );
}

export default ServicesSwiper;
