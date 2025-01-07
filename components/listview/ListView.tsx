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
//   useGetMovieTrailerQuery,
// } from "@/app/features/homepage/movies/moviedetailsSlice";
// import { useGetRatingsQuery } from "@/app/features/ratingsSlice";
// import { getSession } from "next-auth/react";

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
//   //mediaSearch: Movie[];
//   media_type: string;
//   poster_path: string;
//   title?: string;
//   overview: string;
//   backdrop_path: string;
//   //name?:string
//   list?: boolean;
//   watchlist?: boolean;
//   watched?: boolean;
//   value?: number | null; //This was commented out
//   handleValue?: (newValue: number | null) => void; //This was commented out
//   mediaType?: string; // Indicates the type of content
//   id: number;
//   //likes?: number[];
//   // genresMovie?: GenresType[];
// }

// interface CastMember {
//   name: string;
// }

// function ListView({
//   filter,
//   //mediaSearch,
//   list,
//   watchlist,
//   watched,
//   value,
//   id,
//   media_type,
//   poster_path,
//   title,
//   overview,
//   backdrop_path,
//   //likes,
// }: //name
// //genresMovie,
// //value,
// //handleValue,
// ListViewProp) {
//   const [isAdded, setIsAdded] = useState<Record<number, boolean>>({}); //Record<number, boolean> means that the object will have keys of type number (e.g., movie IDs) and values of type boolean (e.g., true or false to indicate if a movie is added).
//   const [isLiked, setIsLiked] = useState(false);
//   const [scores, setScores] = useState<Record<number, number | null>>({}); //Purpose: This state variable, scores, keeps track of the rating (or score) for each movie.
//   //Type: Record<number, number | null> means scores is an object where each key is a movie ID (number) and each value is a number representing the movie’s score or null if there’s no score yet.
//   //Initial Value: {}, so initially, no movie has a score.
//   const [isTrailer, setIsTrailer] = useState(false);
//   //const [videoKey3, setVideoKey3] = useState("o17MF9vnabg"); // avatar
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
//   const [videoKey, setVideoKey] = useState("");
//   const [likes, setLikes] = useState<number[]>([]);

//   const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

//   const { data: rating } = useGetRatingsQuery(imdbId || "");

//   const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);
//   const { data: movieDirector } = useGetDirectorQuery(id || 0);

//   const { data: movieCast } = useGetMovieCastQuery(id || 0);

//   const { data: movieTrailer } = useGetMovieTrailerQuery(id || 0);

//   useEffect(() => {
//     const handleLike = async () => {
//       try {
//         const res = await fetch("/api/likes", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (res.status === 400) {
//           console.log("Error");
//         }

//         if (res.status === 200) {
//           const data = await res.json(); // Parse the JSON response
//           setLikes(data.likes);
//         }
//       } catch (error) {
//         console.error("Error adding like:", error);
//       }
//     };

//     handleLike();
//   }, []);

//   useEffect(()=>{
//     if (likes?.includes(id)) {
//       setIsLiked(true);
//     } else {
//       setIsLiked(false);
//     }
//   },[likes])

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
//         rating?.result?.ratings?.["Rotten Tomatoes"]?.audience?.rating || null
//       );
//       setRottenTomatoesCritics(
//         rating?.result?.ratings?.["Rotten Tomatoes"]?.critics?.rating || null
//       );
//       setIMDb(rating?.result?.ratings?.["IMDb"]?.audience?.rating || null);
//     }

//     if (movieDirector) {
//       setDirector(movieDirector || {});
//     }

//     if (movieTrailer) {
//       setVideoKey(movieTrailer.key);
//     }

//     if (movieCast) {
//       setCast(movieCast);
//     }
//   }, [movieDetails, rating, movieDirector, movieCast]);

//   // const findGenreName = (genreId: number, genresMovie: GenresType[]) => {
//   //   const genre = genresMovie.find((item: any) => genreId === item.id);
//   //   return genre ? genre.tag : "Unknown Genre";
//   // };

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

//   const handleLike = async (like: any) => {
//     const session = await getSession();

//     console.log("Session", session);
//     const userEmail = session?.user?.email; // ✅ Securely fetch userId from session

//     if (isLiked === false) {
//       try {
//         const res = await fetch("/api/likes", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userEmail, like }),
//         });

//         if (res.status === 400) {
//           console.log("Error");
//         }

//         if (res.status === 200) {
//           console.log("Like added:");
//           setIsLiked(true);
//         }
//       } catch (error) {
//         console.error("Error adding like:", error);
//       }
//     } else {
//       try {
//         const res = await fetch("/api/likes", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userEmail, like }),
//         });

//         if (res.status === 400) {
//           console.log("Error");
//         }

//         if (res.status === 200) {
//           console.log("Like removed");
//           setIsLiked(false);
//         }
//       } catch (error) {
//         console.error("Error adding like:", error);
//       }
//     }
//   };

//   // const handleLike = (movieId: number) => {
//   //   if (likes?.includes(movieId)) {
//   //     setIsLiked(true);
//   //   } else {
//   //     setIsLiked(false);
//   //   }
//   // };

//   // const handleLike = (movieId: number) => {
//   //   setIsLiked((prevLiked) => ({
//   //     ...prevLiked,
//   //     [movieId]: !prevLiked[movieId], // Toggle the like state for the specific movie
//   //   }));
//   // };

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

//   //const isLastOne = filter ? index === 5 : index === 6;

//   return (
//     <div
//       className={`flex flex-col gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
//         filter ? "" : ""
//       }`}
//     >
//       {/* {mediaSearch.map((media, index) => { */}

//       {/* return ( */}
//       <div className="flex flex-col w-full">
//         <div
//           className={`flex w-full m-[1vw] transition-transform duration-700`}
//           //style={{ width: "12.6vw", height: "40vh" }}
//         >
//           <MovieCard
//             type={media_type}
//             imgUrl={poster_path}
//             //title={movie.title}
//             //isLastOne={isLastOne}
//             list={list}
//             id={id}
//           />
//           <div className="flex">
//             <div className="flex flex-col pl-[3vw]">
//               {/* Movie info here */}
//               <h2 className="text-[1.5vw] font-bold">{title}</h2>
//               <div className="text-center">
//                 <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.7vw]">
//                   <span>
//                     {" "}
//                     {genres[0]?.name || "Undefined"}
//                     {/* {media.genre_ids
//                           ? findGenreName(media.genre_ids[0], genresMovie)
//                           : ""} */}
//                   </span>
//                   <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//                   <span>
//                     {genres[1]?.name || "Undefined"}
//                     {/* {media.genre_ids
//                           ? findGenreName(media.genre_ids[1], genresMovie)
//                           : ""} */}
//                   </span>
//                   <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//                   <span className="pr-[0.6vw]">
//                     {genres[2]?.name || "Undefined"}
//                     {/* {media.genre_ids
//                           ? findGenreName(media.genre_ids[2], genresMovie)
//                           : ""} */}
//                   </span>
//                   <span className="mx-[0.6vw] text-customTextColor font-bold">
//                     {certification}
//                   </span>
//                   <span className="mx-[0.6vw] text-customTextColor font-bold">
//                     {runtime !== undefined ? formatRuntime(runtime) : "N/A"}
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <p className="mt-[1vh] text-white text-base md:text-[0.9vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
//                   {overview}
//                 </p>
//               </div>

//               <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[2vh] md:mb-[2vh]">
//                 <Link href="/singlemovie">
//                   <Button
//                     className={`h-10 w-28 md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                       watched ? "" : "md:mr-[1vw]"
//                     }`}
//                   >
//                     View
//                     <SlArrowRight className="w-[2vw] h-[2vh] ml-6 md:ml-[1vw]" />
//                   </Button>
//                 </Link>

//                 {watched ? (
//                   ""
//                 ) : (
//                   <Button
//                     onClick={() => handleAdded(id)}
//                     className={`h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                       isAdded[id] ? "bg-white/90 text-black font-bold" : ""
//                     }`}
//                   >
//                     Watchlist
//                     {isAdded[id] ? (
//                       <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                     ) : (
//                       <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                     )}
//                   </Button>
//                 )}

//                 <Button onClick={() => setIsTrailer(!isTrailer)} className={``}>
//                   <Dialog>
//                     <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
//                       Trailer
//                       <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                     </DialogTrigger>
//                     <DialogContent className="md:w-[70vw] md:h-[40vw]">
//                       <YoutubeTrailerPlayer
//                         //VideoEnd={handleVideoEnd}
//                         handlePlay={handlePlay}
//                         videoKey={videoKey}
//                         setIsLoading={setIsLoading}
//                         handleReload={handleReload}
//                         handleEnd={handleEnd}
//                         isListView={isListView}
//                         //handleFullscreen={handleFullscreen}
//                         //handleExpand={handleExpand}
//                         //unmute={unmute}
//                         //pause={pause}
//                         //reload={reload}
//                         //handleReload={handleReload}
//                         //handleStarted={handleStarted}
//                         src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
//                       />
//                     </DialogContent>
//                   </Dialog>
//                 </Button>

//                 <Button
//                   type="submit"
//                   onClick={() => handleLike(id)}
//                   className={`flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                     isLiked ? "bg-white/90 text-black font-bold" : ""
//                   }`}
//                 >
//                   Like
//                   {isLiked ? (
//                     <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//                   ) : (
//                     <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//                   )}
//                 </Button>
//               </div>
//               {/* Box for Ratings */}
//               <div className="w-[22vw]">
//                 <div className="w-full mt-[1vw] hidden md:block">
//                   <h1 className="text-white text-base md:text-[0.9vw]">
//                     Ratings
//                   </h1>
//                 </div>

//                 {/* Box for Three Titles */}
//                 <div className="w-full flex justify-between items-start mt-[1vh] hidden md:block">
//                   <div className="flex flex-col md:flex-row justify-between">
//                     <div className="text-customTextColor text-sm md:text-[0.9vw]">
//                       <span>Rotten&nbsp;Tomatoes</span>
//                       <div className="flex items-center space-x-[2.5vw]">
//                         {/* <div className="flex items-center mt-[1.5vh]"> */}
//                         <div className="flex flex-col">
//                           <div className="flex items-center mt-[1.5vh]">
//                             {rottenTomatoesCritics && (
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src={`/genresIcons/${
//                                   rottenTomatoesCritics >= 60
//                                     ? "Rotten_Tomatoes_Critics_Positive.svg"
//                                     : "icons8-rotten-tomatoes.svg"
//                                 }`}
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                             )}
//                             <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                               {rottenTomatoesCritics !== null
//                                 ? `${rottenTomatoesCritics}%`
//                                 : "N/A"}
//                             </span>
//                           </div>
//                           <h1 className="text-[0.7vw] mt-[0.5vw]">Critics</h1>
//                         </div>
//                         {/* </div> */}
//                         {/* <div className="flex items-center mt-[1.5vh]"> */}
//                         <div className="flex flex-col">
//                           <div className="flex items-center mt-[1.5vh]">
//                             {rottenTomatoesAudience && (
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src={`/genresIcons/${
//                                   rottenTomatoesAudience >= 60
//                                     ? "Rotten_Tomatoes_positive_audience.svg"
//                                     : "Rotten_Tomatoes_negative_audience.svg"
//                                 }`}
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                             )}
//                             <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[2.5vw]">
//                               {rottenTomatoesAudience !== null
//                                 ? `${rottenTomatoesAudience}%`
//                                 : "N/A"}
//                             </span>
//                           </div>

//                           <h1 className="text-[0.7vw] mt-[0.5vw]">Audience</h1>
//                         </div>
//                         {/* </div> */}
//                       </div>
//                       {/* <div className="flex items-center">
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
//                     </div>
//                     <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[2vw]">
//                       iMDB
//                       <div className="flex items-center">
//                         <div className="flex items-center">
//                           <img
//                             className="w-[2.4vw]"
//                             src="/genresIcons/icons8-imdb.svg"
//                             alt="Rotten Tomatoes Icon"
//                           />
//                           <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold">
//                             {imdb !== null ? imdb : "N/A"}
//                           </span>
//                         </div>
//                       </div>
//                       {/* <div className="flex items-center">
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
//                     </div>
//                     <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[0.9vw] md:ml-[5vw]">
//                       Popularity
//                       <div className="flex items-center mt-[0.8vh]">
//                         <div className="flex items-center">
//                           <img
//                             className="w-[3vw] h-[3vh]"
//                             src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
//                             alt="Popularity"
//                           />
//                           <span className="ml-[0.5vw] text-[0.9vw] text-white text-bold pr-[1vw]">
//                             {tmdbScore
//                               ? Math.round(tmdbScore * 10) / 10
//                               : "Undefined"}
//                           </span>
//                         </div>
//                       </div>
//                       {/* <div className="flex items-center mt-[0.8vh]">
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
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col gap-[9vh] content-between p-[1vw] ml-[10vw]">
//               <div>
//                 <div className="">
//                   <div className="flex">
//                     <div className=" text-[1vw]">Your Score</div>
//                     <StarRating
//                       title={title || undefined}
//                       //name={name}
//                       value={scores[id] || null}
//                       handleValue={(newValue) =>
//                         handleScoreChange(id, newValue)
//                       }
//                     />
//                   </div>

//                   <div className="flex items-end text-[1vw] mt-[1vh]">
//                     <img
//                       className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
//                       src="genresIcons/icons8-star.svg"
//                     />{" "}
//                     {scores[id] ? scores[id] : "--"} / 5<div></div>
//                   </div>
//                   {/* <div className=" text-[0.9vw]">Your Score</div>
//                       <div className="flex items-end text-[1vw] mt-[1vh]">
//                         <img
//                           className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
//                           src="genresIcons/icons8-star.svg"
//                         />{" "}
//                         8.5/10
//                       </div> */}
//                 </div>
//               </div>
//               <div>
//                 <h2 className="text-[0.9vw]">Director</h2>
//                 <span className="text-[0.9vw] text-customTextColor">
//                   {director}
//                 </span>
//               </div>
//               <div>
//                 <h2 className="text-[0.9vw]">Starring</h2>
//                 <span className="text-[0.9vw] text-customTextColor">
//                   {cast[0]?.name},
//                   <br />
//                   {cast[1]?.name},
//                   <br />
//                   {cast[2]?.name}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Divider line */}
//         <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
//       </div>
//       {/* ); */}
//       {/* })} */}
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa";
import YoutubeTrailerPlayer from "../trailer/YoutubeTrailerPlayer";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import StarRating from "../starRating/StarRating";
import {
  useGetDirectorQuery,
  useGetMovieCastQuery,
  useGetMovieCertificationQuery,
  useGetMovieDetailsQuery,
  useGetMovieTrailerQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import { useGetRatingsQuery } from "@/app/features/ratingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/store";
import handleLikeBtn from "@/utils/handleLikeBtn";
import handleWatchlistBtn from "@/utils/handleWatchlistBtn";

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
  backdrop_path: string;
  //name?:string
  list?: boolean;
  watchlist?: boolean;
  watched?: boolean;
  //value: number | null; //This was commented out
  //handleValue: (newValue: number) => void; //This was commented out
  mediaType?: string; // Indicates the type of content
  id: number;
  //likes?: number[];
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
  //value,
  id,
  media_type,
  poster_path,
  title,
  overview,
  backdrop_path,
  mediaType,
  //handleValue
}: ListViewProp) {
  const [isAdded, setIsAdded] = useState(false); //Record<number, boolean> means that the object will have keys of type number (e.g., movie IDs) and values of type boolean (e.g., true or false to indicate if a movie is added).
  const [isLiked, setIsLiked] = useState(false);
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
  //const [likes, setLikes] = useState<number[]>([]);
  const [value, setValue] = React.useState<number>(0);

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: rating } = useGetRatingsQuery(imdbId || "");

  const { data: movieCertification } = useGetMovieCertificationQuery(id || 0);
  const { data: movieDirector } = useGetDirectorQuery(id || 0);

  const { data: movieCast } = useGetMovieCastQuery(id || 0);

  const { data: movieTrailer } = useGetMovieTrailerQuery(id || 0);

  const dispatch = useDispatch();
  const likesdb = useSelector((state: RootState) => state.content.likes);

  const watchlistdb = useSelector(
    (state: RootState) => state.content.watchlist
  );

  const scoredb = useSelector((state: RootState) => state.content.score);

  useEffect(() => {
    const Liked = likesdb.map((like) => like.id).includes(id);

    const Watchlisted = watchlistdb
      .map((watchlist) => watchlist.id)
      .includes(id);
    //console.log("Liked", Liked);

    const Score = scoredb.map((score) => score.id).includes(id);

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

    if (Score) {
      const res = scoredb.filter((item: any) => {
        return item.id === id;
      });
      console.log("RES", res);

      setValue(res[0].score);
    } else {
      setValue(0);
    }

  }, [id]); // Run only once when the component mounts or id changes

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

  const handleReload = () => {};

  const handleEnd = () => {};

  const handleExpand = () => {};

  const handleFullscreen = () => {};

  const handlePlay = () => {};

  const handleLike = async () => {
    handleLikeBtn(dispatch, setIsLiked, isLiked, id, media_type);
  };

  const handleAdded = async () => {
    handleWatchlistBtn(dispatch, setIsAdded, isAdded, id, media_type);
  };

  const handleScoreChange = (movieId: number, newValue: number | null) => {
    setScores((prevScores) => ({
      ...prevScores,
      [movieId]: newValue,
    }));
  };

  const handleValue = (newValue: number) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };
  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div
      className={`flex flex-col gap-y-[5vh] mt-[2vh] mb-[5vh] transition-all duration-700 ease-in-out ${
        filter ? "" : ""
      }`}
    >
      <div className="flex flex-col w-full">
        <div
          className={`flex w-full m-[1vw] transition-transform duration-700`}
        >
          <MovieCard
            type={media_type}
            imgUrl={poster_path}
            list={list}
            id={id}
          />
          <div className="flex">
            <div className="flex flex-col pl-[3vw]">
              {/* Movie info here */}
              <h2 className="text-[1.5vw] font-bold">{title}</h2>
              <div className="text-center">
                <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.7vw]">
                  <span> {genres[0]?.name || "Undefined"}</span>
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
                    onClick={() => handleAdded()}
                    className={`h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                      isAdded ? "bg-white/90 text-black font-bold" : ""
                    }`}
                  >
                    Watchlist
                    {isAdded ? (
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
                        handlePlay={handlePlay}
                        videoKey={videoKey}
                        setIsLoading={setIsLoading}
                        handleReload={handleReload}
                        handleEnd={handleEnd}
                        isListView={isListView}
                        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                      />
                    </DialogContent>
                  </Dialog>
                </Button>

                <Button
                  type="submit"
                  onClick={() => handleLike()}
                  className={`flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
                    isLiked ? "bg-white/90 text-black font-bold" : ""
                  }`}
                >
                  Like
                  {isLiked ? (
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
                      </div>
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
                      title={title}
                      value={value}
                      handleValue={handleValue}
                      id={id}
                      mediaType={media_type}
                    />
                    {/* <StarRating
                      title={title || undefined}
                      //name={name}
                      value={scores[id] || null}
                      handleValue={(newValue) =>
                        handleScoreChange(id, newValue)
                      }
                    /> */}
                  </div>

                  <div className="flex items-end text-[1vw] mt-[1vh]">
                    <img
                      className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
                      src="genresIcons/icons8-star.svg"
                    />{" "}
                    {value ? value : "--"} / 5<div></div>
                  </div>
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
