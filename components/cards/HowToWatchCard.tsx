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
}

interface WatchToBuyProp {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

function HowToWatchCard({ id, selectedFilters }: HowToWatchProp) {
  const [watchToBuy, setWatchToBuy] = useState<WatchToBuyProp[]>([]);
  const [watchToRent, setWatchToRent] = useState<WatchToBuyProp[]>([]);
  const [watchToStream, setWatchToStream] = useState<WatchToBuyProp[]>([]);
  const [allServices, setAllServices] = useState<WatchToBuyProp[]>([]);
  const [certification, setCertification] = useState("");
  const [runtime, setRuntime] = useState();

  const { data: movieProvider } = useGetHowToWatchQuery(id || 0);

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);

  useEffect(() => {
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

  }, [movieDetails, movieProvider, movieCertification]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getWatchProviders(id);
  //       const responseCertification = await getMovieCertification(id);
  //       const responseInfo = await getMovieDetails(id);
  //       const data = await response.json();
  //       const dataCertification = await responseCertification.json();
  //       const dataInfo = await responseInfo.json();

  //       // Find the US release dates and certification
  //       const usRelease = dataCertification.results.find(
  //         (item: any) => item.iso_3166_1 === "US"
  //       );

  //       if (usRelease) {
  //         const usCertification =
  //           usRelease.release_dates[0].certification || "Not Rated";
  //         setCertification(usCertification);
  //       }

  //       if (data) {
  //         const combinedServices = [
  //           ...(data.flatrate || []),
  //           ...(data.rent || []),
  //           ...(data.buy || []),
  //         ];
  //         setAllServices(combinedServices);
  //         setWatchToBuy(data.buy || []);
  //         setWatchToRent(data.rent || []);
  //         setWatchToStream(data.flatrate || []);
  //         setRuntime(dataInfo.runtime);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
    const hours = Math.floor(minutes / 60); // Get the hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <ScrollArea className="h-[21.5vw]">
      {getFilteredServices().length > 0 ? (
        <div>
          {getFilteredServices().map((watchItem) => (
            <div
              key={watchItem.provider_id}
              className="w-[34.5vw] h-[5vw] bg-buttonColor rounded-[1vw] mb-[0.4vw] mr-[1vw]"
            >
              <div className="flex h-full items-center gap-x-[1vw] mx-[1vw]">
                <div className="w-[18vw] h-[3.3vw] bg-black rounded-[1vw] flex items-center justify-center">
                  {watchItem.logo_path && (
                    <img
                      src={`${BASE_IMAGE_URL}${watchItem.logo_path}`}
                      alt={`${watchItem.provider_name} logo`}
                      className={`h-[3.5vw] w-[3.5vw] border-buttonColor border-2 object-contain rounded-[1vw]`}
                    />
                  )}
                </div>
                <div className="w-full text-start text-[0.9vw]">
                  Platform
                  <div className="text-customTextColor text-[0.9vw] line-clamp-1">
                    {watchItem.provider_name}
                  </div>
                </div>
                <div className="w-full text-start text-[0.9vw]">
                  Rated
                  <div className="text-customTextColor text-[0.9vw]">
                    {certification}
                  </div>
                </div>
                <div className="w-full text-start text-[0.9vw]">
                  Runtime
                  <div className="text-customTextColor text-[0.9vw]">
                    {runtime ? formatRuntime(runtime) : "N/A"}
                  </div>
                </div>
                <div className="flex h-full items-center">
                  <Link
                    href={`${findProviderLink(watchItem.provider_id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="flex justify-center items-center h-10 w-28 md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                      Watch
                      <CiPlay1 className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[34.5vw] h-[5vw] bg-buttonColor rounded-[1vw] mb-[0.4vw] mr-[1vw]">
          <h1>Not Available</h1>
        </div>
      )}
    </ScrollArea>
  );
}

export default HowToWatchCard;
