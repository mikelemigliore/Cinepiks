// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import SwiperNavButtons from "@/utils/swiperButtons";
// import { useState } from "react";
// import "swiper/css/pagination"; // Import Swiper pagination styles
// import { Button } from "../ui/button";
// import { SlArrowRight } from "react-icons/sl";
// import ServicesCard from "../cards/ServicesCard";
// import Link from "next/link";

// interface Prop {
//   services: Array<{ id: number; title: string }>;
// }

// function ServicesSwiper({ services }: Prop) {
//   const [swiperInstance, setSwiperInstance] = useState<any>(null);
//   const [showButtons, setShowButtons] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);

//   // State to track the selected items by their ID
//   const [selectedItems, setSelectedItems] = useState<{
//     [key: number]: boolean;
//   }>({});

//   // Handle the selection of a specific item
//   const handleSelect = (id: number) => {
//     setSelectedItems((prevSelectedItems) => ({
//       ...prevSelectedItems,
//       [id]: !prevSelectedItems[id], // Toggle the selection for the clicked item
//     }));
//   };

//   // Check if any item is selected
//   const isAnyItemSelected = Object.values(selectedItems).some(
//     (isSelected) => isSelected
//   );

//   return (
//     <div
//       onMouseEnter={() => setShowButtons(true)}
//       onMouseLeave={() => setShowButtons(false)}
//       className="relative z-80"
//     >
//       <div className="ml-2 mb-4 md:ml-16 md:mb-2 text-white text-xl md:text-3xl font-semibold">
//         <h1>What's Your Platform?</h1>
//         <h3 className="md:text-lg pt-4 pb-4 font-medium text-gray-300">
//           Select one or more tags and view content from your favorite platform:
//         </h3>
//       </div>

//       <div className="md:ml-16">
//         <Swiper
//           speed={1000}
//           modules={[Navigation, Pagination]}
//           slidesPerView={2}
//           slidesPerGroup={2}
//           spaceBetween={-5}
//           loop={false}
//           pagination={{ clickable: true }}
//           onSwiper={(swiper) => {
//             setSwiperInstance(swiper);
//           }}
//           onSlideChange={(swiper) => {
//             setActiveIndex(swiper.realIndex);
//           }}
//           breakpoints={{
//             1024: {
//               slidesPerView: 9,
//               slidesPerGroup: 9,
//               spaceBetween: -140,
//             },
//           }}
//         >
//           {services.map((service, index) => {
//             const isPartialSlide =
//               index === (activeIndex + 9) % services.length || // Next partial slide on the right
//               index === (activeIndex - 1 + services.length) % services.length; // Previous partial slide on the left

//             const isSelected = !!selectedItems[service.id]; // Check if the current service is selected

//             return (
//               <div key={service.id} className="">
//                 <SwiperSlide className="pb-12 md:pb-16">
//                   <ServicesCard
//                     iconBlack={service.iconBlack}
//                     iconWhite={service.iconWhite}
//                     title={service.title}
//                     isPartialSlide={isPartialSlide}
//                     activeIndex={activeIndex}
//                     isSelected={isSelected}
//                     onSelect={() => handleSelect(service.id)} // Pass the specific id to the handler
//                   />
//                 </SwiperSlide>
//               </div>
//             );
//           })}
//         </Swiper>
//       </div>

//       <SwiperNavButtons swiper={swiperInstance} showButtons={showButtons} />

//       {/* Explore All button with disabled state */}
//       {/* Conditionally render Link only when the button is enabled */}
//       {isAnyItemSelected ? (
//         <Link href="/search">
//           <Button
//             onClick={() => console.log("Explore All clicked")}
//             className={`md:ml-16 md:w-[10rem] md:h-[3.5rem] text-md rounded-full transition-transform duration-300 ease-in-out active:scale-95 bg-customServicesColor hover:bg-white/90 hover:text-black`}
//           >
//             Explore All
//             <SlArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-5" />
//           </Button>
//         </Link>
//       ) : (
//         <div className="md:ml-16 md:w-[10rem] md:h-[3.5rem] text-md rounded-full bg-customDisabledColor text-gray-500 cursor-not-allowed pointer-events-none flex items-center justify-center">
//           Explore All
//           <SlArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-5" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServicesSwiper;

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
}

function ServicesSwiper({ services, logInPage }: Prop) {
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

            return (
              <SwiperSlide key={service.id} className="pb-[5vh] md:pb-[8vh]">
                <ServicesCard
                logInPage={logInPage}
                  img={service.img}
                  title={service.title}
                  isPartialSlide={isPartialSlide}
                  activeIndex={activeIndex}
                  isSelected={isSelected}
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
        <Link href="/search">
          <Button
            onMouseDown={(e) => e.currentTarget.blur()} // Blurs the button to reset active/focus state
            className={`ml-[1vw] h-[6vh] w-[20vw] md:ml-[3vw] md:w-[8vw] md:h-[6vh] text-[0.9vw] rounded-full transition-transform duration-300 ease-in-out active:scale-95 bg-customServicesColor hover:bg-white/90 hover:text-black`}
          >
            Explore All
            <SlArrowRight className="w-[1vw] h-[1vw] ml-[1vw] md:ml-[1vw]" />
          </Button>
        </Link>
      ) : (
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
