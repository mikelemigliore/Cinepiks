import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperNavButtons from "@/utils/swiperButtons";
import { useState } from "react";
import "swiper/css/pagination"; // Import Swiper pagination styles
import CastCard from "../cards/CastCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface CastProp {
  cast: Array<{ id: number; name: string; character: any; picture: any }>;
}

function CastSwiper({ cast }: CastProp) {
//   const [swiperInstance, setSwiperInstance] = useState<any>(null);
//   const [showButtons, setShowButtons] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="md:text-[1.2vw] text-[5vw] mb-[0.7vw] md:ml-[0vw] ml-[-8vw]">
        <h1>Cast</h1>
      </div>

      <div className="">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {cast.map((castItem) => (
              <CarouselItem className="basis-2/9 md:basis-1/9">
                <CastCard picture={castItem.picture} name={castItem.name} character={castItem.character}/>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='bg-transparent border-none hover:bg-transparent hover:text-white' />
          <CarouselNext className='bg-transparent border-none hover:bg-transparent hover:text-white'/>
        </Carousel>
      </div>
    </div>
  );
}

export default CastSwiper;
