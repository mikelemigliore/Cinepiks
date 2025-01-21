import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { CiPlay1 } from "react-icons/ci";
import Link from "next/link";
//import {
//getMovieCertification,
//getMovieDetails,
//getWatchProviders,
//} from "@/app/pages/api/singleMoviePage";
import {
  useGetMovieCertificationQuery,
  useGetMovieDetailsQuery,
  useGetHowToWatchQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import {
  useGetHowToWatchSeriesQuery,
  useGetSeriesCertificationQuery,
  useGetSeriesDetailsQuery,
  useGetSeriesRuntimeQuery,
} from "@/app/features/homepage/series/seriesSlice";

const howtowatch = [
  {
    id: 2,
    provider_name: "Apple TV",
    link: "https://tv.apple.com/",
  },
  {
    id: 3,
    provider_name: "Google Play Movies",
    link: "https://play.google.com/store/movies",
  },
  {
    id: 8,
    provider_name: "Netflix",
    link: "https://www.netflix.com/",
  },
  {
    id: 10,
    provider_name: "Amazon Prime Video",
    link: "https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root",
  },
  {
    id: 68,
    provider_name: "Microsoft Store",
    link: "https://www.microsoft.com/store/movies-and-tv",
  },
  {
    id: 192,
    provider_name: "YouTube",
    link: "https://www.youtube.com/movies",
  },
  {
    id: 7,
    provider_name: "Fandango At Home",
    link: "https://www.fandangonow.com/",
  },
  {
    id: 337,
    provider_name: "Vudu",
    link: "https://www.vudu.com/",
  },
  {
    id: 447,
    provider_name: "Redbox",
    link: "https://www.redbox.com/",
  },
  {
    id: 350,
    provider_name: "Disney+",
    link: "https://www.disneyplus.com/",
  },
  {
    id: 381,
    provider_name: "Hulu",
    link: "https://www.hulu.com/",
  },
];

interface SelectedFilterProp {
  all: boolean;
  buy: boolean;
  rent: boolean;
  subscription: boolean;
}

interface HowToWatchProp {
  id: number;
  selectedFilters: SelectedFilterProp;
  type: string;
}

interface WatchToBuyProp {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

function HowToWatchCard({ id, selectedFilters, type }: HowToWatchProp) {
  const [watchToBuy, setWatchToBuy] = useState<WatchToBuyProp[]>([]);
  const [watchToRent, setWatchToRent] = useState<WatchToBuyProp[]>([]);
  const [watchToStream, setWatchToStream] = useState<WatchToBuyProp[]>([]);
  const [allServices, setAllServices] = useState<WatchToBuyProp[]>([]);
  const [certification, setCertification] = useState("");
  const [runtime, setRuntime] = useState<number>();

  const { data: movieProvider } = useGetHowToWatchQuery(id || 0);

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);

  const { data: seriesProvider } = useGetHowToWatchSeriesQuery(id || 0);

  const { data: seriesDetails } = useGetSeriesDetailsQuery(id || 0);

  const { data: seriesCertification } = useGetSeriesCertificationQuery(id || 0);

  const { data: seriesRuntime } = useGetSeriesRuntimeQuery(id || 0);

  useEffect(() => {
    if (type === "movie") {
      if (movieDetails) {
        setRuntime(movieDetails?.runtime);
      }

      if (movieCertification) {
        setCertification(movieCertification);
      } else {
        setCertification("Not Rated");
      }

      if (movieProvider) {
        const combinedServices = [
          ...(movieProvider?.flatrate || []),
          ...(movieProvider?.rent || []),
          ...(movieProvider?.buy || []),
        ];
        setAllServices(combinedServices);
        setWatchToBuy(movieProvider?.buy || []);
        setWatchToRent(movieProvider?.rent || []);
        setWatchToStream(movieProvider?.flatrate || []);
      }
    } else if (type === "series") {
      if (seriesRuntime) {
        setRuntime(seriesRuntime);
      }

      if (seriesCertification) {
        setCertification(seriesCertification);
      } else {
        setCertification("Not Rated");
      }

      if (seriesProvider) {
        const combinedServices = [
          ...(seriesProvider?.flatrate || []),
          ...(seriesProvider?.rent || []),
          ...(seriesProvider?.buy || []),
        ];
        setAllServices(combinedServices);
        setWatchToBuy(seriesProvider?.buy || []);
        setWatchToRent(seriesProvider?.rent || []);
        setWatchToStream(seriesProvider?.flatrate || []);
      }
    }
  }, [
    movieDetails,
    movieProvider,
    movieCertification,
    seriesProvider,
    seriesDetails,
    seriesCertification,
  ]);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const findProviderLink = (providerId: number) => {
    const provider = howtowatch.find((item) => item.id === providerId);
    return provider ? provider.link : "https://www.justwatch.com/";
  };

  const getFilteredServices = () => {
    if (selectedFilters.all) {
      // Remove duplicates based on provider_id
      const allServicesNoRepeat = Array.from(
        new Map(allServices.map((item) => [item.provider_id, item])).values()
      );
      return allServicesNoRepeat;
    } else if (selectedFilters.buy) {
      return watchToBuy;
    } else if (selectedFilters.rent) {
      return watchToRent;
    } else if (selectedFilters.subscription) {
      return watchToStream;
    }
    return [];
  };

  const formatRuntime = (minutes: number): string => {
    if (type === "movie") {
      const hours = Math.floor(minutes / 60); // Get the hours
      const remainingMinutes = minutes % 60; // Get the remaining minutes
      return `${hours}h ${remainingMinutes}m`;
    } else if (type === "series") {
      const hours = Math.floor(minutes / 60); // Get the hours
      const remainingMinutes = minutes % 60; // Get the remaining minutes
      return hours
        ? `Avg: ${hours}h ${remainingMinutes}m`
        : `Avg: ${remainingMinutes}m`;
    } else {
      return "N/A";
    }
  };

  return (
    <ScrollArea className="md:h-[21.5vw] h-[62vw]">
      {getFilteredServices().length > 0 ? (
        <div>
          {getFilteredServices().map((watchItem) => (
            <div
              key={watchItem.provider_id}
              className="md:w-[34.5vw] w-[92vw] md:h-[5vw] h-[10vh] bg-buttonColor md:rounded-[1vw] rounded-2xl md:mb-[0.4vw] mb-[2vw] md:mr-[1vw]"
            >
              <div className="flex h-full items-center gap-x-[1vw] mx-[1vw]">
                <div className="md:w-[18vw] md:h-[3.3vw] w-[70vw] h-[12vw] bg-buttonColor md:rounded-[1vw] rounded-xl flex items-center justify-center">
                  {watchItem.logo_path && (
                    <img
                      src={`${BASE_IMAGE_URL}${watchItem.logo_path}`}
                      alt={`${watchItem.provider_name} logo`}
                      className={`md:h-[3.5vw] md:w-[3.5vw] h-[12vw] w-[12vw] border-buttonColor border-2 object-contain md:rounded-[1vw] rounded-xl`}
                    />
                  )}
                </div>
                <div className="w-full text-start md:text-[0.9vw] text-[3vw] md:ml-0 ml-2">
                  Platform
                  <div className="text-customTextColor md:text-[0.9vw] text-[3vw] line-clamp-1">
                    {watchItem.provider_name}
                  </div>
                </div>
                <div className="md:w-full w-[60vw] text-start md:text-[0.9vw] text-[3vw]">
                  Rated
                  <div className="text-customTextColor md:text-[0.9vw] text-[3vw]">
                    {certification}
                  </div>
                </div>
                <div className="w-full text-start md:text-[0.9vw] text-[3vw]">
                  Runtime
                  <div className="text-customTextColor md:text-[0.9vw] text-[3vw]">
                    {runtime ? formatRuntime(runtime) : "N/A"}
                  </div>
                </div>
                <div className="flex h-full items-center">
                  <Link
                    href={`${findProviderLink(watchItem.provider_id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="md:mr-[0vw] mr-[1vw] flex justify-center items-center h-10 w-22 md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                      Watch
                      <CiPlay1 className="md:w-[2.5vw] md:h-[2.5vh] w-[4vw] h-[4vh] md:ml-[0.4vw] ml-[1vw]" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[34.5vw] h-full bg-transparent rounded-[1vw] mb-[0.4vw] mr-[1vw]">
          <img
            src="/noResultsFound7.png"
            alt="No content found"
            className="md:w-[30vw] w-[100vw] md:ml-[3vw] ml-[0vw] md:mt-[4vh] md:mt-[4vh] mt-[3vh] absolute"
          />
        </div>
      )}
    </ScrollArea>
  );
}

export default HowToWatchCard;
