// import React, { useEffect, useState } from "react";
// import MovieCard from "../cards/MovieCard";
// import { GoDotFill } from "react-icons/go";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { SlArrowRight } from "react-icons/sl";
// import { IoCheckmark } from "react-icons/io5";
// import { LuPlus } from "react-icons/lu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { FaPlay } from "react-icons/fa";
// import YoutubeTrailerPlayer from "../trailer/YoutubeTrailerPlayer";
// import { AiFillLike, AiOutlineLike } from "react-icons/ai";
// import StarRating from "../starRating/StarRating";
// import { useGetGenresQuery } from "@/app/features/loginpage/loginSlice";
// import {
//   useGetDirectorQuery,
//   useGetMovieCastQuery,
//   useGetMovieCertificationQuery,
//   useGetMovieDetailsQuery,
// } from "@/app/features/homepage/movies/moviedetailsSlice";
// import { useGetRatingsQuery } from "@/app/features/ratingsSlice";

// interface GenresType {
//   id: number;
//   tag: string;
// }

// interface Genre {
//   id: number;
//   name: string;
// }

// const genresMovie = [
//   { id: 28, tag: "Action" },
//   { id: 12, tag: "Adventure" },
//   { id: 16, tag: "Animated" },
//   { id: 35, tag: "Comedy" },
//   { id: 80, tag: "Crime" },
//   { id: 10751, tag: "Family" },
//   { id: 878, tag: "SciFi" }, // Science Fiction
//   { id: 18, tag: "Drama" },
//   { id: 27, tag: "Horror" },
//   { id: 53, tag: "Thriller" },
//   { id: 10749, tag: "Romance" },
//   { id: 36, tag: "History" },
//   { id: 9648, tag: "Mystery" },
//   { id: 10752, tag: "War" },
//   { id: 37, tag: "Western" },
//   { id: 99, tag: "Documentary" },
//   { id: 10402, tag: "Music" },
//   { id: 14, tag: "Fantasy" },
// ];

// interface Movie {
//   id: number;
//   title?: string;
//   poster_path: string;
//   media_type: string; // Add type here to indicate the media type
//   backdrop_path: string;
//   name?: string;
//   overview?: string;
//   genre_ids?: number[];
// }

// interface ListViewProp {
//   filter?: boolean;
//   mediaSearch: Movie[];
//   list?: boolean;
//   watchlist?: boolean;
//   watched?: boolean;
//   value?: number | null; //This was commented out
//   handleValue: (newValue: number | null) => void; //This was commented out
//   mediaType?: string; // Indicates the type of content
//   id:number
//   // genresMovie?: GenresType[];
// }

// interface CastMember {
//   name: string;
// }

// function ListView({
//   filter,
//   mediaSearch,
//   list,
//   watchlist,
//   watched,
//   value,
//   id
// }: //genresMovie,
// //value,
// //handleValue,
// ListViewProp) {
//   const [isAdded, setIsAdded] = useState<Record<number, boolean>>({}); //Record<number, boolean> means that the object will have keys of type number (e.g., movie IDs) and values of type boolean (e.g., true or false to indicate if a movie is added).
//   const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
//   const [scores, setScores] = useState<Record<number, number | null>>({}); //Purpose: This state variable, scores, keeps track of the rating (or score) for each movie.
//   //Type: Record<number, number | null> means scores is an object where each key is a movie ID (number) and each value is a number representing the movie’s score or null if there’s no score yet.
//   //Initial Value: {}, so initially, no movie has a score.
//   const [isTrailer, setIsTrailer] = useState(false);
//   const [videoKey3, setVideoKey3] = useState("o17MF9vnabg"); // avatar
//   const [isLoading, setIsLoading] = useState(false); // Track loading state
//   const [isListView, setIsListView] = useState(true);
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [imdbId, setImdbId] = useState();
//   const [certification, setCertification] = useState();
//   const [rottenTomatoesAudience, setRottenTomatoesAudience] = useState<
//     number | null
//   >(null);
//   const [rottenTomatoesCritics, setRottenTomatoesCritics] = useState<
//     number | null
//   >(null);
//   const [imdb, setIMDb] = useState<number | null>(null);
//   const [tmdbScore, setTMDbScore] = useState<number | null>(null);
//   const [runtime, setRuntime] = useState();
//   const [director, setDirector] = useState();
//   const [cast, setCast] = useState<CastMember[]>([]);

//   const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

//   const { data: rating } = useGetRatingsQuery(imdbId || "");

//   const { data: movieCertification } = useGetMovieCertificationQuery(
//     id || 0
//   );
//   const { data: movieDirector } = useGetDirectorQuery(id || 0);

//   const { data: movieCast } = useGetMovieCastQuery(id || 0);

//   useEffect(() => {
//     if (movieDetails) {
//       setGenres(movieDetails?.genres || []);
//       setRuntime(movieDetails?.runtime || "N/A");
//       setTMDbScore(movieDetails?.vote_average || null);
//       setImdbId(movieDetails.imdb_id || null);
//     }

//     if (movieCertification) {
//       setCertification(movieCertification);
//     }

//     if (rating) {
//       setRottenTomatoesAudience(
//         rating?.result?.ratings?.["Rotten Tomatoes"]?.audience?.rating ||
//           null
//       );
//       setRottenTomatoesCritics(
//         rating?.result?.ratings?.["Rotten Tomatoes"]?.critics?.rating ||
//           null
//       );
//       setIMDb(
//         rating?.result?.ratings?.["IMDb"]?.audience?.rating || null
//       );
//     }

//     if (movieDirector) {
//       setDirector(movieDirector || {});
//     }

//     if (movieCast) {
//       setCast(movieCast);
//     }
//   }, [movieDetails, movieDirector, movieCast]);

//   const findGenreName = (genreId: number, genresMovie: GenresType[]) => {
//     const genre = genresMovie.find((item: any) => genreId === item.id);
//     return genre ? genre.tag : "Unknown Genre";
//   };

//   const handleReload = () => {};

//   const handleEnd = () => {};

//   const handleExpand = () => {};

//   const handleFullscreen = () => {};

//   const handlePlay = () => {};

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

//   const handleScoreChange = (movieId: number, newValue: number | null) => {
//     setScores((prevScores) => ({
//       ...prevScores,
//       [movieId]: newValue,
//     }));
//   };

//   const formatRuntime = (minutes: number): string => {
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//     return `${hours}h ${remainingMinutes}m`;
//   };

//   return (
//     <div
//       className={`flex flex-col gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
//         filter ? "" : ""
//       }`}
//     >
//       {mediaSearch.map((media, index) => {

//         const isLastOne = filter ? index === 5 : index === 6;

//         return (
//           <div key={media.id} className="flex flex-col w-full">
//             <div
//               className={`flex w-full m-[1vw] transition-transform duration-700`}
//               //style={{ width: "12.6vw", height: "40vh" }}
//             >
//               <MovieCard
//                 type={media.media_type}
//                 imgUrl={media.poster_path}
//                 //title={movie.title}
//                 isLastOne={isLastOne}
//                 list={list}
//                 id={media.id}
//               />
//               <div className="flex">
//                 <div className="flex flex-col pl-[3vw]">
//                   {/* Movie info here */}
//                   <h2 className="text-[1.5vw] font-bold">
//                     {media.title || media.name}
//                   </h2>
//                   <div className="text-center">
//                     <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.7vw]">
//                       <span>
//                         {" "}
//                         {genres[0]?.name || "Undefined"}
//                         {/* {media.genre_ids
//                           ? findGenreName(media.genre_ids[0], genresMovie)
//                           : ""} */}
//                       </span>
//                       <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//                       <span>
//                         {genres[1]?.name || "Undefined"}
//                         {/* {media.genre_ids
//                           ? findGenreName(media.genre_ids[1], genresMovie)
//                           : ""} */}
//                       </span>
//                       <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//                       <span className="pr-[0.6vw]">
//                         {genres[2]?.name || "Undefined"}
//                         {/* {media.genre_ids
//                           ? findGenreName(media.genre_ids[2], genresMovie)
//                           : ""} */}
//                       </span>
//                       <span className="mx-[0.6vw] text-customTextColor font-bold">
//                         {certification}
//                       </span>
//                       <span className="mx-[0.6vw] text-customTextColor font-bold">
//                         {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="mt-[1vh] text-white text-base md:text-[0.9vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
//                       {media.overview}
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[2vh] md:mb-[2vh]">
//                     <Link href="/singlemovie">
//                       <Button
//                         className={`h-10 w-28 md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                           watched ? "" : "md:mr-[1vw]"
//                         }`}
//                       >
//                         View
//                         <SlArrowRight className="w-[2vw] h-[2vh] ml-6 md:ml-[1vw]" />
//                       </Button>
//                     </Link>

//                     {watched ? (
//                       ""
//                     ) : (
//                       <Button
//                         onClick={() => handleAdded(media.id)}
//                         className={`h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                           isAdded[media.id]
//                             ? "bg-white/90 text-black font-bold"
//                             : ""
//                         }`}
//                       >
//                         Watchlist
//                         {isAdded[media.id] ? (
//                           <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                         ) : (
//                           <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                         )}
//                       </Button>
//                     )}

//                     <Button
//                       onClick={() => setIsTrailer(!isTrailer)}
//                       className={``}
//                     >
//                       <Dialog>
//                         <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
//                           Trailer
//                           <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                         </DialogTrigger>
//                         <DialogContent className="md:w-[70vw] md:h-[40vw]">
//                           <YoutubeTrailerPlayer
//                             //VideoEnd={handleVideoEnd}
//                             handlePlay={handlePlay}
//                             videoKey={videoKey3}
//                             setIsLoading={setIsLoading}
//                             handleReload={handleReload}
//                             handleEnd={handleEnd}
//                             isListView={isListView}
//                             //handleFullscreen={handleFullscreen}
//                             //handleExpand={handleExpand}
//                             //unmute={unmute}
//                             //pause={pause}
//                             //reload={reload}
//                             //handleReload={handleReload}
//                             //handleStarted={handleStarted}
//                             src={
//                               "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
//                             }
//                           />
//                         </DialogContent>
//                       </Dialog>
//                     </Button>

//                     <Button
//                       onClick={() => handleLike(media.id)}
//                       className={`flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                         isLiked[media.id]
//                           ? "bg-white/90 text-black font-bold"
//                           : ""
//                       }`}
//                     >
//                       Like
//                       {isLiked[media.id] ? (
//                         <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//                       ) : (
//                         <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//                       )}
//                     </Button>
//                   </div>
//                   {/* Box for Ratings */}
//                   <div className="w-[22vw]">
//                     <div className="w-full mt-[1vw] hidden md:block">
//                       <h1 className="text-white text-base md:text-[0.9vw]">
//                         Ratings
//                       </h1>
//                     </div>

//                     {/* Box for Three Titles */}
//                     <div className="w-full flex justify-between items-start mt-[1vh] hidden md:block">
//                       <div className="flex flex-col md:flex-row justify-between">
//                         <div className="text-customTextColor text-sm md:text-[0.9vw]">
//                           <span>Rotten&nbsp;Tomatoes</span>
//                           <div className="flex items-center space-x-[2.5vw]">
//                             {/* <div className="flex items-center mt-[1.5vh]"> */}
//                             <div className="flex flex-col">
//                               <div className="flex items-center mt-[1.5vh]">
//                                 {rottenTomatoesCritics && (
//                                   <img
//                                     className="w-[3vw] h-[3vh]"
//                                     src={`/genresIcons/${
//                                       rottenTomatoesCritics >= 60
//                                         ? "Rotten_Tomatoes_Critics_Positive.svg"
//                                         : "icons8-rotten-tomatoes.svg"
//                                     }`}
//                                     alt="Rotten Tomatoes Icon"
//                                   />
//                                 )}
//                                 <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                                   {rottenTomatoesCritics !== null
//                                     ? `${rottenTomatoesCritics}%`
//                                     : "N/A"}
//                                 </span>
//                               </div>
//                               <h1 className="text-[0.7vw] mt-[0.5vw]">
//                                 Critics
//                               </h1>
//                             </div>
//                             {/* </div> */}
//                             {/* <div className="flex items-center mt-[1.5vh]"> */}
//                             <div className="flex flex-col">
//                               <div className="flex items-center mt-[1.5vh]">
//                                 {rottenTomatoesAudience && (
//                                   <img
//                                     className="w-[3vw] h-[3vh]"
//                                     src={`/genresIcons/${
//                                       rottenTomatoesAudience >= 60
//                                         ? "Rotten_Tomatoes_positive_audience.svg"
//                                         : "Rotten_Tomatoes_negative_audience.svg"
//                                     }`}
//                                     alt="Rotten Tomatoes Icon"
//                                   />
//                                 )}
//                                 <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
//                                   {rottenTomatoesAudience !== null
//                                     ? `${rottenTomatoesAudience}%`
//                                     : "N/A"}
//                                 </span>
//                               </div>

//                               <h1 className="text-[0.7vw] mt-[0.5vw]">
//                                 Audience
//                               </h1>
//                             </div>
//                             {/* </div> */}
//                           </div>
//                           {/* <div className="flex items-center">
//                             <div className="flex items-center mt-[1.5vh]">
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src="/genresIcons/icons8-rotten-tomatoes.svg"
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                               <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
//                                 80%
//                               </span>
//                             </div>
//                             <div className="flex items-center mt-[1.5vh]">
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src="/genresIcons/icons8-rotten-tomatoes.svg"
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                               <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                                 80%
//                               </span>
//                             </div>
//                           </div> */}
//                         </div>
//                         <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[2vw]">
//                           iMDB
//                           <div className="flex items-center">
//                             <div className="flex items-center">
//                               <img
//                                 className="w-[2.4vw]"
//                                 src="/genresIcons/icons8-imdb.svg"
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                               <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                                 {imdb !== null ? imdb : "N/A"}
//                               </span>
//                             </div>
//                           </div>
//                           {/* <div className="flex items-center">
//                             <div className="flex items-center">
//                               <img
//                                 className="w-[2.4vw]"
//                                 src="/genresIcons/icons8-imdb.svg"
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                               <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                                 80%
//                               </span>
//                             </div>
//                           </div> */}
//                         </div>
//                         <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[5vw]">
//                           Popularity
//                           <div className="flex items-center mt-[0.8vh]">
//                             <div className="flex items-center">
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
//                                 alt="Popularity"
//                               />
//                               <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[1vw]">
//                                 {tmdbScore
//                                   ? Math.round(tmdbScore * 10) / 10
//                                   : "Undefined"}
//                               </span>
//                             </div>
//                           </div>
//                           {/* <div className="flex items-center mt-[0.8vh]">
//                             <div className="flex items-center">
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
//                                 alt="Popularity"
//                               />
//                               <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[1vw]">
//                                 80%
//                               </span>
//                             </div>
//                           </div> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-[9vh] content-between p-[1vw] ml-[10vw]">
//                   <div>
//                     <div className="">
//                       <div className="flex">
//                         <div className=" text-[1vw]">Your Score</div>
//                         <StarRating
//                           title={media.title}
//                           name={media.name}
//                           value={scores[media.id] || null}
//                           handleValue={(newValue) =>
//                             handleScoreChange(media.id, newValue)
//                           }
//                         />
//                       </div>

//                       <div className="flex items-end text-[1vw] mt-[1vh]">
//                         <img
//                           className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
//                           src="genresIcons/icons8-star.svg"
//                         />{" "}
//                         {scores[media.id] ? scores[media.id] : "--"} / 5
//                         <div></div>
//                       </div>
//                       {/* <div className=" text-[0.9vw]">Your Score</div>
//                       <div className="flex items-end text-[1vw] mt-[1vh]">
//                         <img
//                           className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
//                           src="genresIcons/icons8-star.svg"
//                         />{" "}
//                         8.5/10
//                       </div> */}
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-[0.9vw]">Director</h2>
//                     <span className="text-[0.9vw] text-customTextColor">
//                       {director}
//                     </span>
//                   </div>
//                   <div>
//                     <h2 className="text-[0.9vw]">Starring</h2>
//                     <span className="text-[0.9vw] text-customTextColor">
//                       {cast[0]?.name},
//                       <br />
//                       {cast[1]?.name},
//                       <br />
//                       {cast[2]?.name}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Divider line */}
//             <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default ListView;

import React, { useEffect, useState } from "react";
import MovieCard from "../cards/MovieCard";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "../ui/button";
import { SlArrowRight } from "react-icons/sl";
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa";
import YoutubeTrailerPlayer from "../trailer/YoutubeTrailerPlayer";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import StarRating from "../starRating/StarRating";
import { useGetGenresQuery } from "@/app/features/loginpage/loginSlice";
import {
  useGetDirectorQuery,
  useGetMovieCastQuery,
  useGetMovieCertificationQuery,
  useGetMovieDetailsQuery,
  useGetMovieTrailerQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import { useGetRatingsQuery } from "@/app/features/ratingsSlice";

interface GenresType {
  id: number;
  tag: string;
}

interface Genre {
  id: number;
  name: string;
}

const genresMovie = [
  { id: 28, tag: "Action" },
  { id: 12, tag: "Adventure" },
  { id: 16, tag: "Animated" },
  { id: 35, tag: "Comedy" },
  { id: 80, tag: "Crime" },
  { id: 10751, tag: "Family" },
  { id: 878, tag: "SciFi" }, // Science Fiction
  { id: 18, tag: "Drama" },
  { id: 27, tag: "Horror" },
  { id: 53, tag: "Thriller" },
  { id: 10749, tag: "Romance" },
  { id: 36, tag: "History" },
  { id: 9648, tag: "Mystery" },
  { id: 10752, tag: "War" },
  { id: 37, tag: "Western" },
  { id: 99, tag: "Documentary" },
  { id: 10402, tag: "Music" },
  { id: 14, tag: "Fantasy" },
];

interface Movie {
  id: number;
  title?: string;
  poster_path: string;
  media_type: string; // Add type here to indicate the media type
  backdrop_path: string;
  name?: string;
  overview?: string;
  genre_ids?: number[];
}

interface ListViewProp {
  filter?: boolean;
  //mediaSearch: Movie[];
  media_type: string;
  poster_path: string;
  title?: string;
  overview: string;
  backdrop_path:string
  //name?:string
  list?: boolean;
  watchlist?: boolean;
  watched?: boolean;
  value?: number | null; //This was commented out
  handleValue: (newValue: number | null) => void; //This was commented out
  mediaType?: string; // Indicates the type of content
  id: number;
  // genresMovie?: GenresType[];
}

interface CastMember {
  name: string;
}

function ListView({
  filter,
  //mediaSearch,
  list,
  watchlist,
  watched,
  value,
  id,
  media_type,
  poster_path,
  title,
  overview,
  backdrop_path
}: //name
//genresMovie,
//value,
//handleValue,
ListViewProp) {
  const [isAdded, setIsAdded] = useState<Record<number, boolean>>({}); //Record<number, boolean> means that the object will have keys of type number (e.g., movie IDs) and values of type boolean (e.g., true or false to indicate if a movie is added).
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [scores, setScores] = useState<Record<number, number | null>>({}); //Purpose: This state variable, scores, keeps track of the rating (or score) for each movie.
  //Type: Record<number, number | null> means scores is an object where each key is a movie ID (number) and each value is a number representing the movie’s score or null if there’s no score yet.
  //Initial Value: {}, so initially, no movie has a score.
  const [isTrailer, setIsTrailer] = useState(false);
  //const [videoKey3, setVideoKey3] = useState("o17MF9vnabg"); // avatar
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [isListView, setIsListView] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [imdbId, setImdbId] = useState();
  const [certification, setCertification] = useState();
  const [rottenTomatoesAudience, setRottenTomatoesAudience] = useState<
    number | null
  >(null);
  const [rottenTomatoesCritics, setRottenTomatoesCritics] = useState<
    number | null
  >(null);
  const [imdb, setIMDb] = useState<number | null>(null);
  const [tmdbScore, setTMDbScore] = useState<number | null>(null);
  const [runtime, setRuntime] = useState();
  const [director, setDirector] = useState();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [videoKey, setVideoKey] = useState("");

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: rating } = useGetRatingsQuery(imdbId || "");

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);
  const { data: movieDirector } = useGetDirectorQuery(id || 0);

  const { data: movieCast } = useGetMovieCastQuery(id || 0);

  const { data: movieTrailer } = useGetMovieTrailerQuery(id || 0);

  useEffect(() => {
    if (movieDetails) {
      setGenres(movieDetails?.genres || []);
      setRuntime(movieDetails?.runtime || "N/A");
      setTMDbScore(movieDetails?.vote_average || null);
      setImdbId(movieDetails.imdb_id || null);
    }

    if (movieCertification) {
      setCertification(movieCertification);
    }

    if (rating) {
      setRottenTomatoesAudience(
        rating?.result?.ratings?.["Rotten Tomatoes"]?.audience?.rating || null
      );
      setRottenTomatoesCritics(
        rating?.result?.ratings?.["Rotten Tomatoes"]?.critics?.rating || null
      );
      setIMDb(rating?.result?.ratings?.["IMDb"]?.audience?.rating || null);
    }

    if (movieDirector) {
      setDirector(movieDirector || {});
    }

    if (movieTrailer) {
      setVideoKey(movieTrailer.key);
    }

    if (movieCast) {
      setCast(movieCast);
    }
  }, [movieDetails, rating, movieDirector, movieCast]);

  // const findGenreName = (genreId: number, genresMovie: GenresType[]) => {
  //   const genre = genresMovie.find((item: any) => genreId === item.id);
  //   return genre ? genre.tag : "Unknown Genre";
  // };

  const handleReload = () => {};

  const handleEnd = () => {};

  const handleExpand = () => {};

  const handleFullscreen = () => {};

  const handlePlay = () => {};

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

  const handleScoreChange = (movieId: number, newValue: number | null) => {
    setScores((prevScores) => ({
      ...prevScores,
      [movieId]: newValue,
    }));
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  //const isLastOne = filter ? index === 5 : index === 6;

  return (
    <div
      className={`flex flex-col gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
        filter ? "" : ""
      }`}
    >
      {/* {mediaSearch.map((media, index) => { */}

      {/* return ( */}
      <div className="flex flex-col w-full">
        <div
          className={`flex w-full m-[1vw] transition-transform duration-700`}
          //style={{ width: "12.6vw", height: "40vh" }}
        >
          <MovieCard
            type={media_type}
            imgUrl={poster_path}
            //title={movie.title}
            //isLastOne={isLastOne}
            list={list}
            id={id}
          />
          <div className="flex">
            <div className="flex flex-col pl-[3vw]">
              {/* Movie info here */}
              <h2 className="text-[1.5vw] font-bold">{title}</h2>
              <div className="text-center">
                <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.7vw]">
                  <span>
                    {" "}
                    {genres[0]?.name || "Undefined"}
                    {/* {media.genre_ids
                          ? findGenreName(media.genre_ids[0], genresMovie)
                          : ""} */}
                  </span>
                  <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
                  <span>
                    {genres[1]?.name || "Undefined"}
                    {/* {media.genre_ids
                          ? findGenreName(media.genre_ids[1], genresMovie)
                          : ""} */}
                  </span>
                  <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
                  <span className="pr-[0.6vw]">
                    {genres[2]?.name || "Undefined"}
                    {/* {media.genre_ids
                          ? findGenreName(media.genre_ids[2], genresMovie)
                          : ""} */}
                  </span>
                  <span className="mx-[0.6vw] text-customTextColor font-bold">
                    {certification}
                  </span>
                  <span className="mx-[0.6vw] text-customTextColor font-bold">
                    {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
                  </span>
                </div>
              </div>
              <div>
                <p className="mt-[1vh] text-white text-base md:text-[0.9vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
                  {overview}
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[2vh] md:mb-[2vh]">
                <Link href="/singlemovie">
                  <Button
                    className={`h-10 w-28 md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                      watched ? "" : "md:mr-[1vw]"
                    }`}
                  >
                    View
                    <SlArrowRight className="w-[2vw] h-[2vh] ml-6 md:ml-[1vw]" />
                  </Button>
                </Link>

                {watched ? (
                  ""
                ) : (
                  <Button
                    onClick={() => handleAdded(id)}
                    className={`h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                      isAdded[id] ? "bg-white/90 text-black font-bold" : ""
                    }`}
                  >
                    Watchlist
                    {isAdded[id] ? (
                      <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
                    ) : (
                      <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
                    )}
                  </Button>
                )}

                <Button onClick={() => setIsTrailer(!isTrailer)} className={``}>
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
                        //handleFullscreen={handleFullscreen}
                        //handleExpand={handleExpand}
                        //unmute={unmute}
                        //pause={pause}
                        //reload={reload}
                        //handleReload={handleReload}
                        //handleStarted={handleStarted}
                        src={
                          `https://image.tmdb.org/t/p/original${backdrop_path}`
                        }
                      />
                    </DialogContent>
                  </Dialog>
                </Button>

                <Button
                  onClick={() => handleLike(id)}
                  className={`flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                    isLiked[id] ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Like
                  {isLiked[id] ? (
                    <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                  ) : (
                    <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
                  )}
                </Button>
              </div>
              {/* Box for Ratings */}
              <div className="w-[22vw]">
                <div className="w-full mt-[1vw] hidden md:block">
                  <h1 className="text-white text-base md:text-[0.9vw]">
                    Ratings
                  </h1>
                </div>

                {/* Box for Three Titles */}
                <div className="w-full flex justify-between items-start mt-[1vh] hidden md:block">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="text-customTextColor text-sm md:text-[0.9vw]">
                      <span>Rotten&nbsp;Tomatoes</span>
                      <div className="flex items-center space-x-[2.5vw]">
                        {/* <div className="flex items-center mt-[1.5vh]"> */}
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
                          <h1 className="text-[0.7vw] mt-[0.5vw]">Critics</h1>
                        </div>
                        {/* </div> */}
                        {/* <div className="flex items-center mt-[1.5vh]"> */}
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

                          <h1 className="text-[0.7vw] mt-[0.5vw]">Audience</h1>
                        </div>
                        {/* </div> */}
                      </div>
                      {/* <div className="flex items-center">
                            <div className="flex items-center mt-[1.5vh]">
                              <img
                                className="w-[3vw] h-[3vh]"
                                src="/genresIcons/icons8-rotten-tomatoes.svg"
                                alt="Rotten Tomatoes Icon"
                              />
                              <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
                                80%
                              </span>
                            </div>
                            <div className="flex items-center mt-[1.5vh]">
                              <img
                                className="w-[3vw] h-[3vh]"
                                src="/genresIcons/icons8-rotten-tomatoes.svg"
                                alt="Rotten Tomatoes Icon"
                              />
                              <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                                80%
                              </span>
                            </div>
                          </div> */}
                    </div>
                    <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[2vw]">
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
                      {/* <div className="flex items-center">
                            <div className="flex items-center">
                              <img
                                className="w-[2.4vw]"
                                src="/genresIcons/icons8-imdb.svg"
                                alt="Rotten Tomatoes Icon"
                              />
                              <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
                                80%
                              </span>
                            </div>
                          </div> */}
                    </div>
                    <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[5vw]">
                      Popularity
                      <div className="flex items-center mt-[0.8vh]">
                        <div className="flex items-center">
                          <img
                            className="w-[3vw] h-[3vh]"
                            src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                            alt="Popularity"
                          />
                          <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[1vw]">
                            {tmdbScore
                              ? Math.round(tmdbScore * 10) / 10
                              : "Undefined"}
                          </span>
                        </div>
                      </div>
                      {/* <div className="flex items-center mt-[0.8vh]">
                            <div className="flex items-center">
                              <img
                                className="w-[3vw] h-[3vh]"
                                src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
                                alt="Popularity"
                              />
                              <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[1vw]">
                                80%
                              </span>
                            </div>
                          </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[9vh] content-between p-[1vw] ml-[10vw]">
              <div>
                <div className="">
                  <div className="flex">
                    <div className=" text-[1vw]">Your Score</div>
                    <StarRating
                      title={title || undefined}
                      //name={name}
                      value={scores[id] || null}
                      handleValue={(newValue) =>
                        handleScoreChange(id, newValue)
                      }
                    />
                  </div>

                  <div className="flex items-end text-[1vw] mt-[1vh]">
                    <img
                      className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                      src="genresIcons/icons8-star.svg"
                    />{" "}
                    {scores[id] ? scores[id] : "--"} / 5<div></div>
                  </div>
                  {/* <div className=" text-[0.9vw]">Your Score</div>
                      <div className="flex items-end text-[1vw] mt-[1vh]">
                        <img
                          className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                          src="genresIcons/icons8-star.svg"
                        />{" "}
                        8.5/10
                      </div> */}
                </div>
              </div>
              <div>
                <h2 className="text-[0.9vw]">Director</h2>
                <span className="text-[0.9vw] text-customTextColor">
                  {director}
                </span>
              </div>
              <div>
                <h2 className="text-[0.9vw]">Starring</h2>
                <span className="text-[0.9vw] text-customTextColor">
                  {cast[0]?.name},
                  <br />
                  {cast[1]?.name},
                  <br />
                  {cast[2]?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Divider line */}
        <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
}

export default ListView;
