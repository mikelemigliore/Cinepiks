// //If you have a form or a button that requires user interaction and changes the UI based on the user's input,
// //you need to mark that component as a client component using "use client"
// "use client";
// import MovieCard from "@/components/cards/MovieCard";
// import React, { useState } from "react";
// import { FaFilter } from "react-icons/fa";
// import { BsFillGrid3X3GapFill } from "react-icons/bs";
// import { FaList } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// function SearchPage() {
//   const [filter, setFilterd] = useState(false);
//   const [all, setAll] = useState(true);
//   const [movies, setMovies] = useState(false);
//   const [series, setSeries] = useState(false);
//   const [grid, setGrid] = useState(true);
//   const [list, setList] = useState(false);
//   //In your handleSubmit function, the event is an object that represents the event that triggered the function—in this case,
//   //the form submission. When a form is submitted in React, it generates a FormEvent, which is passed to the event handler as an argument
//   //  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();
//   //   //router.push("/search");
//   // };

//   const handleFilter = () => {
//     setFilterd(!filter);
//   };

//   const handleAll = () => {
//     setAll(true);
//     setMovies(false);
//     setSeries(false);
//   };

//   const handleMovies = () => {
//     setMovies((prev) => !prev);
//     setSeries(false);
//     if (!movies) setAll(false);
//   };

//   const handleSeries = () => {
//     setSeries((prev) => !prev);
//     setMovies(false);
//     if (!series) setAll(false);
//   };

//   // Logic to check if both Movies and Series are selected
//   if (movies && series) {
//     handleAll(); // Re-enable "All" and disable both movies and series
//   }

//   const handleGrid = () => {
//     setGrid(!grid);
//     setList(false);
//   };

//   const handleList = () => {
//     setList(!list);
//     setGrid(false);
//   };

//   const moviesSearch = [
//     {
//       id: 1,
//       title: "Deadpool & Wolverine",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
//     },
//     {
//       id: 2,
//       title: "Spider-Man",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
//     },
//     {
//       id: 3,
//       title: "Avengers",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     },
//     {
//       id: 4,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 5,
//       title: "Avatar:The Way of Water",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
//     },
//     {
//       id: 6,
//       title: "Spider-Man",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
//     },
//     {
//       id: 7,
//       title: "Avengers",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     },
//     {
//       id: 8,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 9,
//       title: "Deadpool & Wolverine",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
//     },
//     {
//       id: 10,
//       title: "Spider-Man",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
//     },
//     {
//       id: 11,
//       title: "Avengers",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     },
//     {
//       id: 12,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 13,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 14,
//       title: "Avatar:The Way of Water",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
//     },
//     {
//       id: 15,
//       title: "Deadpool & Wolverine",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
//     },
//     {
//       id: 16,
//       title: "Spider-Man",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
//     },
//     {
//       id: 17,
//       title: "Avengers",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     },
//     {
//       id: 18,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 19,
//       title: "Avatar:The Way of Water",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
//     },
//     {
//       id: 20,
//       title: "Spider-Man",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
//     },
//     {
//       id: 21,
//       title: "Avengers",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     },
//     {
//       id: 22,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 23,
//       title: "Deadpool & Wolverine",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
//     },
//     {
//       id: 24,
//       title: "Spider-Man",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
//     },
//     {
//       id: 25,
//       title: "Avengers",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
//     },
//     {
//       id: 26,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 27,
//       title: "Batman",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     },
//     {
//       id: 28,
//       title: "Avatar:The Way of Water",
//       imgUrl:
//         "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
//     },
//   ];

//   return (
//     <div className="mt-[11rem]">
//       {/* Visible on small screens */}
//       <div className="block md:hidden my-[-2rem]">
//         <form>
//           {/* Search Input */}
//           <input
//             type="text"
//             className="bg-transparent h-16 px-5 rounded-full text-md border border-gray-500 hover:border-white w-full"
//             placeholder="Search..."
//           />
//         </form>
//       </div>
//       <div className="flex justify-between ml-[6.5rem]">
//         <div>
//           <div className="text-5xl font-bold">Search</div>
//           <div className="h-12 text-base md:text-lg text-gray-300">
//             Use filter on the left to refine your search
//           </div>
//         </div>
//         <div className="flex mr-[3rem] mt-8">
//           <Button
//             onClick={handleGrid}
//             className={`p-0 w-12 h-12 bg-customServicesColor w-12 h-12 rounded-xl mr-3 flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//               grid ? "bg-white/90" : ""
//             }`}
//           >
//             {grid ? (
//               <BsFillGrid3X3GapFill className="w-6 h-6 text-black" />
//             ) : (
//               <BsFillGrid3X3GapFill className="w-6 h-6" />
//             )}
//           </Button>
//           <Button
//             onClick={handleList}
//             className={`p-0 w-12 h-12 bg-customServicesColor w-12 h-12 rounded-xl flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//               list ? "bg-white/90" : ""
//             }`}
//           >
//             {list ? (
//               <FaList className="w-6 h-6 text-black" />
//             ) : (
//               <FaList className="w-6 h-6" />
//             )}
//           </Button>
//         </div>
//       </div>
//       <div className="flex justify-between mr-[3rem]">
//         <div>
//           <Button
//             onClick={handleFilter}
//             className={`bg-customServicesColor ml-[1.5rem] flex justify-center items-center rounded-xl p-0 hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//               filter ? "w-[20rem] h-[50rem]" : "w-12 h-12"
//             } transition-all`}
//           >
//             {filter ? (
//               <FaFilter className="w-6 h-6 text-black" />
//             ) : (
//               <FaFilter className="w-6 h-6" />
//             )}
//           </Button>
//         </div>
//         <div className="flex mr-[86rem] items-center">
//           <Button
//             onClick={handleAll}
//             className={`w-[4rem] h-12 bg-customServicesColor rounded-full flex justify-center items-center mr-3 text-lg hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//               all ? "bg-white/90 text-black font-bold" : ""
//             }`}
//           >
//             All
//           </Button>
//           <Button
//             onClick={handleMovies}
//             className={`w-[7rem] h-12 bg-customServicesColor rounded-full flex justify-center items-center mr-3 text-lg hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//               movies ? "bg-white/90 text-black font-bold" : ""
//             }`}
//           >
//             Movies
//           </Button>
//           <Button
//             onClick={handleSeries}
//             className={`w-[7rem] h-12 bg-customServicesColor rounded-full flex justify-center items-center mr-3 text-lg hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
//               series ? "bg-white/90 text-black font-bold" : ""
//             }`}
//           >
//             Series
//           </Button>
//         </div>

//         <div className="w-[15rem] h-12 bg-customServicesColor rounded-xl flex justify-center items-center">
//           <Select defaultValue="releaseDate">
//             <SelectTrigger className="w-[15rem] border-none focus:ring-0 focus:border-transparent text-lg rounded-xl">
//               {/* Show 'Sort By: Release Date' by default */}
//               <span>
//                 Sort By : <SelectValue placeholder="Release Date" />
//               </span>
//             </SelectTrigger>
//             <SelectContent className="bg-customServicesColor border-none text-lg text-white">
//               <SelectItem
//                 value="releaseDate"
//                 className="text-lg rounded-full pl-5"
//               >
//                 Release Date
//               </SelectItem>
//               <SelectItem
//                 value="popularity"
//                 className="text-lg rounded-full pl-5"
//               >
//                 Popularity
//               </SelectItem>
//               <SelectItem value="rating" className="text-lg rounded-full pl-5">
//                 Rating
//               </SelectItem>
//               <SelectItem value="a-z" className="text-lg rounded-full pl-5">
//                 A - Z
//               </SelectItem>
//               <SelectItem value="z-a" className="text-lg rounded-full pl-5">
//                 Z - A
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-7  ml-[5rem] mr-[2rem] gap-y-12 mt-10 mb-10">
//         {moviesSearch.map((moviesSearch, index) => {
//           const isLastOne = index === 6;

//           return (
//             <MovieCard
//               key={moviesSearch.id}
//               imgUrl={moviesSearch.imgUrl}
//               title={moviesSearch.title}
//               isLastOne={isLastOne}
//               className="" // Apply negative margin
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default SearchPage;

//If you have a form or a button that requires user interaction and changes the UI based on the user's input,
//you need to mark that component as a client component using "use client"
"use client";
import MovieCard from "@/components/cards/MovieCard";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SearchPage() {
  const [filter, setFilterd] = useState(false);
  const [all, setAll] = useState(true);
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  //In your handleSubmit function, the event is an object that represents the event that triggered the function—in this case,
  //the form submission. When a form is submitted in React, it generates a FormEvent, which is passed to the event handler as an argument
  //  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   //router.push("/search");
  // };

  const handleFilter = () => {
    setFilterd(!filter);
  };

  const handleAll = () => {
    setAll(true);
    setMovies(false);
    setSeries(false);
  };

  const handleMovies = () => {
    setMovies((prev) => !prev);
    setSeries(false);
    if (!movies) setAll(false);
  };

  const handleSeries = () => {
    setSeries((prev) => !prev);
    setMovies(false);
    if (!series) setAll(false);
  };

  // Logic to check if both Movies and Series are selected
  if (movies && series) {
    handleAll(); // Re-enable "All" and disable both movies and series
  }

  const handleGrid = () => {
    setGrid(!grid);
    setList(false);
  };

  const handleList = () => {
    setList(!list);
    setGrid(false);
  };

  const moviesSearch = [
    {
      id: 1,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    },
    {
      id: 2,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    },
    {
      id: 3,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    },
    {
      id: 4,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 5,
      title: "Avatar:The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    },
    {
      id: 6,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    },
    {
      id: 7,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    },
    {
      id: 8,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 9,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    },
    {
      id: 10,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    },
    {
      id: 11,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    },
    {
      id: 12,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 13,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 14,
      title: "Avatar:The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    },
    {
      id: 15,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    },
    {
      id: 16,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    },
    {
      id: 17,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    },
    {
      id: 18,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 19,
      title: "Avatar:The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    },
    {
      id: 20,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    },
    {
      id: 21,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    },
    {
      id: 22,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 23,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    },
    {
      id: 24,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    },
    {
      id: 25,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    },
    {
      id: 26,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 27,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 28,
      title: "Avatar:The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    },
  ];

  return (
    <div className="mt-[11rem] mb-[2rem]">
      <div className="flex justify-between ml-[6.5rem]">
        <div
          className={`${
            filter ? "ml-[17rem] transition-all duration-100" : ""
          }`}
        >
          <div className="text-5xl font-bold">Search</div>
          <div className="h-12 text-base md:text-lg text-gray-300">
            Use filter on the left to refine your search
          </div>
        </div>
        <div className="flex flex-col mr-[3rem]">
          <div className="flex justify-end mb-[1.5rem] mt-[1.5rem]">
            <Button
              onClick={handleGrid}
              className={`p-0 w-12 h-12 bg-customServicesColor w-12 h-12 rounded-xl mr-3 flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                grid ? "bg-white/90" : ""
              }`}
            >
              {grid ? (
                <BsFillGrid3X3GapFill className="w-6 h-6 text-black" />
              ) : (
                <BsFillGrid3X3GapFill className="w-6 h-6" />
              )}
            </Button>
            <Button
              onClick={handleList}
              className={`p-0 w-12 h-12 bg-customServicesColor w-12 h-12 rounded-xl flex justify-center items-center hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                list ? "bg-white/90" : ""
              }`}
            >
              {list ? (
                <FaList className="w-6 h-6 text-black" />
              ) : (
                <FaList className="w-6 h-6" />
              )}
            </Button>
          </div>

          <div className="w-[15rem] h-12 bg-customServicesColor rounded-xl flex justify-center items-center">
            <Select defaultValue="releaseDate">
              <SelectTrigger className="w-[15rem] border-none focus:ring-0 focus:border-transparent text-lg rounded-xl">
                {/* Show 'Sort By: Release Date' by default */}
                <span>
                  Sort By : <SelectValue placeholder="Release Date" />
                </span>
              </SelectTrigger>
              <SelectContent className="bg-customServicesColor border-none text-lg text-white">
                <SelectItem
                  value="releaseDate"
                  className="text-lg rounded-full pl-5"
                >
                  Release Date
                </SelectItem>
                <SelectItem
                  value="popularity"
                  className="text-lg rounded-full pl-5"
                >
                  Popularity
                </SelectItem>
                <SelectItem
                  value="rating"
                  className="text-lg rounded-full pl-5"
                >
                  Rating
                </SelectItem>
                <SelectItem value="a-z" className="text-lg rounded-full pl-5">
                  A - Z
                </SelectItem>
                <SelectItem value="z-a" className="text-lg rounded-full pl-5">
                  Z - A
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start mr-[3rem] mt-[-3rem]">
          <div className="mr-6">
            <Button
              onClick={handleFilter}
              className={`bg-customServicesColor ml-[1.5rem] rounded-xl p-0 hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                filter ? "w-[20rem] h-[50rem]" : "w-12 h-12"
              } transition-all`}
            >
              {filter ? (
                <FaFilter className="w-6 h-6 text-black" />
              ) : (
                <FaFilter className="w-6 h-6" />
              )}
            </Button>
          </div>
          <div>
            <div className="flex ml-2">
              <Button
                onClick={handleAll}
                className={`w-[4rem] h-12 bg-customServicesColor rounded-full flex justify-center items-center mr-3 text-lg hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                  all ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                All
              </Button>
              <Button
                onClick={handleMovies}
                className={`w-[7rem] h-12 bg-customServicesColor rounded-full flex justify-center items-center mr-3 text-lg hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                  movies ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                Movies
              </Button>
              <Button
                onClick={handleSeries}
                className={`w-[7rem] h-12 bg-customServicesColor rounded-full flex justify-center items-center mr-3 text-lg hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 duration-100 ${
                  series ? "bg-white/90 text-black font-bold" : ""
                }`}
              >
                Series
              </Button>
            </div>
            <div
              className={`grid grid-cols-2 md:grid-cols-7 gap-y-12 mt-10 mb-10 ${
                filter ? "md:grid-cols-6" : ""
              }`}
            >
              {moviesSearch.map((moviesSearch, index) => {
                const isLastOne = index === 6;

                return (
                  <div
                  className="m-2"
                  style={{ width: '17rem', height: '26.5rem' }} // Fixed dimensions for consistency
                  >
                    <MovieCard
                      key={moviesSearch.id}
                      imgUrl={moviesSearch.imgUrl}
                      title={moviesSearch.title}
                      isLastOne={isLastOne}
                      className="" // Apply negative margin
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
