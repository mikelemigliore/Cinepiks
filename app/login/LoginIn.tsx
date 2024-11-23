// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const itemBigCards = [
//   {
//     id: 1,
//     type: "movie",
//     title: "Alien",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
//   },
//   {
//     id: 2,
//     type: "movie",
//     title: "Spider-Man 3",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
//   },
//   {
//     id: 3,
//     type: "movie",
//     title: "Avengers: Infinity War",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
//   },
//   {
//     id: 4,
//     type: "movie",
//     title: "The Batman",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
//   },
//   {
//     id: 5,
//     type: "movie",
//     title: "Avatar:The Way of Water",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
//   },
//   {
//     id: 6,
//     type: "series",
//     title: "Breaking Bad",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
//   },
//   {
//     id: 7,
//     type: "series",
//     title: "The Penguin",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/56O2drADoJPtv9Z49jKZoBNyMc5.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
//   },
//   {
//     id: 8,
//     type: "series",
//     title: "Dragon Ball Super",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/x0dLoNI0ce7GXIwGiMu0GrelxEv.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
//   },
//   {
//     id: 9,
//     type: "series",
//     title: "Loki",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/1pPcHpANG5mGtSYT7MA9QeYOKuK.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
//   },
//   {
//     id: 10,
//     type: "series",
//     title: "The Office",
//     imgUrl:
//       "https://image.tmdb.org/t/p/original/b7wyaeJGU2Q4ql7xZr52vdW5TKp.jpg",
//     genres1: "Action",
//     genres2: "Comedy",
//     genres3: "Drama",
//     rated: "R",
//     time: "2h 36m",
//     description:
//       "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
//   },
// ];

// interface LoginProp {
//   handleLoginIn: () => void;
// }

// function LoginIn({ handleLoginIn }: LoginProp) {
//   return (
//     <div>
//       <div className='w-[70vw]'>
//         <Carousel>
//           <CarouselContent>
//             {/* className="transition-transform duration-75" */}
//             {itemBigCards.map((itemBigCard) => (
//               <CarouselItem className="relative w-full flex justify-center items-center px-0 md:px-0">
//                 <img
//                   src={itemBigCard.imgUrl}
//                   className="inset-0 bg-cover bg-center md:bg-top bg-no-repeat"
//                 />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 w-[1vw]" />
//           <CarouselNext className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50 w-[2vw]" />
//         </Carousel>
//       </div>

//       <div className="mt-20">
//         <div>LoginIn</div>
//         <Button onClick={handleLoginIn}>Continue As Guest</Button>
//       </div>
//     </div>
//   );
// }

// export default LoginIn;
