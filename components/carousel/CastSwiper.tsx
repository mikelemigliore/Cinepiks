import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
            {cast.map((castItem, index) => (
              <CarouselItem key={index} className="basis-2/9 md:basis-1/9">
                <CastCard
                  picture={castItem.picture}
                  name={castItem.name}
                  character={castItem.character}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-transparent border-none hover:bg-transparent hover:text-white" />
          <CarouselNext className="bg-transparent border-none hover:bg-transparent hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
}

export default CastSwiper;
