import React from 'react'
import MovieSwiper from './MovieSwiper'

const movies = [
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

const title = "Recomendations"

function RecommendationSwiper() {
  return (
    <div><MovieSwiper movies={movies} title={title}/></div>
  )
}

export default RecommendationSwiper