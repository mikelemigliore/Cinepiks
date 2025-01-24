import React, { useEffect, useState } from "react";
import MovieSwiper from "./MovieSwiper";
import {
  useGetMovieDetailsQuery,
  useGetMovieCollectionQuery,
  useGetMovieSimilarQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import {
  useGetSeriesCollectionQuery,
  useGetSeriesDetailsQuery,
  useGetSeriesSimilarQuery,
} from "@/app/features/homepage/series/seriesSlice";

const title = "More Like This";

interface MoreLikeThisSwiperProp {
  mediaType: string;
  id: number;
}

function MoreLikeThisSwiper({ mediaType, id }: MoreLikeThisSwiperProp) {
  const [collection, setCollection] = useState<any[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [wholeCollection, setWholeCollection] = useState<any[]>([]);

  const { data: moviedetails } = useGetMovieDetailsQuery(id);

  const { data: movieCollection } = useGetMovieCollectionQuery(
    moviedetails?.belongs_to_collection?.id || []
  );

  const { data: movieSimilar } = useGetMovieSimilarQuery(
    moviedetails?.genres || []
  );

  const { data: seriesdetails } = useGetSeriesDetailsQuery(id);

  const { data: seriesCollection } = useGetSeriesCollectionQuery(
    seriesdetails?.belongs_to_collection?.id || []
  );

  const { data: seriesSimilar } = useGetSeriesSimilarQuery(
    seriesdetails?.genres || []
  );

  useEffect(() => {
    if (mediaType === "movie") {
      if (movieCollection) {
        const updatedCollection = movieCollection.parts.filter(
          (item: any) => item.id !== id
        );
        //console.log(updatedCollection);

        setCollection(updatedCollection);
      } else if (movieCollection === undefined) {
        setCollection([]);
      }

      if (movieSimilar) {
        setSimilarMovies(movieSimilar?.results);
      }
    } else if (mediaType === "series") {
      if (seriesCollection) {
        const updatedCollection = seriesCollection.parts.filter(
          (item: any) => item.id !== id
        );
        //console.log(updatedCollection);

        setCollection(updatedCollection);
      } else if (seriesCollection === undefined) {
        setCollection([]);
      }

      if (seriesSimilar) {
        setSimilarMovies(seriesSimilar?.results);
      }
    }
  }, [movieSimilar, movieCollection, seriesSimilar, seriesCollection]);

  useEffect(() => {
    setWholeCollection([...collection, ...similarMovies]);
  }, [collection, similarMovies]);

  return (
    <div>
      <MovieSwiper
        medias={wholeCollection}
        title={title}
        mediaType={mediaType}
        description={""}
      />
    </div>
  );
}

export default MoreLikeThisSwiper;
