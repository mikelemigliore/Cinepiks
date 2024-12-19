// "use client";
// import { useState } from "react";
// import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { useEffect } from "react";
// import { FaFacebook, FaLink, FaPlay } from "react-icons/fa";
// import { GoDotFill } from "react-icons/go";
// import MovieCard from "@/components/cards/MovieCard";
// import { IoCheckmark } from "react-icons/io5";
// import { LuPlus } from "react-icons/lu";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { AiFillInstagram, AiFillLike, AiOutlineLike } from "react-icons/ai";
// import { FaXTwitter } from "react-icons/fa6";
// import Link from "next/link";
// import StarRating from "@/components/starRating/StarRating";
// import {
//   getDirector,
//   getMovieCertification,
//   getMovieDetails,
//   getRatings,
//   getSocials,
// } from "@/app/pages/api/singleMoviePage";
// import {
//   getImdbId,
//   getSeriesCertification,
//   getSeriesDetails,
//   getSeriesRatings,
//   getSeriesRuntime,
//   getSeriesSocials,
// } from "@/app/pages/api/singleSeriesPage";

// interface SeriesProp {
//   id: number;
//   title: string;
//   imgUrl: string;
// }

// interface GenresProp {
//   id: number;
//   name: string;
// }

// interface SocialsProp {
//   id: number;
//   imdb_id: string;
//   wikidata_id: string;
//   facebook_id: string;
//   instagram_id: string;
//   twitter_id: string;
// }

// interface CastProp {
//   character: string;
//   id: number;
//   name: string;
//   picture: string;
// }

// interface MainDetailsProps {
//   id: number;
//   title: string;
//   className?: string; // Optional className prop
//   isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
//   isLastThreeSlides?: boolean;
//   isLastOne?: boolean;
//   list?: boolean;
//   media: SeriesProp[];
//   handlePlay: () => void;
//   videoKey: string;
//   handleReload: () => void;
//   handleEnd: () => void;
//   setIsLoading: (loading: boolean) => void;
//   imdbId?: string;
//   cast?: CastProp[];
//   type: string;
//   //single?:boolean
// }

// function MainDetails({
//   id,
//   videoKey,
//   media,
//   handlePlay,
//   handleReload,
//   handleEnd,
//   setIsLoading,
//   title,
//   imdbId,
//   cast = [],
//   type,
// }: //single
// MainDetailsProps) {
//   const [poster, setPoster] = useState<string>("");
//   const [genres, setGenres] = useState<GenresProp[]>([]);
//   const [certification, setCertification] = useState("");
//   const [runtime, setRuntime] = useState<number | null>(null);
//   const [description, setDescription] = useState("");
//   const [rottenTomatoesAudience, setRottenTomatoesAudience] = useState();
//   const [rottenTomatoesCritics, setRottenTomatoesCritics] = useState();
//   const [imdb, setIMDb] = useState();
//   const [tmdbScore, setTMDbScore] = useState();
//   const [socials, setSocials] = useState<SocialsProp>();
//   const [homepage, setHomePage] = useState<string | null>(null);
//   const [director, setDirector] = useState();
//   const [single, setSingleMedia] = useState(true);
//   const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
//   const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
//   const [isListView, setIsListView] = useState(true);
//   const [value, setValue] = React.useState<number | null>(0);
//   const [imdbIdSeries, setImdbIdSeries] = useState("");
//   //const type = "movie";

//   const handleAdded = (movieId: number) => {
//     setIsAdded((prevAdded) => ({
//       ...prevAdded,
//       [movieId]: !prevAdded[movieId], // Toggle the like state for the specific movie
//     }));
//   };

//   const handleLike = (movieId: number) => {
//     setIsLiked((prevLiked) => ({
//       ...prevLiked,
//       [movieId]: !prevLiked[movieId], // Toggle the like state for the specific movie
//     }));
//   };

//   const handleValue = (newValue: number | null) => {
//     if (newValue !== null) {
//       setValue(newValue);
//     } else {
//       setValue(0);
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       try {
//         if (type === "movie") {
//           const response = await getMovieDetails(id);
//           const responseCertification = await getMovieCertification(id);
//           const responseSocials = await getSocials(id);
//           const responseDirector = await getDirector(id);

//           const data = await response.json();
//           const dataCertification = await responseCertification.json();
//           const dataSocials = await responseSocials.json();
//           const dataDirector = await responseDirector.json();

//           const usRelease = dataCertification?.results?.find(
//             (item: any) => item.iso_3166_1 === "US"
//           );

//           if (isMounted) {
//             setPoster(data?.poster_path || "");
//             setGenres(data?.genres || []);
//             setRuntime(data?.runtime || "N/A");
//             setDescription(data?.overview || "No description available");
//             setTMDbScore(data?.vote_average || null);
//             setSocials(dataSocials || {});
//             setHomePage(data?.homepage || "");
//             setDirector(dataDirector);

//             if (data.imdb_id) {
//               const ratingsResponse = await getRatings(data.imdb_id);
//               if (ratingsResponse) {
//                 const dataRatings = await ratingsResponse.json();

//                 // console.log(
//                 //   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.audience
//                 //     ?.rating
//                 // );

//                 // console.log(
//                 //   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.critics
//                 //     ?.rating
//                 // );
//                 // console.log(
//                 //   dataRatings?.result?.ratings?.["IMDb"]?.audience?.rating
//                 // );

//                 setRottenTomatoesAudience(
//                   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.audience
//                     ?.rating || null
//                 );
//                 setRottenTomatoesCritics(
//                   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.critics
//                     ?.rating || null
//                 );
//                 setIMDb(
//                   dataRatings?.result?.ratings?.["IMDb"]?.audience?.rating ||
//                     null
//                 );
//               }
//             }
//           }
//         } else {
//           const responseImdbId = await getImdbId(id);
//           const response = await getSeriesDetails(id);
//           const responseCertification = await getSeriesCertification(id);
//           const responseSocials = await getSeriesSocials(id);
//           const responseSeriesRuntime = await getSeriesRuntime(id);

//           const dataImdbId = await responseImdbId.json();
//           const data = await response.json();
//           const dataCertification = await responseCertification.json();
//           const dataSocials = await responseSocials.json();
//           const dataRuntime = await responseSeriesRuntime.json();

//           if (isMounted) {
//             setImdbIdSeries(dataImdbId || "");
//             setCertification(dataCertification || "Not Rated");
//             setPoster(data?.poster_path || "");
//             setGenres(data?.genres || []);
//             setRuntime(dataRuntime || "N/A");
//             setDescription(data?.overview || "No description available");
//             setTMDbScore(data?.vote_average || null);
//             setSocials(dataSocials || {});
//             setHomePage(data?.homepage || "");
//             setDirector(data?.created_by?.[0]?.name || "N/A");

//             if (dataImdbId) {
//               const ratingsResponse = await getSeriesRatings(dataImdbId);
//               if (ratingsResponse) {
//                 const dataRatings = await ratingsResponse.json();

//                 // console.log(
//                 //   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.audience
//                 //     ?.rating
//                 // );

//                 // console.log(
//                 //   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.critics
//                 //     ?.rating
//                 // );
//                 // console.log(
//                 //   dataRatings?.result?.ratings?.["IMDb"]?.audience?.rating
//                 // );

//                 setRottenTomatoesAudience(
//                   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.audience
//                     ?.rating
//                 );
//                 setRottenTomatoesCritics(
//                   dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.critics
//                     ?.rating
//                 );
//                 setIMDb(
//                   dataRatings?.result?.ratings?.["IMDb"]?.audience?.rating
//                 );
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [id, type]);

//   const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

//   const formatRuntime = (minutes: number): string => {
//     const hours = Math.floor(minutes / 60); // Get the hours
//     const remainingMinutes = minutes % 60; // Get the remaining minutes
//     return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
//   };

//   const formatTitle = (title: string): string => {
//     return title
//       .toLowerCase() // Convert to lowercase
//       .replace(/[^a-z0-9\s]/g, "") // Remove special characters (non-alphanumeric except spaces)
//       .replace(/\s+/g, "_"); // Replace spaces with underscores
//   };

//   return (
//     <div
//       className={`flex w-full ml-[1vw] transition-transform duration-700 justify-center`}
//       //style={{ width: "12.6vw", height: "40vh" }}
//     >
//       <MovieCard
//         type={type}
//         imgUrl={`${BASE_IMAGE_URL}${poster}`}
//         single={single}
//         id={id}
//       />
//       <div className="flex">
//         <div className="flex flex-col pl-[3vw]">
//           {/* Movie info here */}
//           <h2 className="w-[34vw]  text-[2vw] font-bold line-clamp-1">
//             {title}
//           </h2>
//           <div className="text-center">
//             <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.9vw]">
//               <span>{genres[0]?.name || "Undefined"}</span>
//               <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//               <span>{genres[1]?.name || "Undefined"}</span>
//               <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//               <span className="pr-[0.6vw]">
//                 {genres[2]?.name || "Undefined"}
//               </span>
//               <span className="mx-[0.6vw] text-customTextColor font-bold">
//                 {certification}
//               </span>
//               <span className="mx-[0.6vw] text-customTextColor font-bold">
//                 {type === "series"
//                   ? runtime
//                     ? `Average per episode: ${formatRuntime(runtime)}`
//                     : "N/A"
//                   : runtime
//                   ? formatRuntime(runtime)
//                   : "N/A"}
//               </span>
//             </div>
//           </div>
//           <div>
//             <p className="mt-[1vh] text-white text-base md:text-[1vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
//               {description}
//             </p>
//           </div>

//           <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[3vh] md:mb-[2vh]">
//             <Button
//               onClick={() => handleAdded(media[0].id)}
//               className={`mr-[0.5vw] h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                 isAdded[media[0].id] ? "bg-white/90 text-black font-bold" : ""
//               }`}
//             >
//               Watchlist
//               {isAdded[media[0].id] ? (
//                 <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//               ) : (
//                 <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//               )}
//             </Button>

//             <Dialog>
//               <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
//                 Trailer
//                 <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//               </DialogTrigger>
//               <DialogContent className="md:w-[70vw] md:h-[40vw]">
//                 <YoutubeTrailerPlayer
//                   //VideoEnd={handleVideoEnd}
//                   handlePlay={handlePlay}
//                   videoKey={videoKey}
//                   setIsLoading={setIsLoading}
//                   handleReload={handleReload}
//                   handleEnd={handleEnd}
//                   isListView={isListView}
//                   src={
//                     "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
//                   }
//                 />
//               </DialogContent>
//             </Dialog>

//             <Button
//               onClick={() => handleLike(media[0].id)}
//               className={`ml-[0.5vw] flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                 isLiked[media[0].id] ? "bg-white/90 text-black font-bold" : ""
//               }`}
//             >
//               Like
//               {isLiked[media[0].id] ? (
//                 <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//               ) : (
//                 <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//               )}
//             </Button>
//           </div>
//           {/* Box for Ratings */}
//           <div className="w-[22vw]">
//             <div className="w-full mt-[2vw] hidden md:block">
//               <h1 className="text-white text-base md:text-[1vw]">Ratings</h1>
//             </div>

//             {/* Box for Three Titles */}
//             <div className="w-full flex justify-between items-start mt-[1.7vh] hidden md:block">
//               <div className="flex flex-col md:flex-row justify-between">
//                 <div className="text-customTextColor text-sm md:text-[1vw]">
//                   <Link
//                     href={`https://www.rottentomatoes.com/m/${formatTitle(
//                       title
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <span>Rotten&nbsp;Tomatoes</span>
//                     <div className="flex items-center space-x-[2.5vw]">
//                       <div className="flex flex-col">
//                         <div className="flex items-center mt-[1.5vh]">
//                           {rottenTomatoesCritics && (
//                             <img
//                               className="w-[3vw] h-[3vh]"
//                               src={`/genresIcons/${
//                                 rottenTomatoesCritics >= 60
//                                   ? "Rotten_Tomatoes_Critics_Positive.svg"
//                                   : "icons8-rotten-tomatoes.svg"
//                               }`}
//                               alt="Rotten Tomatoes Icon"
//                             />
//                           )}
//                           <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                             {rottenTomatoesCritics !== null
//                               ? `${rottenTomatoesCritics}%`
//                               : "N/A"}
//                           </span>
//                         </div>
//                         <h1
//                           className={`text-[0.7vw] ${
//                             rottenTomatoesCritics === null
//                               ? "mb-[-0.5vw] mt-[0.5vw]"
//                               : "mt-[0.5vw]"
//                           }`}
//                         >
//                           Critics
//                         </h1>
//                       </div>
//                       <div className="flex flex-col">
//                         <div className="flex items-center mt-[1.5vh]">
//                           {rottenTomatoesAudience && (
//                             <img
//                               className="w-[3vw] h-[3vh]"
//                               src={`/genresIcons/${
//                                 rottenTomatoesAudience >= 60
//                                   ? "Rotten_Tomatoes_positive_audience.svg"
//                                   : "Rotten_Tomatoes_negative_audience.svg"
//                               }`}
//                               alt="Rotten Tomatoes Icon"
//                             />
//                           )}
//                           <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
//                             {rottenTomatoesAudience !== null
//                               ? `${rottenTomatoesAudience}%`
//                               : "N/A"}
//                           </span>
//                         </div>

//                         <h1
//                           className={`text-[0.7vw] ${
//                             rottenTomatoesAudience === null
//                               ? "mb-[-0.5vw] mt-[0.5vw]"
//                               : "mt-[0.5vw]"
//                           }`}
//                         >
//                           Audience
//                         </h1>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//                 <Link
//                   href={`https://www.imdb.com/title/${imdbId}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[1vw]">
//                     iMDB
//                     <div className="flex items-center">
//                       <div className="flex items-center">
//                         <img
//                           className="w-[2.4vw]"
//                           src="/genresIcons/icons8-imdb.svg"
//                           alt="Rotten Tomatoes Icon"
//                         />
//                         <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                           {imdb !== null ? imdb : "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//                 <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[5vw]">
//                   <Link
//                     href={`https://www.themoviedb.org/movie/${id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Popularity
//                     <div className="flex items-center mt-[0.8vh]">
//                       <div className="flex items-center">
//                         <img
//                           className="w-[3vw] h-[3vh]"
//                           src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
//                           alt="Popularity"
//                         />
//                         <span className="ml-[0.5vw] text-[1vw] text-white text-bold pr-[1vw]">
//                           {tmdbScore
//                             ? Math.round(tmdbScore * 10) / 10
//                             : "Undefined"}
//                         </span>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-[6vh] content-between  ml-[11vw]">
//           <div>
//             <div className="">
//               <div className="flex">
//                 <div className=" text-[1vw]">Your Score</div>
//                 <StarRating
//                   title={media[0].title}
//                   value={value}
//                   handleValue={handleValue}
//                 />
//               </div>

//               <div className="flex items-end text-[1vw] mt-[1vh]">
//                 <img
//                   className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
//                   src="/genresIcons/icons8-star.svg"
//                 />{" "}
//                 {value ? value : "--"} / 5<div></div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-[1vw]">Director</h2>
//             <span className="text-[1vw] text-customTextColor">{director}</span>
//           </div>
//           <div>
//             <h2 className="text-[1vw]">Starring</h2>
//             <span className="text-[1vw] text-customTextColor">
//               {cast[0]?.name},
//               <br />
//               {cast[1]?.name},
//               <br />
//               {cast[2]?.name}
//             </span>
//           </div>
//           <div>
//             <h2 className="text-[1vw] mb-[1vh]">Socials</h2>
//             <div className="text-customTextColor flex">
//               <Link
//                 href={homepage ? homepage : "N/A"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaLink className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
//               </Link>
//               <Link
//                 href={`${
//                   socials
//                     ? `https://www.facebook.com/${socials.facebook_id}`
//                     : `N/A`
//                 }`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaFacebook className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
//               </Link>
//               <Link
//                 href={`${
//                   socials ? `https://x.com/${socials.twitter_id}` : `N/A`
//                 }`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaXTwitter className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
//               </Link>
//               <Link
//                 href={`${
//                   socials
//                     ? `https://www.instagram.com/${socials.instagram_id}`
//                     : `N/A`
//                 }`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <AiFillInstagram className="w-[1.5vw] h-[1.5vw]" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainDetails;

"use client";
import { useState } from "react";
import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FaFacebook, FaLink, FaPlay } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import MovieCard from "@/components/cards/MovieCard";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiFillInstagram, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import StarRating from "@/components/starRating/StarRating";
import {
  getDirector,
  getMovieCertification,
  getMovieDetails,
  getRatings,
  getSocials,
} from "@/app/pages/api/singleMoviePage";
import {
  getImdbId,
  getSeriesCertification,
  getSeriesDetails,
  getSeriesRatings,
  getSeriesRuntime,
  getSeriesSocials,
} from "@/app/pages/api/singleSeriesPage";
import { useGetRatingsQuery } from "@/app/features/ratingSlice";

interface SeriesProp {
  id: number;
  title: string;
  imgUrl: string;
}

interface GenresProp {
  id: number;
  name: string;
}

interface SocialsProp {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

interface CastProp {
  character: string;
  id: number;
  name: string;
  picture: string;
}

interface MainDetailsProps {
  id: number;
  title: string;
  className?: string; // Optional className prop
  isPartialSlide?: boolean; // Optional prop to indicate if it's a partial slide
  isLastThreeSlides?: boolean;
  isLastOne?: boolean;
  list?: boolean;
  media: SeriesProp[];
  handlePlay: () => void;
  videoKey: string;
  handleReload: () => void;
  handleEnd: () => void;
  setIsLoading: (loading: boolean) => void;
  imdbId?: string;
  cast?: CastProp[];
  type: string;
  //single?:boolean
}

interface ImdbIdProp {
rating:number
}

function MainDetails({
  id,
  videoKey,
  media,
  handlePlay,
  handleReload,
  handleEnd,
  setIsLoading,
  title,
  imdbId,
  cast = [],
  type,
}: //single
MainDetailsProps) {
  const [imdb, setIMDb] = useState();
  //const [imdbIdMovie, setImdbId] = useState();
  const {
    data:rating,
    error,
    isLoading,
    isFetching,
  } = useGetRatingsQuery(imdbId || '');
  //const rating: ImdbIdProp = data;
  const [rottenTomatoesAudience, setRottenTomatoesAudience] = useState();
  const [rottenTomatoesCritics, setRottenTomatoesCritics] = useState();
  const [poster, setPoster] = useState<string>("");
  const [genres, setGenres] = useState<GenresProp[]>([]);
  const [certification, setCertification] = useState("");
  const [runtime, setRuntime] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [tmdbScore, setTMDbScore] = useState();
  const [socials, setSocials] = useState<SocialsProp>();
  const [homepage, setHomePage] = useState<string | null>(null);
  const [director, setDirector] = useState();
  const [single, setSingleMedia] = useState(true);
  const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [isListView, setIsListView] = useState(true);
  const [value, setValue] = React.useState<number | null>(0);
  const [imdbIdSeries, setImdbIdSeries] = useState("");

  if (isFetching) {
    console.log("Fetching Rating new data...");
  } else {
    console.log("Using cached Rating data...");
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getMovieDetails(id);
  //       const data = await response.json();

  //       setImdbId(data.imdb_id || undefined);
  //     } catch (err) {
  //       console.error("Error fetching movie details:", err);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  useEffect(() => {
    if (!rating) return;

    setRottenTomatoesAudience(
      rating?.result?.ratings?.["Rotten Tomatoes"]?.audience?.rating || null
    );
    setRottenTomatoesCritics(
      rating?.result?.ratings?.["Rotten Tomatoes"]?.critics?.rating || null
    );
    setIMDb(rating?.result?.ratings?.["IMDb"]?.audience?.rating || null);
  }, [ rating]);

  if (isLoading) return <div>Loading ratings...</div>;
  if (error) return <div>Error fetching ratings.</div>;
  //const type = "movie";



  const handleAdded = (movieId: number) => {
    setIsAdded((prevAdded) => ({
      ...prevAdded,
      [movieId]: !prevAdded[movieId], // Toggle the like state for the specific movie
    }));
  };

  const handleLike = (movieId: number) => {
    setIsLiked((prevLiked) => ({
      ...prevLiked,
      [movieId]: !prevLiked[movieId], // Toggle the like state for the specific movie
    }));
  };

  const handleValue = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  // useEffect(() => {
  //   //let isMounted = true;

  //   const fetchData = async () => {
  //     try {
  //       if (type === "movie") {
  //         const response = await getMovieDetails(id);
  //         const responseCertification = await getMovieCertification(id);
  //         const responseSocials = await getSocials(id);
  //         const responseDirector = await getDirector(id);

  //         const data = await response.json();
  //         const dataCertification = await responseCertification.json();
  //         const dataSocials = await responseSocials.json();
  //         const dataDirector = await responseDirector.json();

  //         const usRelease = dataCertification?.results?.find(
  //           (item: any) => item.iso_3166_1 === "US"
  //         );

  //           setPoster(data?.poster_path || "");
  //           setGenres(data?.genres || []);
  //           setRuntime(data?.runtime || "N/A");
  //           setDescription(data?.overview || "No description available");
  //           setTMDbScore(data?.vote_average || null);
  //           setSocials(dataSocials || {});
  //           setHomePage(data?.homepage || "");
  //           setDirector(dataDirector);
  //           setImdbId(data.imdb_id || "");

  //           // if (data.imdb_id) {
  //           //   const ratingsResponse = await getRatings(data.imdb_id);
  //           //   if (ratingsResponse) {
  //           //     const dataRatings = await ratingsResponse.json();

  //           //     setRottenTomatoesAudience(
  //           //       dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.audience
  //           //         ?.rating || null
  //           //     );
  //           //     setRottenTomatoesCritics(
  //           //       dataRatings?.result?.ratings?.["Rotten Tomatoes"]?.critics
  //           //         ?.rating || null
  //           //     );
  //           //     setIMDb(
  //           //       dataRatings?.result?.ratings?.["IMDb"]?.audience?.rating ||
  //           //         null
  //           //     );
  //           //   }
  //           // }
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60); // Get the hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  };

  const formatTitle = (title: string): string => {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters (non-alphanumeric except spaces)
      .replace(/\s+/g, "_"); // Replace spaces with underscores
  };

  return (
    <div
      className={`flex w-full ml-[1vw] transition-transform duration-700 justify-center`}
      //style={{ width: "12.6vw", height: "40vh" }}
    >
      <MovieCard
        type={type}
        imgUrl={`${BASE_IMAGE_URL}${poster}`}
        single={single}
        id={id}
      />
      <div className="flex">
        <div className="flex flex-col pl-[3vw]">
          {/* Movie info here */}
          <h2 className="w-[34vw]  text-[2vw] font-bold line-clamp-1">
            {title}
          </h2>
          <div className="text-center">
            <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.9vw]">
              <span>{genres[0]?.name || "Undefined"}</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span>{genres[1]?.name || "Undefined"}</span>
              <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
              <span className="pr-[0.6vw]">
                {genres[2]?.name || "Undefined"}
              </span>
              <span className="mx-[0.6vw] text-customTextColor font-bold">
                {certification}
              </span>
              <span className="mx-[0.6vw] text-customTextColor font-bold">
                {type === "series"
                  ? runtime
                    ? `Average per episode: ${formatRuntime(runtime)}`
                    : "N/A"
                  : runtime
                  ? formatRuntime(runtime)
                  : "N/A"}
              </span>
            </div>
          </div>
          <div>
            <p className="mt-[1vh] text-white text-base md:text-[1vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[3vh] md:mb-[2vh]">
            <Button
              onClick={() => handleAdded(media[0].id)}
              className={`mr-[0.5vw] h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                isAdded[media[0].id] ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Watchlist
              {isAdded[media[0].id] ? (
                <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
              ) : (
                <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
              )}
            </Button>

            <Dialog>
              <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
                Trailer
                <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
              </DialogTrigger>
              <DialogContent className="md:w-[70vw] md:h-[40vw]">
                <YoutubeTrailerPlayer
                  //VideoEnd={handleVideoEnd}
                  handlePlay={handlePlay}
                  videoKey={videoKey}
                  setIsLoading={setIsLoading}
                  handleReload={handleReload}
                  handleEnd={handleEnd}
                  isListView={isListView}
                  src={
                    "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
                  }
                />
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => handleLike(media[0].id)}
              className={`ml-[0.5vw] flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                isLiked[media[0].id] ? "bg-white/90 text-black font-bold" : ""
              }`}
            >
              Like
              {isLiked[media[0].id] ? (
                <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
              ) : (
                <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
              )}
            </Button>
          </div>
          {/* Box for Ratings */}
          <div className="w-[22vw]">
            <div className="w-full mt-[2vw] hidden md:block">
              <h1 className="text-white text-base md:text-[1vw]">Ratings</h1>
            </div>

            {/* Box for Three Titles */}
            <div className="w-full flex justify-between items-start mt-[1.7vh] hidden md:block">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="text-customTextColor text-sm md:text-[1vw]">
                  <Link
                    href={`https://www.rottentomatoes.com/m/${formatTitle(
                      title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Rotten&nbsp;Tomatoes</span>
                    <div className="flex items-center space-x-[2.5vw]">
                      <div className="flex flex-col">
                        <div className="flex items-center mt-[1.5vh]">
                          {rottenTomatoesCritics && (
                            <img
                              className="w-[3vw] h-[3vh]"
                              src={`/genresIcons/${
                                rottenTomatoesCritics >= 60
                                  ? "Rotten_Tomatoes_Critics_Positive.svg"
                                  : "icons8-rotten-tomatoes.svg"
                              }`}
                              alt="Rotten Tomatoes Icon"
                            />
                          )}
                          <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                            {rottenTomatoesCritics !== null
                              ? `${rottenTomatoesCritics}%`
                              : "N/A"}
                          </span>
                        </div>
                        <h1
                          className={`text-[0.7vw] ${
                            rottenTomatoesCritics === null
                              ? "mb-[-0.5vw] mt-[0.5vw]"
                              : "mt-[0.5vw]"
                          }`}
                        >
                          Critics
                        </h1>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center mt-[1.5vh]">
                          {rottenTomatoesAudience && (
                            <img
                              className="w-[3vw] h-[3vh]"
                              src={`/genresIcons/${
                                rottenTomatoesAudience >= 60
                                  ? "Rotten_Tomatoes_positive_audience.svg"
                                  : "Rotten_Tomatoes_negative_audience.svg"
                              }`}
                              alt="Rotten Tomatoes Icon"
                            />
                          )}
                          <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
                            {rottenTomatoesAudience !== null
                              ? `${rottenTomatoesAudience}%`
                              : "N/A"}
                          </span>
                        </div>

                        <h1
                          className={`text-[0.7vw] ${
                            rottenTomatoesAudience === null
                              ? "mb-[-0.5vw] mt-[0.5vw]"
                              : "mt-[0.5vw]"
                          }`}
                        >
                          Audience
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  href={`https://www.imdb.com/title/${imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[1vw]">
                    iMDB
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img
                          className="w-[2.4vw]"
                          src="/genresIcons/icons8-imdb.svg"
                          alt="Rotten Tomatoes Icon"
                        />
                        <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                          {imdb !== null ? imdb : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[5vw]">
                  <Link
                    href={`https://www.themoviedb.org/movie/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Popularity
                    <div className="flex items-center mt-[0.8vh]">
                      <div className="flex items-center">
                        <img
                          className="w-[3vw] h-[3vh]"
                          src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                          alt="Popularity"
                        />
                        <span className="ml-[0.5vw] text-[1vw] text-white text-bold pr-[1vw]">
                          {tmdbScore
                            ? Math.round(tmdbScore * 10) / 10
                            : "Undefined"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[6vh] content-between  ml-[11vw]">
          <div>
            <div className="">
              <div className="flex">
                <div className=" text-[1vw]">Your Score</div>
                <StarRating
                  title={media[0].title}
                  value={value}
                  handleValue={handleValue}
                />
              </div>

              <div className="flex items-end text-[1vw] mt-[1vh]">
                <img
                  className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                  src="/genresIcons/icons8-star.svg"
                />{" "}
                {value ? value : "--"} / 5<div></div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[1vw]">Director</h2>
            <span className="text-[1vw] text-customTextColor">{director}</span>
          </div>
          <div>
            <h2 className="text-[1vw]">Starring</h2>
            <span className="text-[1vw] text-customTextColor">
              {cast[0]?.name},
              <br />
              {cast[1]?.name},
              <br />
              {cast[2]?.name}
            </span>
          </div>
          <div>
            <h2 className="text-[1vw] mb-[1vh]">Socials</h2>
            <div className="text-customTextColor flex">
              <Link
                href={homepage ? homepage : "N/A"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
              </Link>
              <Link
                href={`${
                  socials
                    ? `https://www.facebook.com/${socials.facebook_id}`
                    : `N/A`
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
              </Link>
              <Link
                href={`${
                  socials ? `https://x.com/${socials.twitter_id}` : `N/A`
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
              </Link>
              <Link
                href={`${
                  socials
                    ? `https://www.instagram.com/${socials.instagram_id}`
                    : `N/A`
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram className="w-[1.5vw] h-[1.5vw]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDetails;
