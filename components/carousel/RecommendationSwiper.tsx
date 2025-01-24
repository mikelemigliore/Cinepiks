import React, { useEffect, useState } from "react";
import MovieSwiper from "./MovieSwiper";
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
  const [recommendation, setRecommendation] = useState<any[]>([]);

  const { data: movieRecommendation } = useGetMovieRecommendationQuery(id);

  const { data: movieRecommendationFallBack } =
    useGetMovieRecommendationFallBackQuery({});

  const { data: seriesRecommendation } = useGetSeriesRecommendationQuery(id);

  const { data: seriesRecommendationFallBack } =
    useGetSeriesRecommendationFallBackQuery({});

  console.log("recommendation", recommendation);

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
    if (!recommendation || recommendation.length === 0) {
      setMissingSetion(true);
    } else {
      setMissingSetion(false);
    }
  }, [recommendation]);

  return (
    <div>
      {recommendation && recommendation.length > 0 && (
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
