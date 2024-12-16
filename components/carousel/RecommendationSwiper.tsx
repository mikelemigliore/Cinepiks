import React, { useEffect, useState } from "react";
import MovieSwiper from "./MovieSwiper";
import { getRecommendation } from "@/app/pages/api/singleMoviePage";

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
          const responseRecommendation = await getRecommendation(id);
          const dataRecommendation = await responseRecommendation.json();

          console.log(dataRecommendation.results);

          setRecommendation(dataRecommendation.results);
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
