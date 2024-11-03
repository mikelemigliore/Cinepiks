import React from 'react'
import MovieSwiper from './MovieSwiper'

const movies = [
  {
    id: 1,
    title: "Deadpool & Wolverine",
    imgUrl: "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    type: "movie",
  },
  {
    id: 2,
    title: "Spider-Man",
    imgUrl: "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    type: "movie",
  },
  {
    id: 3,
    title: "Avengers",
    imgUrl: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    type: "movie",
  },
  {
    id: 4,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 5,
    title: "Avatar:The Way of Water",
    imgUrl: "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    type: "movie",
  },
  {
    id: 6,
    title: "Spider-Man",
    imgUrl: "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    type: "movie",
  },
  {
    id: 7,
    title: "Avengers",
    imgUrl: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    type: "movie",
  },
  {
    id: 8,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 9,
    title: "Deadpool & Wolverine",
    imgUrl: "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    type: "movie",
  },
  {
    id: 10,
    title: "Spider-Man",
    imgUrl: "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    type: "movie",
  },
  {
    id: 11,
    title: "Avengers",
    imgUrl: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    type: "movie",
  },
  {
    id: 12,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 13,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 14,
    title: "Avatar:The Way of Water",
    imgUrl: "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    type: "movie",
  },
  {
    id: 15,
    title: "Deadpool & Wolverine",
    imgUrl: "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    type: "movie",
  },
  {
    id: 16,
    title: "Spider-Man",
    imgUrl: "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    type: "movie",
  },
  {
    id: 17,
    title: "Avengers",
    imgUrl: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    type: "movie",
  },
  {
    id: 18,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 19,
    title: "Avatar:The Way of Water",
    imgUrl: "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    type: "movie",
  },
  {
    id: 20,
    title: "Spider-Man",
    imgUrl: "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    type: "movie",
  },
  {
    id: 21,
    title: "Avengers",
    imgUrl: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    type: "movie",
  },
  {
    id: 22,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 23,
    title: "Deadpool & Wolverine",
    imgUrl: "https://image.tmdb.org/t/p/original/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    type: "movie",
  },
  {
    id: 24,
    title: "Spider-Man",
    imgUrl: "https://image.tmdb.org/t/p/original/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    type: "movie",
  },
  {
    id: 25,
    title: "Avengers",
    imgUrl: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    type: "movie",
  },
  {
    id: 26,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 27,
    title: "Batman",
    imgUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    type: "movie",
  },
  {
    id: 28,
    title: "Avatar:The Way of Water",
    imgUrl: "https://image.tmdb.org/t/p/original/5ScPNT6fHtfYJeWBajZciPV3hEL.jpg",
    type: "movie",
  },
];

const title = "Recomendations"

function RecommendationSwiper() {
  return (
    <div><MovieSwiper medias={movies} title={title}/></div>
  )
}

export default RecommendationSwiper