// // "use client";
// // import { useState } from "react";
// // import EpisodeCard from "@/components/cards/EpisodeCard";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import CarouselEpisode from "@/components/carousel/CarouselEpisode";
// // import { Progress } from "@/components/ui/progress";

// // const seasons = [
// //   {
// //     season: 1,
// //     episodes: [
// //       {
// //         id: "s1e1",
// //         episode: 1,
// //         title: "Pilot",
// //         duration: "58 min",
// //         score: "96%",
// //         img: "https://image.tmdb.org/t/p/original/u90Ryx8OztC5OeVTXHPcZ8fnKoA.jpg",
// //       },
// //       {
// //         id: "s1e2",
// //         episode: 2,
// //         title: "Cat's in the Bag...",
// //         duration: "48 min",
// //         score: "88%",
// //         img: "https://image.tmdb.org/t/p/original/xwQRVskT9IK7ktbrrWc2xoT4nPv.jpg",
// //       },
// //       {
// //         id: "s1e3",
// //         episode: 3,
// //         title: "...And the Bag's in the River",
// //         duration: "48 min",
// //         score: "90%",
// //         img: "https://image.tmdb.org/t/p/original/dLgiPZCVamFcaa7Gaqudrldj15h.jpg",
// //       },
// //       {
// //         id: "s1e4",
// //         episode: 4,
// //         title: "Cancer Man",
// //         duration: "47 min",
// //         score: "86%",
// //         img: "https://image.tmdb.org/t/p/original/2UbRgW6apE4XPzhHPA726wUFyaR.jpg",
// //       },
// //       {
// //         id: "s1e5",
// //         episode: 5,
// //         title: "Gray Matter",
// //         duration: "48 min",
// //         score: "87%",
// //         img: "https://image.tmdb.org/t/p/original/82G3wZgEvZLKcte6yoZJahUWBtx.jpg",
// //       },
// //       {
// //         id: "s1e6",
// //         episode: 6,
// //         title: "Crazy Handful of Nothin'",
// //         duration: "48 min",
// //         score: "94%",
// //         img: "https://image.tmdb.org/t/p/original/rCCLuycNPL30W3BtuB8HafxEMYz.jpg",
// //       },
// //       {
// //         id: "s1e7",
// //         episode: 7,
// //         title: "A No-Rough-Stuff-Type Deal",
// //         duration: "47 min",
// //         score: "91%",
// //         img: "https://image.tmdb.org/t/p/original/1dgFAsajUpUT7DLXgAxHb9GyXHH.jpg",
// //       },
// //     ],
// //   },
// //   {
// //     season: 2,
// //     episodes: [
// //       {
// //         id: "s2e1",
// //         episode: 1,
// //         title: "Seven Thirty-Seven",
// //         duration: "47 min",
// //         score: "92%",
// //         img: "https://image.tmdb.org/t/p/original/6vMRIwd2WaGsRwR0z3C9BFEth6n.jpg",
// //       },
// //       {
// //         id: "s2e2",
// //         episode: 2,
// //         title: "Grilled",
// //         duration: "47 min",
// //         score: "94%",
// //         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
// //       },
// //       {
// //         id: "s2e3",
// //         episode: 3,
// //         title: "Bit by a Dead Bee",
// //         duration: "47 min",
// //         score: "89%",
// //         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
// //       },
// //       {
// //         id: "s2e4",
// //         episode: 4,
// //         title: "Down",
// //         duration: "47 min",
// //         score: "88%",
// //         img: "https://image.tmdb.org/t/p/original/p69fPkpnnxUmevhupJiDeYfQxxl.jpg",
// //       },
// //       {
// //         id: "s2e5",
// //         episode: 5,
// //         title: "Breakage",
// //         duration: "47 min",
// //         score: "89%",
// //         img: "https://image.tmdb.org/t/p/original/gMXeL0qcQZi5Tfd4UhnkRJeI9oa.jpg",
// //       },
// //       {
// //         id: "s2e6",
// //         episode: 6,
// //         title: "Peekaboo",
// //         duration: "47 min",
// //         score: "95%",
// //         img: "https://image.tmdb.org/t/p/original/bPQxF63jhfT5eNYjhzuGEO7oMQg.jpg",
// //       },
// //       {
// //         id: "s2e7",
// //         episode: 7,
// //         title: "Negro y Azul",
// //         duration: "47 min",
// //         score: "92%",
// //         img: "https://image.tmdb.org/t/p/original/tfCuh20gNHGGF6A1te3NmiqML6D.jpg",
// //       },
// //       {
// //         id: "s2e8",
// //         episode: 8,
// //         title: "Better Call Saul",
// //         duration: "47 min",
// //         score: "97%",
// //         img: "https://image.tmdb.org/t/p/original/1IOnhCCeru1BZUPeppu7tMmtxvL.jpg",
// //       },
// //       {
// //         id: "s2e9",
// //         episode: 9,
// //         title: "4 Days Out",
// //         duration: "47 min",
// //         score: "96%",
// //         img: "https://image.tmdb.org/t/p/original/KmFdF23FtbPwwz3FJF2T885r2Z.jpg",
// //       },
// //       {
// //         id: "s2e10",
// //         episode: 10,
// //         title: "Over",
// //         duration: "47 min",
// //         score: "91%",
// //         img: "https://image.tmdb.org/t/p/original/331AHaKegOuLZtN3kLvdrO8Yt9s.jpg",
// //       },
// //       {
// //         id: "s2e11",
// //         episode: 11,
// //         title: "Mandala",
// //         duration: "47 min",
// //         score: "94%",
// //         img: "https://image.tmdb.org/t/p/original/wGobAJ0h54788xCMkRKaJTQMMtq.jpg",
// //       },
// //       {
// //         id: "s2e12",
// //         episode: 12,
// //         title: "Phoenix",
// //         duration: "47 min",
// //         score: "94%",
// //         img: "https://image.tmdb.org/t/p/original/yeQAQsV4WPTmKWTyuDhF3DAna1x.jpg",
// //       },
// //       {
// //         id: "s2e13",
// //         episode: 13,
// //         title: "ABQ",
// //         duration: "47 min",
// //         score: "95%",
// //         img: "https://image.tmdb.org/t/p/original/r7FWeTSN6F4M6OEsHXji2Z3462d.jpg",
// //       },
// //     ],
// //   },
// //   {
// //     season: 3,
// //     episodes: [
// //       {
// //         id: "s2e1",
// //         episode: 1,
// //         title: "Seven Thirty-Seven",
// //         duration: "47 min",
// //         score: "92%",
// //         img: "https://image.tmdb.org/t/p/original/6vMRIwd2WaGsRwR0z3C9BFEth6n.jpg",
// //       },
// //       {
// //         id: "s2e2",
// //         episode: 2,
// //         title: "Grilled",
// //         duration: "47 min",
// //         score: "94%",
// //         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
// //       },
// //       {
// //         id: "s2e3",
// //         episode: 3,
// //         title: "Bit by a Dead Bee",
// //         duration: "47 min",
// //         score: "89%",
// //         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
// //       },
// //       {
// //         id: "s2e4",
// //         episode: 4,
// //         title: "Down",
// //         duration: "47 min",
// //         score: "88%",
// //         img: "https://image.tmdb.org/t/p/original/p69fPkpnnxUmevhupJiDeYfQxxl.jpg",
// //       },
// //       {
// //         id: "s2e5",
// //         episode: 5,
// //         title: "Breakage",
// //         duration: "47 min",
// //         score: "89%",
// //         img: "https://image.tmdb.org/t/p/original/gMXeL0qcQZi5Tfd4UhnkRJeI9oa.jpg",
// //       },
// //       {
// //         id: "s2e6",
// //         episode: 6,
// //         title: "Peekaboo",
// //         duration: "47 min",
// //         score: "95%",
// //         img: "https://image.tmdb.org/t/p/original/bPQxF63jhfT5eNYjhzuGEO7oMQg.jpg",
// //       },
// //       {
// //         id: "s2e7",
// //         episode: 7,
// //         title: "Negro y Azul",
// //         duration: "47 min",
// //         score: "92%",
// //         img: "https://image.tmdb.org/t/p/original/tfCuh20gNHGGF6A1te3NmiqML6D.jpg",
// //       },
// //       {
// //         id: "s2e8",
// //         episode: 8,
// //         title: "Better Call Saul",
// //         duration: "47 min",
// //         score: "97%",
// //         img: "https://image.tmdb.org/t/p/original/1IOnhCCeru1BZUPeppu7tMmtxvL.jpg",
// //       },
// //       {
// //         id: "s2e9",
// //         episode: 9,
// //         title: "4 Days Out",
// //         duration: "47 min",
// //         score: "96%",
// //         img: "https://image.tmdb.org/t/p/original/KmFdF23FtbPwwz3FJF2T885r2Z.jpg",
// //       },
// //       {
// //         id: "s2e10",
// //         episode: 10,
// //         title: "Over",
// //         duration: "47 min",
// //         score: "91%",
// //         img: "https://image.tmdb.org/t/p/original/331AHaKegOuLZtN3kLvdrO8Yt9s.jpg",
// //       },
// //       {
// //         id: "s2e11",
// //         episode: 11,
// //         title: "Mandala",
// //         duration: "47 min",
// //         score: "94%",
// //         img: "https://image.tmdb.org/t/p/original/wGobAJ0h54788xCMkRKaJTQMMtq.jpg",
// //       },
// //       {
// //         id: "s2e12",
// //         episode: 12,
// //         title: "Phoenix",
// //         duration: "47 min",
// //         score: "94%",
// //         img: "https://image.tmdb.org/t/p/original/yeQAQsV4WPTmKWTyuDhF3DAna1x.jpg",
// //       },
// //       {
// //         id: "s2e13",
// //         episode: 13,
// //         title: "ABQ",
// //         duration: "47 min",
// //         score: "95%",
// //         img: "https://image.tmdb.org/t/p/original/r7FWeTSN6F4M6OEsHXji2Z3462d.jpg",
// //       },
// //     ],
// //   },
// // ];

// // function SingleSeriesPage() {
// //   const [selectedSeason, setSelectedSeason] = useState<number>(1); // Start with season 1
// //   const [watchedEpisodes, setWatchedEpisodes] = useState<{
// //     [episodeNumber: number]: boolean; //defines the type of the state, which is an object with numeric keys (episodeNumber) and boolean values.
// //     //The initial state is set to an empty object {}, meaning no episodes are marked as watched initially.
// //   }>({});

// //   const handleEpisodeWatched = (episodeNumber: number) => {
// //     setWatchedEpisodes((prevWatched) => ({//Calls setWatchedEpisodes, the function that updates the watchedEpisodes state.
// //       //The function takes prevWatched as an argument, which represents the previous state of watchedEpisodes.
// //       ...prevWatched,//Uses the spread operator ... to copy all previous entries in prevWatched to the new object. This ensures any existing data in the state is retained.
// //       [episodeNumber]: !prevWatched[episodeNumber],//Adds or updates the entry for episodeNumber in watchedEpisodes.
// //       // !prevWatched[episodeNumber] toggles the current value for this episode:
// //       // If it was true (watched), it becomes false.
// //       // If it was false or undefined (not watched), it becomes true
// //     }));
// //   };

// //   const seasonEpisodes = seasons[selectedSeason - 1].episodes;
// //   const progressValue =//retrieves an array of all the values in the watchedEpisodes object. Since watchedEpisodes stores episodes as keys with boolean values
// //   //(true for watched, false for not watched), this array contains only true and false values
// //     (Object.values(watchedEpisodes).filter(Boolean).length /  //filters the array, keeping only true values. This effectively creates an array of episodes that have been watched.
// //       seasonEpisodes.length) *   //counts the number of true values, which represents the total number of watched episodes.
// //     100;

// //   return (
// //     <div className="mt-[20vw] ml-[13vw] max-w-[75vw] pb-[20vw]">
// //       <div className="flex justify-between mb-[1.5vw]">
// //         <div>
// //           <Select
// //             //defaultValue={selectedSeason.toString()}
// //             onValueChange={(value) => {
// //               setSelectedSeason(Number(value));
// //               setWatchedEpisodes({});
// //             }}
// //           >
// //             <SelectTrigger className="w-[10vw] h-[2.6vw] border-none focus:ring-0 focus:border-transparent text-[1vw] rounded-full pl-[3vh] bg-customServicesColor ">
// //               <span>
// //                 <SelectValue placeholder={`Season ${selectedSeason}`} />
// //               </span>
// //             </SelectTrigger>
// //             <SelectContent className="bg-customServicesColor border-none text-[1vw] text-white mt-[0.2vh] rounded-[1vw] p-[0.5vh] hover:cursor-pointer">
// //               {seasons.map((season) => (
// //                 <SelectItem
// //                   key={season.season}
// //                   value={season.season.toString()}
// //                   className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
// //                 >
// //                   Season {season.season}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //         </div>
// //         <div className="flex flex-col items-center">
// //           <div>
// //             <div className="mb-[1vw]">
// //               {Math.round(progressValue)}% Completed
// //             </div>
// //             <Progress
// //               className="[&>*]:bg-white/90 bg-buttonColor w-[45vw]"
// //               value={progressValue}
// //               max={100}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <div className="">
// //         <CarouselEpisode
// //           episodes={seasonEpisodes}
// //           watchedEpisodes={watchedEpisodes}
// //           onEpisodeWatched={handleEpisodeWatched}
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // export default SingleSeriesPage;

// "use client";
// import { useState } from "react";
// import EpisodeCard from "@/components/cards/EpisodeCard";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import CarouselEpisode from "@/components/carousel/CarouselEpisode";
// import { Progress } from "@/components/ui/progress";
// import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { useEffect } from "react";
// import { CiPause1, CiPlay1 } from "react-icons/ci";
// import { FaExpand, FaFacebook, FaLink, FaPlay } from "react-icons/fa";
// import { Rings } from "react-loader-spinner";
// import { FiMinimize } from "react-icons/fi";
// import { GoDotFill, GoMute, GoUnmute } from "react-icons/go";
// import { MdOutlineReplay } from "react-icons/md";
// import MovieCard from "@/components/cards/MovieCard";
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
// import { AiFillInstagram, AiFillLike, AiOutlineLike } from "react-icons/ai";
// import { FaXTwitter } from "react-icons/fa6";
// import Link from "next/link";
// import HowToWatchCard from "@/components/cards/HowToWatchCard";
// import Tags from "@/components/tags/Tags";
// import Reviews from "@/components/reviews/Reviews";
// import MoreInfo from "@/components/moreinfo/MoreInfo";
// import CastSwiper from "@/components/carousel/CastSwiper";
// import MoreLikeThisSwiper from "@/components/carousel/MoreLikeThisSwiper";
// import RecomendationSwiper from "@/components/carousel/RecommendationSwiper";
// import RecommendationSwiper from "@/components/carousel/RecommendationSwiper";
// import StarRating from "@/components/starRating/StarRating";

// const seasons = [
//   {
//     season: 1,
//     episodes: [
//       {
//         id: "s1e1",
//         episode: 1,
//         title: "How Dare You Do That to My Bulma! Vegeta's Metamorphosis of Fury!?",
//         duration: "58 min",
//         score: "96%",
//         img: "https://image.tmdb.org/t/p/original/6BFIhumOY0SGhyHLFOiiowSKrAZ.jpg",
//       },
//       {
//         id: "s1e2",
//         episode: 2,
//         title: "Goku Makes an Entrance! A Last Chance from Lord Beerus?",
//         duration: "48 min",
//         score: "88%",
//         img: "https://image.tmdb.org/t/p/original/yjNrQ5SuNrrlIBQZ1ZG0qsOrFX5.jpg",
//       },
//       {
//         id: "s1e3",
//         episode: 3,
//         title: "Thanks for Waiting, Lord Beerus! A Super Saiyan God is Born at Last! ",
//         duration: "48 min",
//         score: "90%",
//         img: "https://image.tmdb.org/t/p/original/dtPbhwpbZcjLOahkKj2QXkeaUyd.jpg",
//       },
//       {
//         id: "s1e4",
//         episode: 4,
//         title: "Show Us, Goku! The Power of a Super Saiyan God!",
//         duration: "47 min",
//         score: "86%",
//         img: "https://image.tmdb.org/t/p/original/cyAEMV5X4N6cp5PTlqvAI8CBBrW.jpg",
//       },
//       {
//         id: "s1e5",
//         episode: 5,
//         title: "Let's Keep Going, Lord Beerus! The Battle of Gods!",
//         duration: "48 min",
//         score: "87%",
//         img: "https://image.tmdb.org/t/p/original/icjxZcyrPmDBcdO7jZWzLluxvzE.jpg",
//       },
//       {
//         id: "s1e6",
//         episode: 6,
//         title: "The Universe Will Shatter? Clash! Destroyer vs. Super Saiyan God! ",
//         duration: "48 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/9lpPjLqQFIzPyH0s1YFFOdCCRhZ.jpg",
//       },
//       {
//         id: "s1e7",
//         episode: 7,
//         title: "Goku, Surpass Super Saiyan God!",
//         duration: "47 min",
//         score: "91%",
//         img: "https://image.tmdb.org/t/p/original/fm8QV94N0JZajClb6AFli6N43vZ.jpg",
//       },
//     ],
//   },
//   {
//     season: 2,
//     episodes: [
//       {
//         id: "s2e1",
//         episode: 1,
//         title: "Revenge 'F'! A Cunning Trap is Set?",
//         duration: "47 min",
//         score: "92%",
//         img: "https://image.tmdb.org/t/p/original/5Gc7Ood1kqq0eyGy4tPLziTTOAp.jpg",
//       },
//       {
//         id: "s2e2",
//         episode: 2,
//         title: "Frieza and Frost! A Mutual Malevolence? ",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/qIEksVI5MxE594r0WCvPYeZiZW8.jpg",
//       },
//       {
//         id: "s2e3",
//         episode: 3,
//         title: "The Mightiest Enemy Zeroes in on Goku! Launch the Knockout Spirit Bomb Now!",
//         duration: "47 min",
//         score: "89%",
//         img: "https://image.tmdb.org/t/p/original/wFzggt1QbQz4R40kUc9G1d1fzPP.jpg",
//       },
//       {
//         id: "s2e4",
//         episode: 4,
//         title: "Goku Enkindled! The Awakened One's New Ultra Instinct!",
//         duration: "47 min",
//         score: "88%",
//         img: "https://image.tmdb.org/t/p/original/3Ztdp4838lSsJcpeY09SLH0IOnE.jpg",
//       },
//       {
//         id: "s2e5",
//         episode: 5,
//         title: "An Extra-Dimensional Ultimate Battle! Hit vs. Jiren!",
//         duration: "47 min",
//         score: "89%",
//         img: "https://image.tmdb.org/t/p/original/dNHs7L1tjpchqzg5k9scd45BDM4.jpg",
//       },
//       {
//         id: "s2e6",
//         episode: 6,
//         title: "A Saiyan Oath! Vegeta's Resolve!",
//         duration: "47 min",
//         score: "95%",
//         img: "https://image.tmdb.org/t/p/original/cLRUObQtJlgaVfkkZzDExxWWLmJ.jpg",
//       },
//       {
//         id: "s2e7",
//         episode: 7,
//         title: "With Great Joy! The Fighting Freak Saiyans' Battle Rejoined! ",
//         duration: "47 min",
//         score: "92%",
//         img: "https://image.tmdb.org/t/p/original/uUHMCt0zYCR6fvEWD9gtVX69cxc.jpg",
//       },
//       {
//         id: "s2e8",
//         episode: 8,
//         title: "Bloodcurdling! The Explosive Birth of a New Super Warrior!",
//         duration: "47 min",
//         score: "97%",
//         img: "https://image.tmdb.org/t/p/original/dRapGRLPhmYbRngHVwjFKe9h6Bj.jpg",
//       },
//       {
//         id: "s2e9",
//         episode: 9,
//         title: "Goku vs. Kefla! Super Saiyan Blue Beaten?",
//         duration: "47 min",
//         score: "96%",
//         img: "https://image.tmdb.org/t/p/original/pRGvQP4Q96Sk8c46gloVQuB1jkD.jpg",
//       },
//       {
//         id: "s2e10",
//         episode: 10,
//         title: "A Perfect Survival Strategy! The 3rd Universe's Menacing Assassin!",
//         duration: "47 min",
//         score: "91%",
//         img: "https://image.tmdb.org/t/p/original/ucQOHxMVheMrfbL5eYYZNU52kam.jpg",
//       },
//       {
//         id: "s2e11",
//         episode: 11,
//         title: "All-Out War! The Ultimate Four-Fold Union vs. the 7th Universe's Total Offensive! ",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/jpaZjRxvJztKqjasRSrT4qgwd0T.jpg",
//       },
//       {
//         id: "s2e12",
//         episode: 12,
//         title: "Body, Soul and Power Unleashed! Goku and Vegeta!",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/AnB9kXVVTyhVEwsadU5jOf1iPN5.jpg",
//       },
//       {
//         id: "s2e13",
//         episode: 13,
//         title: "The Greatest Showdown of All Time! The Ultimate Survival Battle!",
//         duration: "47 min",
//         score: "95%",
//         img: "https://image.tmdb.org/t/p/original/6DOEwWxgMUkrgEcZEC2HNba73CQ.jpg",
//       },
//     ],
//   },
// ];

// const movie = [
//   {
//     id: 1,
//     title: "Dragon Ball Super",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
//   },
// ];

// function SingleSeriesPage() {
//   const [selectedSeason, setSelectedSeason] = useState<number>(1); // Start with season 1
//   const [watchedEpisodes, setWatchedEpisodes] = useState<{
//     [episodeNumber: number]: boolean; //defines the type of the state, which is an object with numeric keys (episodeNumber) and boolean values.
//     //The initial state is set to an empty object {}, meaning no episodes are marked as watched initially.
//   }>({});

//   const [videoKey4, setVideoKey4] = useState("BAQvCB3Fnm0"); // Alien
//   const [autoplay, setAutoplay] = useState(true);
//   const [play, setPlay] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // Track loading state
//   const [unmute, setUnmute] = useState(false);
//   const [pause, setPause] = useState(false);
//   const [reload, setReload] = useState(false);
//   const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
//   const [isTrailer, setIsTrailer] = useState(false);
//   const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
//   const [singlemovie, setSinglemovie] = useState(true);
//   const [isListView, setIsListView] = useState(true);
//   const [reviews, setReviews] = useState(true);
//   const [value, setValue] = React.useState<number | null>(0);
//   const type = "series";

//   const handleValue = (newValue: number | null) => {
//     if (newValue !== null) {
//       setValue(newValue);
//     } else {
//       setValue(0);
//     }
//   };

//   // Fetch call to TMDB to get the data I need for cast section, excellent example
//   const [cast, setCast] = useState([]);
//   const seriesId = 580489; // Example movie ID for Venom

//   useEffect(() => {
//     const fetchCast = async () => {
//       const API_KEY = "1fc54b7ab4fb46412074eec75b746280"; // Add your TMDb API key
//       const url = `https://api.themoviedb.org/3/movie/${seriesId}/credits?api_key=${API_KEY}`;
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const formattedCast = data.cast.map(
//           (member: {
//             id: any;
//             name: any;
//             character: any;
//             profile_path: any;
//           }) => ({
//             id: member.id,
//             name: member.name,
//             character: member.character,
//             picture: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
//           })
//         );
//         setCast(formattedCast);
//       } catch (error) {
//         console.error("Failed to fetch cast:", error);
//       }
//     };

//     fetchCast();
//   }, []);

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

//   const handlePlay = () => {
//     setPlay(true);
//     setIsLoading(false); // Stop showing loading spinner once the video plays
//     setPause(!pause);
//   };

//   const handlePause = () => {
//     setPlay(false);
//   };

//   const handleEnd = () => {
//     setPlay(false);
//   };

//   // Handle when video starts playing
//   const handleReload = () => {
//     setReload(false);
//     setPause(false);
//   };

//   const handleEpisodeWatched = (episodeNumber: number) => {
//     setWatchedEpisodes((prevWatched) => ({
//       //Calls setWatchedEpisodes, the function that updates the watchedEpisodes state.
//       //The function takes prevWatched as an argument, which represents the previous state of watchedEpisodes.
//       ...prevWatched, //Uses the spread operator ... to copy all previous entries in prevWatched to the new object. This ensures any existing data in the state is retained.
//       [episodeNumber]: !prevWatched[episodeNumber], //Adds or updates the entry for episodeNumber in watchedEpisodes.
//       // !prevWatched[episodeNumber] toggles the current value for this episode:
//       // If it was true (watched), it becomes false.
//       // If it was false or undefined (not watched), it becomes true
//     }));
//   };

//   const seasonEpisodes = seasons[selectedSeason - 1].episodes;
//   const progressValue = //retrieves an array of all the values in the watchedEpisodes object. Since watchedEpisodes stores episodes as keys with boolean values
//     //(true for watched, false for not watched), this array contains only true and false values
//     (Object.values(watchedEpisodes).filter(Boolean).length / //filters the array, keeping only true values. This effectively creates an array of episodes that have been watched.
//       seasonEpisodes.length) * //counts the number of true values, which represents the total number of watched episodes.
//     100;

//   return (
//     <div>
//       <div className={`w-full h-[47.5vw] relative`}>
//         <YoutubeTrailerPlayer
//           handlePlay={handlePlay}
//           //handleFullscreen={handleFullscreen}
//           //handleExpand={handleExpand}
//           //expand={expand}
//           unmute={unmute}
//           pause={pause}
//           reload={reload}
//           handleReload={handleReload}
//           handleEnd={handleEnd}
//           //handleStarted={handleStarted}
//           play={play}
//           autoplay={autoplay}
//           videoKey={videoKey4}
//           src={
//             "https://image.tmdb.org/t/p/original/x0dLoNI0ce7GXIwGiMu0GrelxEv.jpg"
//           }
//           setIsLoading={setIsLoading} // Pass the loading state handler
//         />
//         <div
//           className={`${
//             play ? "opacity-0" : "opacity-100"
//           } z-40 absolute inset-0 bg-gradient-to-t from-customColor to-transparent w-full h-full transition-opacity duration-500 ease-in-out`}
//         />

//         <Button
//           onClick={handlePlay}
//           className={`active:scale-95 duration-500 z-40 absolute top-1/2 left-1/2 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5 -translate-x-1/2 -translate-y-1/2 ${
//             play ? "hidden" : ""
//           }`}
//         >
//           {isLoading ? (
//             <Rings color="#ffffff" height={40} width={40} />
//           ) : (
//             <CiPlay1 className="w-[2vw] h-[2vw]" />
//           )}
//         </Button>
//         {/* Display the appropriate icon based on fullscreen state */}
//         {play && (
//           <div className="ml-[80vw] mt-[-10vw]  z-[100] absolute">
//             <Button
//               onClick={() => setUnmute(!unmute)}
//               className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
//             >
//               {unmute ? (
//                 <GoUnmute className="w-[2vw] h-[2vw]" />
//               ) : (
//                 <div>
//                   <GoMute className="w-[2vw] h-[2vw]" />
//                 </div>
//               )}
//             </Button>
//             <Button
//               onClick={handlePause}
//               className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
//             >
//               <CiPause1 className="w-[2vw] h-[2vw]" />
//             </Button>
//             <Button
//               onClick={() => setReload(true)}
//               className="w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
//             >
//               <MdOutlineReplay className="w-[2vw] h-[2vw]" />
//             </Button>
//           </div>
//         )}
//       </div>
//       <div className="min-h-screen mb-[135vw] ">
//         <div
//           // className={`flex justify-center w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
//           //   play ? "translate-y-[7vw]" : ""
//           // }`}
//           className={`w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
//             play ? "translate-y-[7vw]" : ""
//           }`}
//         >
//           <div className="flex flex-col">
//             <div
//               className={`flex w-full ml-[1vw] transition-transform duration-700 justify-center`}
//               //style={{ width: "12.6vw", height: "40vh" }}
//             >
//               <MovieCard
//                 type={type}
//                 imgUrl={movie[0].imgUrl}
//                 //title={movie.title}
//                 //isLastOne={isLastOne}
//                 singlemovie={singlemovie}
//               />
//               <div className="flex">
//                 <div className="flex flex-col pl-[3vw]">
//                   {/* Movie info here */}
//                   <h2 className="text-[2vw] font-bold">{movie[0].title}</h2>
//                   <div className="text-center">
//                     <div className="flex justify-start items-center text-customTextColor font-bold md:text-[0.9vw]">
//                       <span>Action</span>
//                       <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//                       <span>Sci-fi</span>
//                       <GoDotFill className="bg-customTextColor w-1.5 h-1.5 mx-[0.4vw] rounded-full" />
//                       <span className="pr-[0.6vw]">Comedy</span>
//                       <span className="mx-[0.6vw] text-customTextColor font-bold">
//                         R
//                       </span>
//                       <span className="mx-[0.6vw] text-customTextColor font-bold">
//                         2h 3m
//                       </span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="mt-[1vh] text-white text-base md:text-[1vw]  max-w-[23rem] md:max-w-[33vw] line-clamp-4 leading-[2] md:leading-[2]">
//                       While scavenging the deep ends of a derelict space
//                       station, a group of young space colonists come face to
//                       face with the most terrifying life form in the universe.
//                       While scavenging the deep ends of a derelict space
//                       station, a group of young space
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-center md:justify-start mt-[2rem] md:mt-[3vh] md:mb-[2vh]">
//                     <Button
//                       onClick={() => handleAdded(movie[0].id)}
//                       className={`mr-[0.5vw] h-10 w-28 md:w-[7vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                         isAdded[movie[0].id]
//                           ? "bg-white/90 text-black font-bold"
//                           : ""
//                       }`}
//                     >
//                       Watchlist
//                       {isAdded[movie[0].id] ? (
//                         <IoCheckmark className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                       ) : (
//                         <LuPlus className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                       )}
//                     </Button>

//                     <Dialog>
//                       <DialogTrigger className="flex justify-center items-center h-10 w-28 md:pl-[0.4vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
//                         Trailer
//                         <FaPlay className="w-[2vw] h-[2vh] md:ml-[0.4vw]" />
//                       </DialogTrigger>
//                       <DialogContent className="md:w-[70vw] md:h-[40vw]">
//                         <YoutubeTrailerPlayer
//                           //VideoEnd={handleVideoEnd}
//                           handlePlay={handlePlay}
//                           videoKey={videoKey4}
//                           setIsLoading={setIsLoading}
//                           handleReload={handleReload}
//                           handleEnd={handleEnd}
//                           isListView={isListView}
//                           src={
//                             "https://image.tmdb.org/t/p/original/f8JTWmelQEDUqujwCeVeS7Jn10b.jpg"
//                           }
//                         />
//                       </DialogContent>
//                     </Dialog>

//                     <Button
//                       onClick={() => handleLike(movie[0].id)}
//                       className={`ml-[0.5vw] flex justify-center items-center h-10 w-28  md:pl-[1vw] md:w-[6vw] md:h-[5vh] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500 ${
//                         isLiked[movie[0].id]
//                           ? "bg-white/90 text-black font-bold"
//                           : ""
//                       }`}
//                     >
//                       Like
//                       {isLiked[movie[0].id] ? (
//                         <AiFillLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//                       ) : (
//                         <AiOutlineLike className="w-[2.5vw] h-[2.5vh] ml-[0.4vw]" />
//                       )}
//                     </Button>
//                   </div>
//                   {/* Box for Ratings */}
//                   <div className="w-[22vw]">
//                     <div className="w-full mt-[2vw] hidden md:block">
//                       <h1 className="text-white text-base md:text-[1vw]">
//                         Ratings
//                       </h1>
//                     </div>

//                     {/* Box for Three Titles */}
//                     <div className="w-full flex justify-between items-start mt-[1.7vh] hidden md:block">
//                       <div className="flex flex-col md:flex-row justify-between">
//                         <div className="text-customTextColor text-sm md:text-[1vw]">
//                           <span>Rotten&nbsp;Tomatoes</span>
//                           <div className="flex items-center">
//                             <div className="flex items-center mt-[1.5vh]">
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src="/genresIcons/icons8-rotten-tomatoes.svg"
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                               <span className="ml-[0.5vw] text-[1vw] text-white text-bold pr-[2.5vw]">
//                                 80%
//                               </span>
//                             </div>
//                             <div className="flex items-center mt-[1.5vh]">
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src="/genresIcons/icons8-rotten-tomatoes.svg"
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                               <span className="ml-[0.5vw] text-[1vw] text-white text-bold">
//                                 80%
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[4vw]">
//                           iMDB
//                           <div className="flex items-center">
//                             <div className="flex items-center">
//                               <img
//                                 className="w-[2.4vw]"
//                                 src="/genresIcons/icons8-imdb.svg"
//                                 alt="Rotten Tomatoes Icon"
//                               />
//                               <span className="ml-[0.5vw] text-[1vw] text-white text-bold">
//                                 80%
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-customTextColor mt-5 md:mt-0 text-sm md:text-[1vw] md:ml-[5vw]">
//                           Popularity
//                           <div className="flex items-center mt-[0.8vh]">
//                             <div className="flex items-center">
//                               <img
//                                 className="w-[3vw] h-[3vh]"
//                                 src="/genresIcons/5c2d24739a206a1df3d19e60c801c494 1.svg"
//                                 alt="Popularity"
//                               />
//                               <span className="ml-[0.5vw] text-[1vw] text-white text-bold pr-[1vw]">
//                                 80%
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-[6vh] content-between  ml-[11vw]">
//                   <div>
//                     <div className="">
//                       <div className="flex">
//                         <div className=" text-[1vw]">Your Score</div>
//                         <StarRating
//                           title={movie[0].title}
//                           value={value}
//                           handleValue={handleValue}
//                         />
//                       </div>

//                       <div className="flex items-end text-[1vw] mt-[1vh]">
//                         <img
//                           className="mr-[0.5vw] w-[1.7vw] h-[1.7vw]"
//                           src="genresIcons/icons8-star.svg"
//                         />{" "}
//                         {value ? value : "--"} / 5<div></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-[1vw]">Director</h2>
//                     <span className="text-[1vw] text-customTextColor">
//                       Fede Alvarez
//                     </span>
//                   </div>
//                   <div>
//                     <h2 className="text-[1vw]">Starring</h2>
//                     <span className="text-[1vw] text-customTextColor">
//                       Cailee Spaeny,
//                       <br />
//                       David Jonsson,
//                       <br />
//                       Archie Renax
//                     </span>
//                   </div>
//                   <div>
//                     <h2 className="text-[1vw] mb-[1vh]">Socials</h2>
//                     <div className="text-customTextColor flex">
//                       <Link
//                         href="https://venom.movie/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <FaLink className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
//                       </Link>
//                       <Link
//                         href="https://www.facebook.com/VenomMovie"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <FaFacebook className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
//                       </Link>
//                       <Link
//                         href="https://x.com/VenomMovie"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <FaXTwitter className="w-[1.5vw] h-[1.5vw] mr-[0.5vw]" />
//                       </Link>
//                       <Link
//                         href="https://www.instagram.com/venommovie/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <AiFillInstagram className="w-[1.5vw] h-[1.5vw]" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="ml-[13vw] max-w-[75vw] mt-[4vw] mb-[2vw]">
//               <div className="flex justify-between mb-[1.5vw]">
//                 <div>
//                   <Select
//                     //defaultValue={selectedSeason.toString()}
//                     onValueChange={(value) => {
//                       setSelectedSeason(Number(value));
//                       setWatchedEpisodes({});
//                     }}
//                   >
//                     <SelectTrigger className="w-[10vw] h-[2.6vw] border-none focus:ring-0 focus:border-transparent text-[1vw] rounded-full pl-[3vh] bg-customServicesColor ">
//                       <span>
//                         <SelectValue placeholder={`Season ${selectedSeason}`} />
//                       </span>
//                     </SelectTrigger>
//                     <SelectContent className="bg-customServicesColor border-none text-[1vw] text-white mt-[0.2vh] rounded-[1vw] p-[0.5vh] hover:cursor-pointer">
//                       {seasons.map((season) => (
//                         <SelectItem
//                           key={season.season}
//                           value={season.season.toString()}
//                           className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
//                         >
//                           Season {season.season}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <div>
//                     <div className="mb-[1vw]">
//                       {Math.round(progressValue)}% Completed
//                     </div>
//                     <Progress
//                       className="[&>*]:bg-white/90 bg-buttonColor w-[45vw]"
//                       value={progressValue}
//                       max={100}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="">
//                 <CarouselEpisode
//                   episodes={seasonEpisodes}
//                   watchedEpisodes={watchedEpisodes}
//                   onEpisodeWatched={handleEpisodeWatched}
//                 />
//               </div>
//             </div>
//             <div className="flex gap-[6vw] mt-[3vw] h-[22vw] w-full justify-center ml-[2vw]">
//               <div className="h-[2vw]">
//                 <div className="text-[1vw]">How To Watch</div>
//                 <div className="mb-[2vh] mt-[1vh]">
//                   <Tags />
//                 </div>
//                 <div className="w-full">
//                   <HowToWatchCard />
//                 </div>
//               </div>
//               <div className="h-[2vw]">
//                 <div className="text-[1vw]">Reviews</div>
//                 <div className="my-[1vh] mb-[2vh]">
//                   <Tags reviews={reviews} />
//                 </div>
//                 <div className="w-full h-[22vw]">
//                   <Reviews />
//                 </div>
//               </div>
//             </div>
//             <div className="h-[6vw] mt-[10vw] bg-buttonColor rounded-[1vw] max-w-[76vw] ml-[13vw]">
//               <div className="text-[1vw] mt-[-2vw]">More Info</div>
//               <MoreInfo />
//             </div>
//             {/* <div className="mt-[6vw] max-w-[50vw]"> */}
//             <div className="mt-[4vw] max-w-[75vw] ml-[13vw]">
//               <CastSwiper cast={cast} />
//             </div>
//             {/* Divider line */}
//             <div className="max-w-[75vw] ml-[13vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
//             <div className="mt-[6vw]">
//               {/* mx-auto max-w-full */}
//               <MoreLikeThisSwiper />
//             </div>
//             <div>
//               {/* mx-auto max-w-full */}
//               <RecommendationSwiper />
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default SingleSeriesPage;

// "use client";
// import { useState } from "react";
// import EpisodeCard from "@/components/cards/EpisodeCard";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import CarouselEpisode from "@/components/carousel/CarouselEpisode";
// import { Progress } from "@/components/ui/progress";

// const seasons = [
//   {
//     season: 1,
//     episodes: [
//       {
//         id: "s1e1",
//         episode: 1,
//         title: "Pilot",
//         duration: "58 min",
//         score: "96%",
//         img: "https://image.tmdb.org/t/p/original/u90Ryx8OztC5OeVTXHPcZ8fnKoA.jpg",
//       },
//       {
//         id: "s1e2",
//         episode: 2,
//         title: "Cat's in the Bag...",
//         duration: "48 min",
//         score: "88%",
//         img: "https://image.tmdb.org/t/p/original/xwQRVskT9IK7ktbrrWc2xoT4nPv.jpg",
//       },
//       {
//         id: "s1e3",
//         episode: 3,
//         title: "...And the Bag's in the River",
//         duration: "48 min",
//         score: "90%",
//         img: "https://image.tmdb.org/t/p/original/dLgiPZCVamFcaa7Gaqudrldj15h.jpg",
//       },
//       {
//         id: "s1e4",
//         episode: 4,
//         title: "Cancer Man",
//         duration: "47 min",
//         score: "86%",
//         img: "https://image.tmdb.org/t/p/original/2UbRgW6apE4XPzhHPA726wUFyaR.jpg",
//       },
//       {
//         id: "s1e5",
//         episode: 5,
//         title: "Gray Matter",
//         duration: "48 min",
//         score: "87%",
//         img: "https://image.tmdb.org/t/p/original/82G3wZgEvZLKcte6yoZJahUWBtx.jpg",
//       },
//       {
//         id: "s1e6",
//         episode: 6,
//         title: "Crazy Handful of Nothin'",
//         duration: "48 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/rCCLuycNPL30W3BtuB8HafxEMYz.jpg",
//       },
//       {
//         id: "s1e7",
//         episode: 7,
//         title: "A No-Rough-Stuff-Type Deal",
//         duration: "47 min",
//         score: "91%",
//         img: "https://image.tmdb.org/t/p/original/1dgFAsajUpUT7DLXgAxHb9GyXHH.jpg",
//       },
//     ],
//   },
//   {
//     season: 2,
//     episodes: [
//       {
//         id: "s2e1",
//         episode: 1,
//         title: "Seven Thirty-Seven",
//         duration: "47 min",
//         score: "92%",
//         img: "https://image.tmdb.org/t/p/original/6vMRIwd2WaGsRwR0z3C9BFEth6n.jpg",
//       },
//       {
//         id: "s2e2",
//         episode: 2,
//         title: "Grilled",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
//       },
//       {
//         id: "s2e3",
//         episode: 3,
//         title: "Bit by a Dead Bee",
//         duration: "47 min",
//         score: "89%",
//         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
//       },
//       {
//         id: "s2e4",
//         episode: 4,
//         title: "Down",
//         duration: "47 min",
//         score: "88%",
//         img: "https://image.tmdb.org/t/p/original/p69fPkpnnxUmevhupJiDeYfQxxl.jpg",
//       },
//       {
//         id: "s2e5",
//         episode: 5,
//         title: "Breakage",
//         duration: "47 min",
//         score: "89%",
//         img: "https://image.tmdb.org/t/p/original/gMXeL0qcQZi5Tfd4UhnkRJeI9oa.jpg",
//       },
//       {
//         id: "s2e6",
//         episode: 6,
//         title: "Peekaboo",
//         duration: "47 min",
//         score: "95%",
//         img: "https://image.tmdb.org/t/p/original/bPQxF63jhfT5eNYjhzuGEO7oMQg.jpg",
//       },
//       {
//         id: "s2e7",
//         episode: 7,
//         title: "Negro y Azul",
//         duration: "47 min",
//         score: "92%",
//         img: "https://image.tmdb.org/t/p/original/tfCuh20gNHGGF6A1te3NmiqML6D.jpg",
//       },
//       {
//         id: "s2e8",
//         episode: 8,
//         title: "Better Call Saul",
//         duration: "47 min",
//         score: "97%",
//         img: "https://image.tmdb.org/t/p/original/1IOnhCCeru1BZUPeppu7tMmtxvL.jpg",
//       },
//       {
//         id: "s2e9",
//         episode: 9,
//         title: "4 Days Out",
//         duration: "47 min",
//         score: "96%",
//         img: "https://image.tmdb.org/t/p/original/KmFdF23FtbPwwz3FJF2T885r2Z.jpg",
//       },
//       {
//         id: "s2e10",
//         episode: 10,
//         title: "Over",
//         duration: "47 min",
//         score: "91%",
//         img: "https://image.tmdb.org/t/p/original/331AHaKegOuLZtN3kLvdrO8Yt9s.jpg",
//       },
//       {
//         id: "s2e11",
//         episode: 11,
//         title: "Mandala",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/wGobAJ0h54788xCMkRKaJTQMMtq.jpg",
//       },
//       {
//         id: "s2e12",
//         episode: 12,
//         title: "Phoenix",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/yeQAQsV4WPTmKWTyuDhF3DAna1x.jpg",
//       },
//       {
//         id: "s2e13",
//         episode: 13,
//         title: "ABQ",
//         duration: "47 min",
//         score: "95%",
//         img: "https://image.tmdb.org/t/p/original/r7FWeTSN6F4M6OEsHXji2Z3462d.jpg",
//       },
//     ],
//   },
//   {
//     season: 3,
//     episodes: [
//       {
//         id: "s2e1",
//         episode: 1,
//         title: "Seven Thirty-Seven",
//         duration: "47 min",
//         score: "92%",
//         img: "https://image.tmdb.org/t/p/original/6vMRIwd2WaGsRwR0z3C9BFEth6n.jpg",
//       },
//       {
//         id: "s2e2",
//         episode: 2,
//         title: "Grilled",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
//       },
//       {
//         id: "s2e3",
//         episode: 3,
//         title: "Bit by a Dead Bee",
//         duration: "47 min",
//         score: "89%",
//         img: "https://image.tmdb.org/t/p/original/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
//       },
//       {
//         id: "s2e4",
//         episode: 4,
//         title: "Down",
//         duration: "47 min",
//         score: "88%",
//         img: "https://image.tmdb.org/t/p/original/p69fPkpnnxUmevhupJiDeYfQxxl.jpg",
//       },
//       {
//         id: "s2e5",
//         episode: 5,
//         title: "Breakage",
//         duration: "47 min",
//         score: "89%",
//         img: "https://image.tmdb.org/t/p/original/gMXeL0qcQZi5Tfd4UhnkRJeI9oa.jpg",
//       },
//       {
//         id: "s2e6",
//         episode: 6,
//         title: "Peekaboo",
//         duration: "47 min",
//         score: "95%",
//         img: "https://image.tmdb.org/t/p/original/bPQxF63jhfT5eNYjhzuGEO7oMQg.jpg",
//       },
//       {
//         id: "s2e7",
//         episode: 7,
//         title: "Negro y Azul",
//         duration: "47 min",
//         score: "92%",
//         img: "https://image.tmdb.org/t/p/original/tfCuh20gNHGGF6A1te3NmiqML6D.jpg",
//       },
//       {
//         id: "s2e8",
//         episode: 8,
//         title: "Better Call Saul",
//         duration: "47 min",
//         score: "97%",
//         img: "https://image.tmdb.org/t/p/original/1IOnhCCeru1BZUPeppu7tMmtxvL.jpg",
//       },
//       {
//         id: "s2e9",
//         episode: 9,
//         title: "4 Days Out",
//         duration: "47 min",
//         score: "96%",
//         img: "https://image.tmdb.org/t/p/original/KmFdF23FtbPwwz3FJF2T885r2Z.jpg",
//       },
//       {
//         id: "s2e10",
//         episode: 10,
//         title: "Over",
//         duration: "47 min",
//         score: "91%",
//         img: "https://image.tmdb.org/t/p/original/331AHaKegOuLZtN3kLvdrO8Yt9s.jpg",
//       },
//       {
//         id: "s2e11",
//         episode: 11,
//         title: "Mandala",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/wGobAJ0h54788xCMkRKaJTQMMtq.jpg",
//       },
//       {
//         id: "s2e12",
//         episode: 12,
//         title: "Phoenix",
//         duration: "47 min",
//         score: "94%",
//         img: "https://image.tmdb.org/t/p/original/yeQAQsV4WPTmKWTyuDhF3DAna1x.jpg",
//       },
//       {
//         id: "s2e13",
//         episode: 13,
//         title: "ABQ",
//         duration: "47 min",
//         score: "95%",
//         img: "https://image.tmdb.org/t/p/original/r7FWeTSN6F4M6OEsHXji2Z3462d.jpg",
//       },
//     ],
//   },
// ];

// function SingleSeriesPage() {
//   const [selectedSeason, setSelectedSeason] = useState<number>(1); // Start with season 1
//   const [watchedEpisodes, setWatchedEpisodes] = useState<{
//     [episodeNumber: number]: boolean; //defines the type of the state, which is an object with numeric keys (episodeNumber) and boolean values.
//     //The initial state is set to an empty object {}, meaning no episodes are marked as watched initially.
//   }>({});

//   const handleEpisodeWatched = (episodeNumber: number) => {
//     setWatchedEpisodes((prevWatched) => ({//Calls setWatchedEpisodes, the function that updates the watchedEpisodes state.
//       //The function takes prevWatched as an argument, which represents the previous state of watchedEpisodes.
//       ...prevWatched,//Uses the spread operator ... to copy all previous entries in prevWatched to the new object. This ensures any existing data in the state is retained.
//       [episodeNumber]: !prevWatched[episodeNumber],//Adds or updates the entry for episodeNumber in watchedEpisodes.
//       // !prevWatched[episodeNumber] toggles the current value for this episode:
//       // If it was true (watched), it becomes false.
//       // If it was false or undefined (not watched), it becomes true
//     }));
//   };

//   const seasonEpisodes = seasons[selectedSeason - 1].episodes;
//   const progressValue =//retrieves an array of all the values in the watchedEpisodes object. Since watchedEpisodes stores episodes as keys with boolean values
//   //(true for watched, false for not watched), this array contains only true and false values
//     (Object.values(watchedEpisodes).filter(Boolean).length /  //filters the array, keeping only true values. This effectively creates an array of episodes that have been watched.
//       seasonEpisodes.length) *   //counts the number of true values, which represents the total number of watched episodes.
//     100;

//   return (
//     <div className="mt-[20vw] ml-[13vw] max-w-[75vw] pb-[20vw]">
//       <div className="flex justify-between mb-[1.5vw]">
//         <div>
//           <Select
//             //defaultValue={selectedSeason.toString()}
//             onValueChange={(value) => {
//               setSelectedSeason(Number(value));
//               setWatchedEpisodes({});
//             }}
//           >
//             <SelectTrigger className="w-[10vw] h-[2.6vw] border-none focus:ring-0 focus:border-transparent text-[1vw] rounded-full pl-[3vh] bg-customServicesColor ">
//               <span>
//                 <SelectValue placeholder={`Season ${selectedSeason}`} />
//               </span>
//             </SelectTrigger>
//             <SelectContent className="bg-customServicesColor border-none text-[1vw] text-white mt-[0.2vh] rounded-[1vw] p-[0.5vh] hover:cursor-pointer">
//               {seasons.map((season) => (
//                 <SelectItem
//                   key={season.season}
//                   value={season.season.toString()}
//                   className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
//                 >
//                   Season {season.season}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="flex flex-col items-center">
//           <div>
//             <div className="mb-[1vw]">
//               {Math.round(progressValue)}% Completed
//             </div>
//             <Progress
//               className="[&>*]:bg-white/90 bg-buttonColor w-[45vw]"
//               value={progressValue}
//               max={100}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="">
//         <CarouselEpisode
//           episodes={seasonEpisodes}
//           watchedEpisodes={watchedEpisodes}
//           onEpisodeWatched={handleEpisodeWatched}
//         />
//       </div>
//     </div>
//   );
// }

// export default SingleSeriesPage;

"use client";
import { useState } from "react";
import EpisodeCard from "@/components/cards/EpisodeCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CarouselEpisode from "@/components/carousel/CarouselEpisode";
import { Progress } from "@/components/ui/progress";
import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaExpand, FaFacebook, FaLink, FaPlay } from "react-icons/fa";
import { Rings } from "react-loader-spinner";
import { FiMinimize } from "react-icons/fi";
import { GoDotFill, GoMute, GoUnmute } from "react-icons/go";
import { MdOutlineReplay } from "react-icons/md";
import MovieCard from "@/components/cards/MovieCard";
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
import { AiFillInstagram, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import HowToWatchCard from "@/components/cards/HowToWatchCard";
import Tags from "@/components/tags/TagsHowToWatch";
import Reviews from "@/components/reviews/Reviews";
import MoreInfo from "@/components/moreinfo/MoreInfo";
import CastSwiper from "@/components/carousel/CastSwiper";
import MoreLikeThisSwiper from "@/components/carousel/MoreLikeThisSwiper";
import RecomendationSwiper from "@/components/carousel/RecommendationSwiper";
import RecommendationSwiper from "@/components/carousel/RecommendationSwiper";
import StarRating from "@/components/starRating/StarRating";
import SinglePageMainTrailer from "@/components/singlePageComps/SinglePageMainTrailer";
import MainDetails from "@/components/singlePageComps/MainDetails";
import SeriesTracker from "@/components/singlePageComps/SeriesTracker";

const seasons = [
  {
    season: 1,
    episodes: [
      {
        id: "s1e1",
        episode: 1,
        title:
          "How Dare You Do That to My Bulma! Vegeta's Metamorphosis of Fury!?",
        duration: "58 min",
        score: "96%",
        img: "https://image.tmdb.org/t/p/original/6BFIhumOY0SGhyHLFOiiowSKrAZ.jpg",
      },
      {
        id: "s1e2",
        episode: 2,
        title: "Goku Makes an Entrance! A Last Chance from Lord Beerus?",
        duration: "48 min",
        score: "88%",
        img: "https://image.tmdb.org/t/p/original/yjNrQ5SuNrrlIBQZ1ZG0qsOrFX5.jpg",
      },
      {
        id: "s1e3",
        episode: 3,
        title:
          "Thanks for Waiting, Lord Beerus! A Super Saiyan God is Born at Last! ",
        duration: "48 min",
        score: "90%",
        img: "https://image.tmdb.org/t/p/original/dtPbhwpbZcjLOahkKj2QXkeaUyd.jpg",
      },
      {
        id: "s1e4",
        episode: 4,
        title: "Show Us, Goku! The Power of a Super Saiyan God!",
        duration: "47 min",
        score: "86%",
        img: "https://image.tmdb.org/t/p/original/cyAEMV5X4N6cp5PTlqvAI8CBBrW.jpg",
      },
      {
        id: "s1e5",
        episode: 5,
        title: "Let's Keep Going, Lord Beerus! The Battle of Gods!",
        duration: "48 min",
        score: "87%",
        img: "https://image.tmdb.org/t/p/original/icjxZcyrPmDBcdO7jZWzLluxvzE.jpg",
      },
      {
        id: "s1e6",
        episode: 6,
        title:
          "The Universe Will Shatter? Clash! Destroyer vs. Super Saiyan God! ",
        duration: "48 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/9lpPjLqQFIzPyH0s1YFFOdCCRhZ.jpg",
      },
      {
        id: "s1e7",
        episode: 7,
        title: "Goku, Surpass Super Saiyan God!",
        duration: "47 min",
        score: "91%",
        img: "https://image.tmdb.org/t/p/original/fm8QV94N0JZajClb6AFli6N43vZ.jpg",
      },
    ],
  },
  {
    season: 2,
    episodes: [
      {
        id: "s2e1",
        episode: 1,
        title: "Revenge 'F'! A Cunning Trap is Set?",
        duration: "47 min",
        score: "92%",
        img: "https://image.tmdb.org/t/p/original/5Gc7Ood1kqq0eyGy4tPLziTTOAp.jpg",
      },
      {
        id: "s2e2",
        episode: 2,
        title: "Frieza and Frost! A Mutual Malevolence? ",
        duration: "47 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/qIEksVI5MxE594r0WCvPYeZiZW8.jpg",
      },
      {
        id: "s2e3",
        episode: 3,
        title:
          "The Mightiest Enemy Zeroes in on Goku! Launch the Knockout Spirit Bomb Now!",
        duration: "47 min",
        score: "89%",
        img: "https://image.tmdb.org/t/p/original/wFzggt1QbQz4R40kUc9G1d1fzPP.jpg",
      },
      {
        id: "s2e4",
        episode: 4,
        title: "Goku Enkindled! The Awakened One's New Ultra Instinct!",
        duration: "47 min",
        score: "88%",
        img: "https://image.tmdb.org/t/p/original/3Ztdp4838lSsJcpeY09SLH0IOnE.jpg",
      },
      {
        id: "s2e5",
        episode: 5,
        title: "An Extra-Dimensional Ultimate Battle! Hit vs. Jiren!",
        duration: "47 min",
        score: "89%",
        img: "https://image.tmdb.org/t/p/original/dNHs7L1tjpchqzg5k9scd45BDM4.jpg",
      },
      {
        id: "s2e6",
        episode: 6,
        title: "A Saiyan Oath! Vegeta's Resolve!",
        duration: "47 min",
        score: "95%",
        img: "https://image.tmdb.org/t/p/original/cLRUObQtJlgaVfkkZzDExxWWLmJ.jpg",
      },
      {
        id: "s2e7",
        episode: 7,
        title: "With Great Joy! The Fighting Freak Saiyans' Battle Rejoined! ",
        duration: "47 min",
        score: "92%",
        img: "https://image.tmdb.org/t/p/original/uUHMCt0zYCR6fvEWD9gtVX69cxc.jpg",
      },
      {
        id: "s2e8",
        episode: 8,
        title: "Bloodcurdling! The Explosive Birth of a New Super Warrior!",
        duration: "47 min",
        score: "97%",
        img: "https://image.tmdb.org/t/p/original/dRapGRLPhmYbRngHVwjFKe9h6Bj.jpg",
      },
      {
        id: "s2e9",
        episode: 9,
        title: "Goku vs. Kefla! Super Saiyan Blue Beaten?",
        duration: "47 min",
        score: "96%",
        img: "https://image.tmdb.org/t/p/original/pRGvQP4Q96Sk8c46gloVQuB1jkD.jpg",
      },
      {
        id: "s2e10",
        episode: 10,
        title:
          "A Perfect Survival Strategy! The 3rd Universe's Menacing Assassin!",
        duration: "47 min",
        score: "91%",
        img: "https://image.tmdb.org/t/p/original/ucQOHxMVheMrfbL5eYYZNU52kam.jpg",
      },
      {
        id: "s2e11",
        episode: 11,
        title:
          "All-Out War! The Ultimate Four-Fold Union vs. the 7th Universe's Total Offensive! ",
        duration: "47 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/jpaZjRxvJztKqjasRSrT4qgwd0T.jpg",
      },
      {
        id: "s2e12",
        episode: 12,
        title: "Body, Soul and Power Unleashed! Goku and Vegeta!",
        duration: "47 min",
        score: "94%",
        img: "https://image.tmdb.org/t/p/original/AnB9kXVVTyhVEwsadU5jOf1iPN5.jpg",
      },
      {
        id: "s2e13",
        episode: 13,
        title:
          "The Greatest Showdown of All Time! The Ultimate Survival Battle!",
        duration: "47 min",
        score: "95%",
        img: "https://image.tmdb.org/t/p/original/6DOEwWxgMUkrgEcZEC2HNba73CQ.jpg",
      },
    ],
  },
];

const series = [
  {
    id: 1,
    title: "Dragon Ball Super",
    imgUrl:
      "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
  },
];

function SingleSeriesPage() {
  const [selectedSeason, setSelectedSeason] = useState<number>(1); // Start with season 1
  const [watchedEpisodes, setWatchedEpisodes] = useState<{
    [episodeNumber: number]: boolean; //defines the type of the state, which is an object with numeric keys (episodeNumber) and boolean values.
    //The initial state is set to an empty object {}, meaning no episodes are marked as watched initially.
  }>({});

  const [videoKey4, setVideoKey4] = useState("BAQvCB3Fnm0"); // Alien
  const [autoplay, setAutoplay] = useState(true);
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [unmute, setUnmute] = useState(false);
  const [pause, setPause] = useState(false);
  const [reload, setReload] = useState(false);
  const [isAdded, setIsAdded] = useState<Record<number, boolean>>({});
  const [isTrailer, setIsTrailer] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [singleseries, setSingleseries] = useState(true);
  const [isListView, setIsListView] = useState(true);
  const [reviews, setReviews] = useState(true);
  const [value, setValue] = React.useState<number | null>(0);
  const type = "series";

  const handleValue = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
    } else {
      setValue(0);
    }
  };

  // Fetch call to TMDB to get the data I need for cast section, excellent example
  const [cast, setCast] = useState([]);
  const seriesId = 580489; // Example movie ID for Venom

  useEffect(() => {
    const fetchCast = async () => {
      const API_KEY = "1fc54b7ab4fb46412074eec75b746280"; // Add your TMDb API key
      const url = `https://api.themoviedb.org/3/movie/${seriesId}/credits?api_key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const formattedCast = data.cast.map(
          (member: {
            id: any;
            name: any;
            character: any;
            profile_path: any;
          }) => ({
            id: member.id,
            name: member.name,
            character: member.character,
            picture: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
          })
        );
        setCast(formattedCast);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      }
    };

    fetchCast();
  }, []);

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

  const handlePlay = () => {
    setPlay(true);
    setIsLoading(false); // Stop showing loading spinner once the video plays
    setPause(!pause);
  };

  const handlePause = () => {
    setPlay(false);
  };

  const handleEnd = () => {
    setPlay(false);
  };

  // Handle when video starts playing
  const handleReload = () => {
    setReload(false);
    setPause(false);
  };

  const handleUnmute = () => {
    setUnmute(!unmute);
  };

  const handleSetRelaod = () => {
    setUnmute(!unmute);
  };

  const handleEpisodeWatched = (episodeNumber: number) => {
    setWatchedEpisodes((prevWatched) => ({
      //Calls setWatchedEpisodes, the function that updates the watchedEpisodes state.
      //The function takes prevWatched as an argument, which represents the previous state of watchedEpisodes.
      ...prevWatched, //Uses the spread operator ... to copy all previous entries in prevWatched to the new object. This ensures any existing data in the state is retained.
      [episodeNumber]: !prevWatched[episodeNumber], //Adds or updates the entry for episodeNumber in watchedEpisodes.
      // !prevWatched[episodeNumber] toggles the current value for this episode:
      // If it was true (watched), it becomes false.
      // If it was false or undefined (not watched), it becomes true
    }));
  };

  const handleOnValueChange = (value: any) => {
    setSelectedSeason(Number(value));
    setWatchedEpisodes({});
  };

  const seasonEpisodes = seasons[selectedSeason - 1].episodes;
  const progressValue = //retrieves an array of all the values in the watchedEpisodes object. Since watchedEpisodes stores episodes as keys with boolean values
    //(true for watched, false for not watched), this array contains only true and false values
    (Object.values(watchedEpisodes).filter(Boolean).length / //filters the array, keeping only true values. This effectively creates an array of episodes that have been watched.
      seasonEpisodes.length) * //counts the number of true values, which represents the total number of watched episodes.
    100;

  return (
    <div>
      <SinglePageMainTrailer
        handlePlay={handlePlay}
        play={play}
        unmute={unmute}
        pause={pause}
        reload={reload}
        handleReload={handleReload}
        handleEnd={handleEnd}
        autoplay={autoplay}
        videoKey={videoKey4}
        setIsLoading={setIsLoading}
        src={
          "https://image.tmdb.org/t/p/original/x0dLoNI0ce7GXIwGiMu0GrelxEv.jpg"
        }
        isLoading={isLoading}
        handleUnmute={handleUnmute}
        handlePause={handlePause}
        handleSetRelaod={handleSetRelaod}
      />
      <div className="min-h-screen mb-[135vw] ">
        <div
          // className={`flex justify-center w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
          //   play ? "translate-y-[7vw]" : ""
          // }`}
          className={`w-full mt-[-6vw] z-[50] absolute transition-transform duration-700 ease-in-out ${
            play ? "translate-y-[7vw]" : ""
          }`}
        >
          <div className="flex flex-col">
            <MainDetails
              media={series}
              type={type}
              single={singleseries}
              handleAdded={handleAdded}
              handleLike={handleLike}
              isAdded={isAdded}
              handlePlay={handlePlay}
              videoKey={videoKey4}
              setIsLoading={setIsLoading}
              handleReload={handleReload}
              handleEnd={handleEnd}
              isListView={isListView}
              value={value}
              handleValue={handleValue}
              isLiked={isLiked}
            />
            <SeriesTracker
              handleOnValueChange={handleOnValueChange}
              selectedSeason={selectedSeason}
              seasons={seasons}
              progressValue={progressValue}
              episodes={seasonEpisodes}
              watchedEpisodes={watchedEpisodes}
              onEpisodeWatched={handleEpisodeWatched}
            />
            <div className="flex gap-[6vw] mt-[3vw] h-[22vw] w-full justify-center ml-[2vw]">
              <div className="h-[2vw]">
                <div className="text-[1vw]">How To Watch</div>
                <div className="mb-[2vh] mt-[1vh]">
                  <Tags />
                </div>
                <div className="w-full">
                  <HowToWatchCard />
                </div>
              </div>
              <div className="h-[2vw]">
                <div className="text-[1vw]">Reviews</div>
                <div className="my-[1vh] mb-[2vh]">
                  <Tags reviews={reviews} />
                </div>
                <div className="w-full h-[22vw]">
                  <Reviews />
                </div>
              </div>
            </div>
            <div className="h-[6vw] mt-[10vw] bg-buttonColor rounded-[1vw] max-w-[76vw] ml-[13vw]">
              <div className="text-[1vw] mt-[-2vw]">More Info</div>
              <MoreInfo />
            </div>
            {/* <div className="mt-[6vw] max-w-[50vw]"> */}
            <div className="mt-[4vw] max-w-[75vw] ml-[13vw]">
              <CastSwiper cast={cast} />
            </div>
            {/* Divider line */}
            <div className="max-w-[75vw] ml-[13vw] h-[0.1vh] mt-[4vh] bg-white/20"></div>
            <div className="mt-[6vw]">
              {/* mx-auto max-w-full */}
              <MoreLikeThisSwiper />
            </div>
            <div>
              {/* mx-auto max-w-full */}
              <RecommendationSwiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSeriesPage;
