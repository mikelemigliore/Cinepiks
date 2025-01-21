import { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Button } from "../ui/button";
import { LuPlus } from "react-icons/lu";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import { IoCheckmark } from "react-icons/io5";
import YoutubePlayer from "./YoutubePlayer";
import { GoMute, GoUnmute } from "react-icons/go";
import {
  useGetTeaserMovieVideoQuery,
  useGetTeaserSeriesVideoQuery,
} from "@/app/features/homepage/movies/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import handleLikeBtn from "@/utils/handleLikeBtn";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";
import { signOut, useSession } from "next-auth/react";

interface Genre {
  id: number;
  name: string;
}

interface TeaserCardProps {
  //image?:string
  title?: string;
  name?: string;
  imgUrl: string;
  imgBackdrop?: string;
  genres: Genre[];
  runtime?: number;
  isLastThreeSlides?: boolean;
  isLastOne?: boolean;
  expandCard?: boolean;
  isDesktop?: boolean;
  href: string;
  type?: string; // Define possible values
  season?: number;
  id: number;
}

function TeaserCard({
  title,
  imgUrl,
  imgBackdrop,
  isLastThreeSlides,
  isLastOne,
  expandCard,
  isDesktop,
  href,
  type,
  genres,
  runtime,
  season,
  name,
  id,
}: //image
TeaserCardProps) {
  //const [showContent, setShowContent] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoKey, setVideoKey] = useState<string>();
  const [unmute, setUnmute] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // To manage hover delay
  // const [isDesktop, setIsDesktop] = useState(false); // Track if the view is desktop
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);

  const { data: session }: any = useSession();

  //const activeCardRef = useRef<string | null>(null); // To track the currently active card

  const mediaType = type === "movie" ? "movie" : "tv";

  const { data: videoTeaserMovie } = useGetTeaserMovieVideoQuery(id);

  const { data: videoTeaserSeries } = useGetTeaserSeriesVideoQuery(id);

  const dispatch = useDispatch();

  const likesdb = useSelector((state: RootState) => state.content.likes);

  const watchlistdb = useSelector(
    (state: RootState) => state.content.watchlist
  );

  useEffect(() => {
    //console.log(expandCard);
    if (!expandCard) return;

    console.log("likesdb", likesdb);

    const Liked = likesdb.map((like) => like.id).includes(id);

    const Watchlisted = watchlistdb
      .map((watchlist) => watchlist.id)
      .includes(id);
    //console.log("Liked", Liked);

    if (Liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }

    if (Watchlisted) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [expandCard, id]); // Run only once when the component mounts or id changes

  useEffect(() => {
    if (mediaType === "movie" && videoTeaserMovie) {
      setVideoKey(videoTeaserMovie?.key);
    } else if (mediaType === "tv" && videoTeaserSeries) {
      setVideoKey(videoTeaserSeries?.key);
    }
  }, [videoTeaserMovie, videoTeaserSeries]);

  const handleTouchStart = () => {
    // Set a timeout for detecting long press
    const timeout = setTimeout(() => {
      console.log("Long press detected");
      // Implement any logic for preventing effects on long press
    }, 500); // 500ms long press detection
    setTouchTimeout(timeout);
  };

  const handleTouchEnd = () => {
    // Clear the timeout if touch ends before long press duration
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsPlaying(false);
    setUnmute(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60); // Get the hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  };

  const handleLike = async () => {
    handleLikeBtn(dispatch, setIsLiked, isLiked, id, mediaType);
  };

  const handleAdded = async () => {
    handleWatchlistBtn(dispatch, setIsAdded, isAdded, id, mediaType);
  };

  return (
    <div>
      {expandCard && (
        <div
          // className="relative group md:w-[16.5rem] md:h-[25rem] transition-all duration-500 ease-in-out transform hidden md:block"
          className="relative group transition-all duration-500 ease-in-out transform hidden md:block"
          onMouseEnter={isDesktop ? handleMouseEnter : undefined} // Only add hover on desktop
          onMouseLeave={isDesktop ? handleMouseLeave : undefined} // Only add hover on desktop
          onContextMenu={(e) => e.preventDefault()} // Disable right-click and long-press context menu
          onTouchStart={handleTouchStart} // Start touch detection
          onTouchEnd={handleTouchEnd} // End touch detection
        >
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              expandCard && isDesktop
                ? "md:w-[23vw] md:h-[44vh] relative bg-customColorCard w-full h-full shadow-xl md:rounded-3xl group-hover:scale-105 md:group-hover:z-10"
                : "md:w-[22vw] md:h-[44vh]"
            }  ${
              isLastThreeSlides || isLastOne
                ? "md:group-hover:transform-origin-left md:group-hover:-translate-x-[10vw]"
                : ""
            }`}
          >
            {/* Poster / Video */}
            <div>
              {expandCard && isPlaying && isDesktop && videoKey ? (
                <div className="relative w-full h-full pb-[56.25%] overflow-hidden rounded-t-3xl">
                  <YoutubePlayer
                    isPlaying={isPlaying}
                    fadeOut={fadeOut}
                    videoKey={videoKey}
                    unmute={unmute}
                    VideoEnd={handleVideoEnd}
                    imgBackdrop={imgBackdrop}
                    //id={id}
                  />
                </div>
              ) : (
                <img
                  src={`${
                    imgBackdrop
                      ? `${BASE_IMAGE_URL}${imgBackdrop}`
                      : `/noPreview6.jpg`
                  }`}
                  alt={title}
                  className={`md:rounded-t-3xl w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 noselect`}
                />
              )}
            </div>

            {/* Mute Button (conditionally shown for desktop) */}
            {isDesktop && (
              <div
                className={`absolute top-0 left-0 md:ml-[1rem] md:mt-[1rem] z-[10] ${
                  videoKey ? `opacity-100` : `opacity-0`
                }`}
              >
                <Button
                  onClick={() => setUnmute(!unmute)}
                  className="flex items-center justify-center w-[3vw] h-[3vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
                >
                  {unmute ? (
                    <GoUnmute
                      className={`w-[4vw] h-[4vw] min-w-[17px] min-h-[17px]`}
                    />
                  ) : (
                    <GoMute className="w-[4vw] h-[4vw] min-w-[17px] min-h-[17px]" />
                  )}
                </Button>
              </div>
            )}

            {/* Card Content */}
            <div
              className={`absolute bottom-0 w-full p-[1vw] transition-opacity duration-250 ease-in-out ${
                expandCard && isDesktop ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-between">
                {type === "movie" ? (
                  <div>
                    <h1 className="font-bold text-[1vw] m-[0.5vh] overflow-hidden overflow-ellipsis line-clamp-1">
                      {title}
                    </h1>
                    <h2 className="m-[1vh] text-customTextColor font-bold pt-[1.5vh] text-[0.7vw]">
                      <span>
                        {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
                      </span>
                    </h2>
                    <h2 className="flex w-[14vw] justify-start m-[1vh] text-customTextColor font-bold text-[0.7vw] whitespace-nowrap  overflow-hidden text-ellipsis">
                      <span>{genres[0]?.name || ""}</span>
                      <GoDotFill className="bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full" />
                      <span>{genres[1]?.name || ""}</span>
                      <GoDotFill
                        className={`bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full ${
                          genres[2]?.name ? "" : "hidden"
                        }`}
                      />
                      <span>{genres[2]?.name || ""}</span>
                    </h2>
                  </div>
                ) : (
                  <div>
                    <h1 className="font-bold text-[1vw] m-[0.5vh] overflow-hidden overflow-ellipsis line-clamp-1">
                      {name}
                    </h1>
                    <h2 className="m-[1vh] text-customTextColor font-bold text-[0.7vw]">
                      <span>Seasons: {season}</span>
                    </h2>
                    <h2 className="flex flex-wrap justify-start m-[1vh] text-customTextColor font-bold text-[0.7vw]">
                      <span>{genres[0]?.name || ""}</span>
                      <GoDotFill className="bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full" />
                      <span>{genres[1]?.name || ""}</span>
                      {/* <GoDotFill className="bg-customTextColor w-[0.3vw] h-[0.3vw] m-[0.7vh] rounded-full" />
                      <span>{genres[2]?.name || ""}</span> */}
                    </h2>
                  </div>
                )}

                <div className="">
                  <div className="space-x-[0.5vw]">
                    <Button
                      disabled={session === null}
                      onClick={() => handleAdded()}
                      className={`w-[2.8vw] h-[2.8vw] rounded-full bg-slate-300 bg-opacity-10 backdrop-blur-3xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 ${
                        isAdded ? "bg-white/90 text-black font-bold" : ""
                      }`}
                    >
                      {isAdded ? (
                        <IoCheckmark className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      ) : (
                        <LuPlus className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      )}
                    </Button>
                    <Button
                      type="submit"
                      disabled={session === null}
                      onClick={() => handleLike()}
                      // onClick={() => setIsLiked(!isLiked)}
                      className={`w-[2.8vw] h-[2.8vw] rounded-full bg-slate-300 bg-opacity-10 backdrop-blur-3xl hover:bg-white/90 hover:text-black hover:font-bold transition-transform duration-300 ease-in-out active:bg-white active:scale-95 ${
                        isLiked ? "bg-white/90 text-black" : ""
                      }`}
                    >
                      {isLiked ? (
                        <AiFillLike className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      ) : (
                        <AiOutlineLike className="w-[3vw] h-[3vw] min-w-[17px] min-h-[17px]" />
                      )}
                    </Button>
                  </div>

                  <div>
                    <Link href={`${href}/${id}`}>
                      <Button className="w-[6.2vw] h-[2.5vw] rounded-full text-[1.7vh] bg-slate-300 bg-opacity-10 backdrop-blur-3xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 transition-transform duration-300">
                        View
                        <SlArrowRight className="ml-[2vw] w-[1vw] h-[1vw] min-w-[10px] min-h-[10px]" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeaserCard;

// const handleLike = async (id: number) => {
//   const session = await getSession();
//   const userEmail = session?.user?.email;

//   if (!userEmail) {
//     console.error("User not logged in!");
//     return;
//   }

//   if (isLiked === true) {
//     // REMOVE LIKE
//     try {
//       const res = await fetch("/api/likes", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, like: id }),
//       });

//       if (res.status === 400) {
//         console.log("Error");
//       }

//       if (res.status === 200) {
//         setIsLiked(false);
//         const data = await getLike(id);
//         const likedContent = await data.json();
//         dispatch(unlikeMovie(likedContent)); // ✅ Dispatch Redux action
//       }
//     } catch (error) {
//       console.error("Error removing like:", error);
//     }
//   } else {
//     // ADD LIKE
//     try {
//       const res = await fetch("/api/likes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, like: id }),
//       });

//       if (res.status === 400) {
//         console.log("Error");
//       }

//       if (res.status === 200) {
//         setIsLiked(true);
//         const data = await getLike(id); // Fetch movie data by IDs
//         const likedContent = await data.json();
//         dispatch(likeMovie(likedContent)); // ✅ Dispatch Redux action
//       }
//     } catch (error) {
//       console.error("Error adding like:", error);
//     }
//   }
// };
