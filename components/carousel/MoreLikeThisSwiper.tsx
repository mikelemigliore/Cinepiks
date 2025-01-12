// import React, { useEffect, useState } from "react";
// import MovieSwiper from "./MovieSwiper";
// import {
//   getCollection,
//   getMovieDetails,
//   getSimilarMovies,
// } from "@/app/pages/api/singleMoviePage";

// const title = "More Like This";

// interface MoreLikeThisSwiperProp {
//   mediaType: string;
//   id: number;
// }

// function MoreLikeThisSwiper({ mediaType, id }: MoreLikeThisSwiperProp) {
//   const [collection, setCollection] = useState([]);
//   const [similarMovies, setSimilarMovies] = useState([]);
//   const [wholeCollection, setWholeCollection] = useState([]);
//   const [genres, setGenres] = useState([]);

//   // Fetch movie details and collection
//   useEffect(() => {
//     if (id) {
//       const fetchData = async () => {
//         try {
//           const response = await getMovieDetails(id);
//           const data = await response.json();

//           // Set genres from movie details
//           setGenres(data.genres || []);

//           // Fetch collection if it exists
//           if (data.belongs_to_collection) {
//             const responseCollection = await getCollection(
//               data.belongs_to_collection.id
//             );
//             const dataCollection = await responseCollection.json();

//             // Filter out the current movie ID
//             const updatedCollection = dataCollection.parts.filter(
//               (item: any) => item.id !== id
//             );

//             setCollection(updatedCollection);
//           } else {
//             setCollection([]); // Explicitly set an empty collection if none exists
//           }
//         } catch (error) {
//           console.error("Failed to fetch movie details or collection:", error);
//         }
//       };
//       fetchData();
//     }
//   }, [id]);

//   // Fetch similar movies whenever genres are updated
//   useEffect(() => {
//     if (genres.length > 0) {
//       const fetchSimilarMovies = async () => {
//         try {
//           const responseSimilarMovies = await getSimilarMovies(genres);
//           const dataSimilarMovies = await responseSimilarMovies.json();
//           setSimilarMovies(dataSimilarMovies);
//         } catch (error) {
//           console.error("Failed to fetch similar movies:", error);
//         }
//       };
//       fetchSimilarMovies();
//     }
//   }, [genres]);

//   // Combine collection and similarMovies whenever either changes
//   useEffect(() => {
//     setWholeCollection([...collection, ...similarMovies]);
//   }, [collection, similarMovies]);

//   return (
//     <div>
//       <MovieSwiper
//         medias={wholeCollection}
//         title={title}
//         mediaType={mediaType}
//       />
//     </div>
//   );
// }

// export default MoreLikeThisSwiper;

//I tried this option with redux query but the sequels do not apper in order in the MovieSwiper, so I kept the above code

import React, { useEffect, useState } from "react";
import MovieSwiper from "./MovieSwiper";
import {
  useGetMovieDetailsQuery,
  useGetMovieCollectionQuery,
  useGetMovieSimilarQuery,
} from "@/app/features/homepage/movies/moviedetailsSlice";
import { useGetSeriesCollectionQuery, useGetSeriesDetailsQuery, useGetSeriesSimilarQuery } from "@/app/features/homepage/series/seriesSlice";

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
    }else if (mediaType === "series"){
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
