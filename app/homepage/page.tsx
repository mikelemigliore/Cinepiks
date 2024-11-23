"use client";
import MainCarousel from "@/components/maincarousel/MainCarousel";
import React, { useState } from "react";
import MovieSwiper from "@/components/carousel/MovieSwiper";
import ServicesSwiper from "@/components/carousel/ServicesSwiper";
import GenresSwiper from "@/components/carousel/GenresSwiper";
import BigCardSwiper from "@/components/carousel/BigCardSwiper";

function HomePage() {
  // Define an array of movies with their title and poster URLs
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

  // const services = [
  //   { id: 1, title: "Netflix"},
  //   { id: 2, title: "Hulu"},
  //   { id: 3, title: "Prime Video"},
  //   { id: 4, title: "Apple Tv" },
  //   { id: 5, title: "Disney+"},
  //   { id: 6, title: "Max"},
  //   { id: 7, title: "Peacock"},
  //   { id: 8, title: "Paramount+" },
  //   { id: 11, title: "Fandango"},
  // ]

  const swiperTitles = [
    { id: 1, title: "In Theaters" },
    { id: 2, title: "What's Popular" },
    { id: 3, title: "Top Rated" },
    { id: 4, title: "Coming Soon" },
    { id: 5, title: "What's New" },
    { id: 6, title: "Recommendation" },
    { id: 7, title: "New On Netflix" },
    { id: 8, title: "New On Hulu" },
    { id: 9, title: "New On PrimeVideo" },
    { id: 10, title: "Action and Adventure Movies" },
    { id: 11, title: "Horror and Thriller Movies" },
    { id: 12, title: "Popular Series" },
    { id: 13, title: "Crime Series" },
    { id: 14, title: "Documentaries" },
  ];

  const genres = [
    {
      id: 1,
      title: "Action",
      iconBlack: "/genresIcons/icons8-greek-helmet.svg",
      iconWhite: "/genresIcons/icons8-greek-helmet-white.svg",
    },
    {
      id: 2,
      title: "Adventure",
      iconBlack: "/genresIcons/icons8-worldwide-location.svg",
      iconWhite: "/genresIcons/icons8-worldwide-location-white.svg",
    },
    {
      id: 3,
      title: "Animated",
      iconBlack: "/genresIcons/icons8-animation.svg",
      iconWhite: "/genresIcons/icons8-animation-white.svg",
    },
    {
      id: 20,
      title: "Award Winner",
      iconBlack: "/genresIcons/icons8-award.svg",
      iconWhite: "/genresIcons/icons8-award-white.svg",
    },
    {
      id: 4,
      title: "Comedy",
      iconBlack: "/genresIcons/icons8-joker.svg",
      iconWhite: "/genresIcons/icons8-joker-white.svg",
    },
    {
      id: 5,
      title: "Crime",
      iconBlack: "/genresIcons/icons8-horror.svg",
      iconWhite: "/genresIcons/icons8-horror-white.svg",
    },
    {
      id: 6,
      title: "Family",
      iconBlack: "/genresIcons/icons8-family.svg",
      iconWhite: "/genresIcons/icons8-family-white.svg",
    },
    {
      id: 7,
      title: "Fantasy",
      iconBlack: "/genresIcons/icons8-witch's-hat.svg",
      iconWhite: "/genresIcons/icons8-witch's-hat-white.svg",
    },
    {
      id: 8,
      title: "Sci-fi",
      iconBlack: "/genresIcons/icons8-superman.svg",
      iconWhite: "/genresIcons/icons8-superman-white.svg",
    },
    // { id: 8, title: "Sci-fi", iconBlack: "/genresIcons/icons8-stormtrooper.svg" , iconWhite:"/genresIcons/icons8-stormtrooper-white.svg" },
    // { id: 9, title: "Drama", iconBlack: "/genresIcons/icons8-theatre-curtain.svg" , iconWhite:"/genresIcons/icons8-theatre-curtain-white.svg" },
    {
      id: 9,
      title: "Drama",
      iconBlack: "/genresIcons/icons8-venetian-mask.svg",
      iconWhite: "/genresIcons/icons8-venetian-mask-white.svg",
    },
    {
      id: 10,
      title: "Horror",
      iconBlack: "/genresIcons/icons8-scream.svg",
      iconWhite: "/genresIcons/icons8-scream-white.svg",
    },
    {
      id: 11,
      title: "Thriller",
      iconBlack: "/genresIcons/icons8-spy.svg",
      iconWhite: "/genresIcons/icons8-spy-white.svg",
    },
    {
      id: 12,
      title: "Romance",
      iconBlack: "/genresIcons/icons8-rose.svg",
      iconWhite: "/genresIcons/icons8-rose-white.svg",
    },
    {
      id: 13,
      title: "History",
      iconBlack: "/genresIcons/icons8-colosseum.svg",
      iconWhite: "/genresIcons/icons8-colosseum-white.svg",
    },
    {
      id: 14,
      title: "Mystery",
      iconBlack: "/genresIcons/icons8-anonymous-mask.svg",
      iconWhite: "/genresIcons/icons8-anonymous-mask-white.svg",
    },
    {
      id: 15,
      title: "War",
      iconBlack: "/genresIcons/icons8-cannon.svg",
      iconWhite: "/genresIcons/icons8-cannon-white.svg",
    },
    {
      id: 16,
      title: "Western",
      iconBlack: "/genresIcons/icons8-cow-skull.svg",
      iconWhite: "/genresIcons/icons8-cow-skull-white.svg",
    },
    {
      id: 17,
      title: "Documentary",
      iconBlack: "/genresIcons/icons8-documentary.svg",
      iconWhite: "/genresIcons/icons8-documentary-white.svg",
    },
    {
      id: 18,
      title: "Music",
      iconBlack: "/genresIcons/icons8-music.svg",
      iconWhite: "/genresIcons/icons8-music-white.svg",
    },
    {
      id: 19,
      title: "Sport",
      iconBlack: "/genresIcons/icons8-soccer-ball.svg",
      iconWhite: "/genresIcons/icons8-soccer-ball-white.svg",
    },
  ];

  const itemBigCards = [
    {
      id: 1,
      type: "movie",
      title: "Alien",
      imgUrl:
        "https://image.tmdb.org/t/p/original/6vn6K9oX82i6E86ZiHVxqVEMQqP.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
    {
      id: 2,
      type: "movie",
      title: "Spider-Man 3",
      imgUrl:
        "https://image.tmdb.org/t/p/original/vQszsOCuIKQguZGWutjuxVDJpwh.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
    },
    {
      id: 3,
      type: "movie",
      title: "Avengers: Infinity War",
      imgUrl:
        "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
    },
    {
      id: 4,
      type: "movie",
      title: "The Batman",
      imgUrl:
        "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    },
    {
      id: 5,
      type: "movie",
      title: "Avatar:The Way of Water",
      imgUrl:
        "https://image.tmdb.org/t/p/original/wMMyNUjyvy4U68nrrMkwLwg3GU3.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
    {
      id: 6,
      type: "series",
      title: "Breaking Bad",
      imgUrl:
        "https://image.tmdb.org/t/p/original/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
    {
      id: 7,
      type: "series",
      title: "The Penguin",
      imgUrl:
        "https://image.tmdb.org/t/p/original/56O2drADoJPtv9Z49jKZoBNyMc5.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
    },
    {
      id: 8,
      type: "series",
      title: "Dragon Ball Super",
      imgUrl:
        "https://image.tmdb.org/t/p/original/x0dLoNI0ce7GXIwGiMu0GrelxEv.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
    },
    {
      id: 9,
      type: "series",
      title: "Loki",
      imgUrl:
        "https://image.tmdb.org/t/p/original/1pPcHpANG5mGtSYT7MA9QeYOKuK.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    },
    {
      id: 10,
      type: "series",
      title: "The Office",
      imgUrl:
        "https://image.tmdb.org/t/p/original/b7wyaeJGU2Q4ql7xZr52vdW5TKp.jpg",
      genres1: "Action",
      genres2: "Comedy",
      genres3: "Drama",
      rated: "R",
      time: "2h 36m",
      description:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    },
  ];

  const moviesBigCard = itemBigCards.filter((item) => item.type === "movie");
  const seriesBigSeries = itemBigCards.filter((item) => item.type === "series");

  //   const [isLogged, setIsLogged] = useState(false);

  //   const handleLoginIn = () =>{
  //     setIsLogged(true)
  //   }

  return (
    <div className="relative">
      {/* {isLogged ? ( */}
      <div>
        <MainCarousel />
        <div className="relative -mt-[26rem] md:-mt-[9rem]">
          {swiperTitles.map((swiperTitle, index) => (
            <div
              key={swiperTitle.id}
              className="relative left-0 my-12 right-0 z-40"
            >
              <MovieSwiper
                medias={movies}
                title={swiperTitle.title}
                mediaType={"movie"}
              />
              {index === 3 && (
                <div className="relative  left-0 right-0 my-16 z-40">
                  <ServicesSwiper services={services} />
                </div>
              )}

              {index === 7 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <GenresSwiper genres={genres} />
                </div>
              )}

              {index === 0 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <MovieSwiper
                    medias={series}
                    title={swiperTitle.title}
                    mediaType={"series"}
                  />
                </div>
              )}

              {index === 1 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <BigCardSwiper itemBigCards={moviesBigCard} />
                </div>
              )}

              {index === 11 && (
                <div className="relative left-0 right-0 my-16 z-40">
                  <BigCardSwiper itemBigCards={seriesBigSeries} />
                  {/* <BigCardSwiper movies={movies}/> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* ) : (
        <div>
          <LoginIn handleLoginIn={handleLoginIn} />
        </div>
      )} */}
    </div>
  );
}

export default HomePage;
