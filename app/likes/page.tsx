// "use client";
// import React, { useEffect, useState } from "react";
// import { BsFillGrid3X3GapFill } from "react-icons/bs";
// import { FaList } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
// import GridView from "@/components/gridview/GridView";
// import ListView from "@/components/listview/ListView";
// import { getLikes } from "../pages/api/likesPage";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../features/store";
// //import { setLikes, setType } from "../features/dbSlice";

// function LikesPage() {
//   //const searchParams = useSearchParams()
//   const [filter, setFilterd] = useState(false);
//   const [grid, setGrid] = useState(true);
//   const [list, setList] = useState(false);
//   const [watchlist, setWatchlist] = useState(true);
//   const [likes, setLikes] = useState<any[]>([]);
//   const [watchlistItemSearch, setWatchlistItemSearch] = useState<any[]>([]);

//   //Fetch movie details for the IDs in `likes`
//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       if (likes.length > 0) {
//         try {
//           const res = await getLikes(likes);
//           const data = await res.json();
//           setWatchlistItemSearch(data); // Remove null entries
//         } catch (error) {
//           console.error("Error fetching movie details:", error);
//         }
//       }
//     };

//     fetchMovieDetails();
//   }, [likes]);

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

//   const handleGrid = () => {
//     setGrid(!grid);
//     setList(false);
//   };

//   const handleList = () => {
//     setList(!list);
//     setGrid(false);
//   };

//   return (
//     <div className="mt-[20vh] mb-[5vh]">
//       <div className="flex justify-between ml-[5vw]">
//         <div className={"transition-transform duration-700 ease-in-out"}>
//           <div className="text-[2.5vw] font-bold">Likes</div>
//           <div className="h-[5vh] text-[0.7vw] md:text-[0.9vw] text-gray-300">
//             List of content you have liked
//           </div>
//         </div>

//         <div className="relative flex flex-col mr-[2vw]" style={{ top: "3vh" }}>
//           <div className="flex justify-end mb-[2vh] mt-[2vh]">
//             <Button
//               onClick={handleGrid}
//               className={`p-0 w-[2.5vw] h-[2.5vw] bg-customServicesColor rounded-[0.4vw] mr-[1vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//                 grid ? "bg-white/90" : ""
//               }`}
//             >
//               <BsFillGrid3X3GapFill
//                 className={`w-[1.4vw] h-[1.4vw] ${grid ? "text-black" : ""}`}
//               />
//             </Button>
//             <Button
//               onClick={handleList}
//               className={`p-0 w-[2.5vw] h-[2.5vw] bg-customServicesColor rounded-[0.4vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//                 list ? "bg-white/90" : ""
//               }`}
//             >
//               <FaList
//                 className={`w-[1.4vw] h-[1.4vw] ${list ? "text-black" : ""}`}
//               />
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col">
//         <div className={`flex justify-start mt-[-2vh]`}>
//           <div
//             className={`transition-transform duration-700 ease-in-out flex flex-col ml-[5vw]`}
//           >
//             <div>
//               {watchlistItemSearch.length === 0 ? (
//                 <div>No results found.</div>
//               ) : grid ? (
//                 <GridView filter={filter} mediaSearch={watchlistItemSearch} />
//               ) : (
//                 watchlistItemSearch.map((media, index) => (
//                   <ListView
//                     id={media.id}
//                     key={index}
//                     filter={filter}
//                     media_type={media.media_type}
//                     poster_path={media.poster_path}
//                     title={media.title || media.name}
//                     backdrop_path={media.backdrop_path}
//                     overview={media.overview}
//                     list={list}
//                     //likes={likes}
//                     // value={value}
//                     // handleValue={handleValue}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LikesPage;

interface Media {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
      id: number;
      name: string;
      poster_path: string | null;
      backdrop_path: string;
  };
  budget: number;
  genres: {
      id: number;
      name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  media_type: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
  }[];
  production_countries: {
      iso_3166_1: string;
      name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
      iso_639_1: string;
      name: string;
  }[];
  status: string;
  tagline: string;
  title?: string;
  name?:string
  video: boolean;
  vote_average: number;
  vote_count: number;
}



"use client";
import React, { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import GridView from "@/components/gridview/GridView";
import ListView from "@/components/listview/ListView";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

function LikesPage() {
  //const searchParams = useSearchParams()
  const [filter, setFilterd] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const [watchlist, setWatchlist] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  //const dispatch = useDispatch();

  const likesdb = useSelector((state: RootState) => state.content.likes);

 // console.log("LLLLLL",likesdb);
  
        useEffect(() => {
          if (window.innerWidth >= 1024) {
            setIsDesktop(true);
          } else {
            setIsDesktop(false);
          }
        }, []);

  const handleGrid = () => {
    setGrid(!grid);
    setList(false);
  };

  const handleList = () => {
    setList(!list);
    setGrid(false);
  };

  return (
    <div className="md:mt-[20vh] mt-[10vh] mb-[5vh]">
      <div className="flex justify-between ml-[5vw]">
        <div className={"transition-transform duration-700 ease-in-out"}>
          <div className="md:text-[2.5vw] text-[10vw] font-bold">Likes</div>
          {/* <div className="h-[5vh] text-[0.7vw] md:text-[0.9vw] text-gray-300">
            List of content you have liked
          </div> */}
        </div>

        <div className="relative flex flex-col mr-[2vw]" style={{ top: "3vh" }}>
          <div className="flex justify-end md:mb-[2vh] mb-[7vh] md:mt-[2vh] mt-[-2vh]">
            <Button
              onClick={handleGrid}
              className={`p-0 md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] bg-customServicesColor md:rounded-[0.4vw] rounded-lg md:mr-[1vw] mr-[2vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                grid ? "bg-white/90" : ""
              }`}
            >
              <BsFillGrid3X3GapFill
                className={`md:w-[1.4vw] md:h-[1.4vw] w-[6vw] h-[6vw] ${grid ? "text-black" : ""}`}
              />
            </Button>
            <Button
              onClick={handleList}
              className={`p-0 md:w-[2.5vw] md:h-[2.5vw] w-[10vw] h-[10vw] bg-customServicesColor md:rounded-[0.4vw] rounded-lg md:mr-[1vw] mr-[2vw] flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                list ? "bg-white/90" : ""
              }`}
            >
              <FaList
                className={`md:w-[1.4vw] md:h-[1.4vw] w-[6vw] h-[6vw] ${list ? "text-black" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className={`flex justify-start mt-[-2vh]`}>
          <div
            className={`transition-transform duration-700 ease-in-out flex flex-col md:ml-[5vw] ml-[2vw]`}
          >
            <div>
              {likesdb.length === 0 ? (
                <div>No results found.</div>
              ) : grid ? (
                <GridView filter={filter} mediaSearch={likesdb} />
              ) : (
                likesdb.map((media, index) => (
                  <ListView
                    id={media.id}
                    key={index}
                    filter={filter}
                    media_type={media.media_type}
                    poster_path={media.poster_path}
                    title={media.title || media.name}
                    backdrop_path={media.backdrop_path}
                    overview={media.overview}
                    list={list}
                    isDesktop={isDesktop}
                    //likes={likes}
                    // value={value}
                    // handleValue={handleValue}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikesPage;
