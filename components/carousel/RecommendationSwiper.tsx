import React, { useEffect, useState } from "react";
import MovieSwiper from "./MovieSwiper";
// import {
//   getFallBackRecommendation,
//   getRecommendation,
// } from "@/app/pages/api/singleMoviePage";
import {
  useGetMovieRecommendationFallBackQuery,
  useGetMovieRecommendationQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import {
  useGetSeriesRecommendationFallBackQuery,
  useGetSeriesRecommendationQuery,
} from "@/app/features/homepage/series/seriesSlice";

interface RecommendationSwiperProp {
  mediaType: string;
  id: number;
  setMissingSetion: any;
}

const title = "Recomendations";

function RecommendationSwiper({
  mediaType,
  id,
  setMissingSetion,
}: RecommendationSwiperProp) {
  const [recommendation, setRecommendation] = useState([]);

  const { data: movieRecommendation } = useGetMovieRecommendationQuery(id);

  const { data: movieRecommendationFallBack } =
    useGetMovieRecommendationFallBackQuery({});

  const { data: seriesRecommendation } = useGetSeriesRecommendationQuery(id);

  const { data: seriesRecommendationFallBack } =
    useGetSeriesRecommendationFallBackQuery({});

  useEffect(() => {
    if (mediaType === "movie") {
      if (movieRecommendation) {
        setRecommendation(movieRecommendation?.results);
      } else {
        setRecommendation(movieRecommendationFallBack?.results);
      }
    } else if (mediaType === "series") {
      if (seriesRecommendation) {
        setRecommendation(seriesRecommendation?.results);
      } else {
        setRecommendation(seriesRecommendationFallBack?.results);
      }
    }
  }, [
    movieRecommendation,
    movieRecommendationFallBack,
    seriesRecommendationFallBack,
    seriesRecommendation,
  ]);

  useEffect(() => {
    if (recommendation.length === 0) {
      setMissingSetion(true);
    }
  }, [recommendation]);

  // useEffect(() => {
  //   if (id) {
  //     const fetchData = async () => {
  //       try {
  //         const fallbackRecommendation = await getFallBackRecommendation();
  //         const responseRecommendation = await getRecommendation(id);
  //         const dataFallbackRecommendation =
  //           await fallbackRecommendation.json();
  //         const dataRecommendation = await responseRecommendation.json();

  //         setRecommendation(
  //           dataRecommendation.results.length === 0
  //             ? dataFallbackRecommendation.results
  //             : dataRecommendation.results
  //         );
  //       } catch (error) {
  //         console.error("Failed to fetch:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [id]);

  return (
    <div>
      {recommendation === null && (
        <MovieSwiper
          medias={recommendation}
          title={title}
          mediaType={mediaType}
          description={""}
        />
      )}
    </div>
  );
}

export default RecommendationSwiper;
