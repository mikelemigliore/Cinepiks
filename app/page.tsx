"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons for toggle
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import ServicesSwiper from "@/components/carousel/ServicesSwiper";
import MovieSwiper from "@/components/carousel/MovieSwiper";

const services = [
  { id: 1, title: "Netflix", img: "/genresIcons/netflix-3.svg" },
  { id: 2, title: "Hulu", img: "/genresIcons/Hulu-Logo.wine.svg" },
  {
    id: 3,
    title: "Prime Video",
    img: "/genresIcons/Amazon_Prime_Video_logo.svg.png",
  },
  {
    id: 4,
    title: "Apple Tv",
    img: "/genresIcons/apple-tv-plus-seeklogo.svg",
  },
  { id: 5, title: "Disney+", img: "/genresIcons/Disney+_2024.svg.png" },
  { id: 6, title: "Max", img: "/genresIcons/20230413031451!Max_logo.svg" },
  {
    id: 7,
    title: "Peacock",
    img: "/genresIcons/NBCUniversal_Peacock_Logo.svg",
  },
  { id: 8, title: "Paramount+", img: "/genresIcons/paramount-seeklogo.svg" },
  { id: 9, title: "Fandango", img: "/genresIcons/Fandango_logo14.png" },
];

const swiperTitles = [
  { id: 1, title: "In Theaters" },
  { id: 2, title: "Popular" },
];

function LoginIn() {
  const items = [
    {
      id: 1,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 2,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 3,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 4,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 5,
      title: "Avatar: The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 6,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 7,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 8,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 9,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 10,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 11,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 12,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 13,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 14,
      title: "Avatar: The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 15,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 16,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 17,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 18,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 19,
      title: "Avatar: The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 20,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 21,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 22,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 23,
      title: "Deadpool & Wolverine",
      imgUrl:
        "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 24,
      title: "Spider-Man",
      imgUrl:
        "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 25,
      title: "Avengers",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 26,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 27,
      title: "Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 28,
      title: "Avatar: The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
      type: "movie",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 29,
      title: "The Penguin",
      imgUrl:
        "https://image.tmdb.org/t/p/original/a2fqompEWB2GFp9GOdlqLcfEFfw.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 30,
      title: "Breaking Bad",
      imgUrl:
        "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 31,
      title: "The Office",
      imgUrl:
        "https://image.tmdb.org/t/p/original/dg9e5fPRRId8PoBE0F6jl5y85Eu.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 32,
      title: "Dragon Ball Super",
      imgUrl:
        "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 33,
      title: "The Last Of Us",
      imgUrl:
        "https://image.tmdb.org/t/p/original/sADB9n2KwhQNsRLfzeuTj8BsqeB.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 34,
      title: "Loki",
      imgUrl:
        "https://image.tmdb.org/t/p/original/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 35,
      title: "Better Call Saul",
      imgUrl:
        "https://image.tmdb.org/t/p/original/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 36,
      title: "Invincible",
      imgUrl:
        "https://image.tmdb.org/t/p/original/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 37,
      title: "The Boys",
      imgUrl:
        "https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 38,
      title: "Shougun",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 39,
      title: "Baki",
      imgUrl:
        "https://image.tmdb.org/t/p/original/x145FSI9xJ6UbkxfabUsY2SFbu3.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 40,
      title: "The Sopranos",
      imgUrl:
        "https://image.tmdb.org/t/p/original/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 41,
      title: "Peaky Blinders",
      imgUrl:
        "https://image.tmdb.org/t/p/original/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 42,
      title: "Rick and Morty",
      imgUrl:
        "https://image.tmdb.org/t/p/original/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 43,
      title: "Drake and Josh",
      imgUrl:
        "https://image.tmdb.org/t/p/original/udCvGctktHvvf8w51XyTPfcmzDa.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 44,
      title: "Moon Knight",
      imgUrl:
        "https://image.tmdb.org/t/p/original/YksR65as1ppF2N48TJAh2PLamX.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 45,
      title: "The Penguin",
      imgUrl:
        "https://image.tmdb.org/t/p/original/a2fqompEWB2GFp9GOdlqLcfEFfw.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 46,
      title: "Breaking Bad",
      imgUrl:
        "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 47,
      title: "The Office",
      imgUrl:
        "https://image.tmdb.org/t/p/original/dg9e5fPRRId8PoBE0F6jl5y85Eu.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 48,
      title: "Dragon Ball Super",
      imgUrl:
        "https://image.tmdb.org/t/p/original/8xc6QcxN8ZOCW4lo4IpVNm3VqKt.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 49,
      title: "The Last Of Us",
      imgUrl:
        "https://image.tmdb.org/t/p/original/sADB9n2KwhQNsRLfzeuTj8BsqeB.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 50,
      title: "Loki",
      imgUrl:
        "https://image.tmdb.org/t/p/original/oJdVHUYrjdS2IqiNztVIP4GPB1p.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 51,
      title: "Better Call Saul",
      imgUrl:
        "https://image.tmdb.org/t/p/original/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
    {
      id: 52,
      title: "Invincible",
      imgUrl:
        "https://image.tmdb.org/t/p/original/dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
    },
    {
      id: 53,
      title: "The Boys",
      imgUrl:
        "https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    },
    {
      id: 54,
      title: "Shougun",
      imgUrl:
        "https://image.tmdb.org/t/p/original/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
    },
    {
      id: 55,
      title: "Baki",
      imgUrl:
        "https://image.tmdb.org/t/p/original/x145FSI9xJ6UbkxfabUsY2SFbu3.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
    },
    {
      id: 56,
      title: "The Sopranos",
      imgUrl:
        "https://image.tmdb.org/t/p/original/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
      type: "series",
      imgBackdrop:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
    },
  ];

  const movies = items.filter((item) => item.type === "movie");
  const series = items.filter((item) => item.type === "series");

  const [showPassword, setShowPassword] = useState(false);
  const [logInPage, setLogInPage] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = items.length; // Set the total number of slides

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Ref to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevious = () => {
    setActiveSlide((prevSlide) =>
      prevSlide - 1 < 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  // Reset timeout when manually navigating or auto-advancing
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 10000); // Change every 10 seconds
  };

  useEffect(() => {
    resetTimeout(); // Set or reset the timeout on activeSlide change

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Cleanup on unmount
      }
    };
  }, [activeSlide, handleNext]);

  return (
    <div>
      <div className="flex">
        <div className="w-[70vw] rounded-tr-custom rounded-br-custom overflow-hidden">
          {/* The overflow-hidden property solved the issue because it ensures that any content (such as the CarouselContent, CarouselItem, or img elements) 
      that extends outside the boundaries of the parent container (div.w-[70vw]) is clipped and confined within those boundaries. */}
          <Carousel
            activeSlide={activeSlide} //activeSlide: Keeps track of which slide is currently shown
            totalSlides={totalSlides} //Provides the number of slides in the carousel.
          >
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem className="relative w-full flex justify-center items-center ">
                  <div className="relative">
                    <img
                      src={item.imgBackdrop}
                      className="bg-cover bg-center md:bg-top bg-no-repeat"
                    />
                    <div className="absolute inset-0 flex flex-col justify-between ml-[7vw] my-[4vw]">
                      <div>
                        <h1 className="text-[1.7vw] font-semibold line-clamp-1">
                          Out Now
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-[2.5vw] font-semibold line-clamp-1">
                          {item.title}
                        </h1>
                        <div className="text-[1vw] flex justify-start items-center">
                          <span>Action</span>
                          <GoDotFill className="w-[0.7vw] h-[0.7vw] mx-[0.4vw] rounded-full" />
                          <span>Sci-fi</span>
                          <GoDotFill className="w-[0.7vw] h-[0.7vw] mx-[0.4vw] rounded-full" />
                          <span className="pr-[0.6vw]">Comedy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              onClick={handlePrevious}
              className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50"
            />
            <CarouselNext
              onClick={handleNext}
              className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50"
            />
          </Carousel>
        </div>

        <div className="mt-[1vw] ml-[8vw]">
          <img
            src="/MovieLogo.png"
            alt="Movie Logo"
            className="w-[8vw] m-[2vw]"
          />
          <div className="flex flex-col items-center">
            <div className="space-y-[1vw]">
              <h1 className="mb-[1vh] text-[1.2vw] font-bold">Log In</h1>
              <div>
                <form>
                  <input
                    type="text"
                    className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[14vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor`}
                    placeholder="Enter email or username"
                  />
                </form>
              </div>
              <div>
                <form className="flex relative">
                  {/* Search Input */}
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[14vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor ${
                      showPassword ? "text-[0.9vw]" : "text-[0.9vw]"
                    }`}
                    placeholder=""
                    readOnly
                    value="dthsthsrthesrtvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
                  />
                  <div
                    className="absolute right-[1vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-customColor pl-[0.5vw]"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="bg-customColor w-[1.3vw] h-[1.3vw]" />
                    ) : (
                      <AiOutlineEye className="bg-customColor w-[1.3vw] h-[1.3vw]" />
                    )}
                  </div>
                </form>
              </div>
              <div>
                <Button className=" font-bold rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                  Log In
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <div className="flex items-center">
                    <Checkbox
                      id="terms1"
                      className="border border-white m-[0.5vw]"
                    />
                    <div>
                      <label
                        htmlFor="terms1"
                        className="text-customTextColor text-[0.7vw] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remind Me
                      </label>
                    </div>
                  </div>
                </div>
                <div className="pl-[1.5vw]">
                  <Link
                    href="/"
                    className="text-[0.7vw] font-medium leading-none text-customTextColor  border-b-[0.1vw] border-transparent hover:border-customTextColor"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div>
                <Link href="/homepage">
                  <Button className=" font-bold rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                    Continue As Guest
                  </Button>
                </Link>
              </div>
              <div className="flex">
                <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
                <h1 className="flex mx-[1vw] mt-[0.5vw] text-[0.7vw]">Or</h1>
                <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
              </div>
              <div className="">
                <Button className=" rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-transparent hover:bg-white text-white/90 hover:text-black active:bg-white active:scale-95 border border-customTextColor">
                  <FcGoogle className="w-[1.3vw] h-[1.3vw] ml-[-1vw] mr-[1vw]" />
                  Continue with Google
                </Button>
              </div>
              <div>
                <Button className="rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-transparent hover:bg-white text-white/90 hover:text-black  active:bg-white active:scale-95 border border-customTextColor">
                  <img
                    src="/genresIcons/facebook.svg"
                    className="w-[1.4vw] h-[1.4vw]  mr-[1vw] text-blue-500"
                  />
                  Continue with Facebook
                </Button>
              </div>
              <div className="flex items-center space-x-2 ml-[2.5vw]">
                <div>
                  <h1 className="text-[0.8vw] font-medium leading-none text-customTextColor">
                    Don't have one?
                  </h1>
                </div>
                <div>
                  <Link
                    href="/singup"
                    className="text-[0.8vw] font-medium leading-none text-blue-500  border-b-[0.1vw] border-transparent hover:border-blue-500"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[5vw]">
        <ServicesSwiper logInPage={logInPage} services={services} />
      </div>
      <div className="mt-[2vw] mb-[4vw]">
        <div
          className={`ml-2 mb-4 md:ml-[3vw] text-white text-xl md:text-[1.3vw] font-semibold`}
        >
          <h1>See What's Waiting for You</h1>

          <div
            className={`text-[2vw] md:text-[0.9vw] pt-[1vh] pb-[1vh] font-medium text-gray-300`}
          >
            <h2>
              Get a sneak peek at trending movies and series available to
              explore.
            </h2>
          </div>
        </div>
        {swiperTitles.map((swiperTitle) => (
          <MovieSwiper
            logInPage={logInPage}
            medias={movies}
            title={swiperTitle.title}
            mediaType={"movie"}
          />
        ))}
      </div>
    </div>
  );
}

export default LoginIn;
