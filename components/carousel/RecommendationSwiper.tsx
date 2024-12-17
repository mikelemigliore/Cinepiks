import React, { useEffect, useState } from "react";
import MovieSwiper from "./MovieSwiper";
import { getFallBackRecommendation, getRecommendation } from "@/app/pages/api/singleMoviePage";

interface RecommendationSwiperProp {
  mediaType: string;
  id: number;
}

const title = "Recomendations";

function RecommendationSwiper({ mediaType, id }: RecommendationSwiperProp) {
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const fallbackRecommendation = await getFallBackRecommendation();
          const responseRecommendation = await getRecommendation(id);
          const dataFallbackRecommendation =
            await fallbackRecommendation.json();
          const dataRecommendation = await responseRecommendation.json();

          // console.log(dataFallbackRecommendation.results);
          // console.log(dataRecommendation.results);

          setRecommendation(dataRecommendation.results.length === 0 ? dataFallbackRecommendation.results : dataRecommendation.results);
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <MovieSwiper
        medias={recommendation}
        title={title}
        mediaType={mediaType}
      />
    </div>
  );
}

export default RecommendationSwiper;
