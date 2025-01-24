import { useGetMovieDetailsQuery } from "@/app/features/homepage/movies/moviedetailsSlice";
import { useGetSeriesDetailsQuery } from "@/app/features/homepage/series/seriesSlice";
import React, { useEffect, useState } from "react";

interface MoreInfoProp {
  id: number;
  type: string;
}

interface GenresProp {
  id: number;
  name: string;
}

function MoreInfo({ id, type }: MoreInfoProp) {
  const [releaseDate, setReleaseDate] = useState<string | undefined>();
  const [genres, setGenres] = useState<GenresProp[]>([]);
  const [origins, setOrigins] = useState<string | undefined>();
  const [language, setLanguage] = useState<string | undefined>();
  const [budget, setBudget] = useState<string | undefined>();
  const [boxOffice, setBoxOffice] = useState<string | undefined>();

  const { data: movieDetails } = useGetMovieDetailsQuery(id || 0);

  const { data: seriesDetails } = useGetSeriesDetailsQuery(id || 0);

  useEffect(() => {
    if (type === "movie") {
      const displayNames = new Intl.DisplayNames(["en"], {
        type: "region",
      });
      const languageDisplayNames = new Intl.DisplayNames(["en"], {
        type: "language",
      });
      if (movieDetails) {
        // For Country Names
        const countryName = displayNames.of(movieDetails.origin_country[0]);

        // For Language Names
        const languageName = languageDisplayNames.of(
          movieDetails.original_language
        );

        setGenres(movieDetails?.genres || []);
        setReleaseDate(movieDetails.release_date);
        setGenres(movieDetails.genres);
        setOrigins(countryName);
        setLanguage(languageName);
        setBudget(
          movieDetails.budget === 0
            ? " N/A"
            : movieDetails.budget.toLocaleString()
        );
        setBoxOffice(
          movieDetails.revenue === 0
            ? " N/A"
            : movieDetails.revenue.toLocaleString()
        );
      }
    } else if (type === "series") {
      const displayNames = new Intl.DisplayNames(["en"], {
        type: "region",
      });
      const languageDisplayNames = new Intl.DisplayNames(["en"], {
        type: "language",
      });
      if (seriesDetails) {
        const countryName = displayNames.of(seriesDetails.origin_country[0]);

        const languageName = languageDisplayNames.of(
          seriesDetails.original_language
        );

        setGenres(seriesDetails?.genres || []);
        setReleaseDate(seriesDetails.first_air_date);
        setGenres(seriesDetails.genres);
        setOrigins(countryName);
        setLanguage(languageName);
        setBudget(
          seriesDetails.budget === undefined
            ? " N/A"
            : seriesDetails?.budget.toLocaleString()
        );
        setBoxOffice(
          seriesDetails.revenue === undefined
            ? " N/A"
            : seriesDetails?.revenue.toLocaleString()
        );
      }
    }
  }, [id, movieDetails, seriesDetails]);

  const formatDate = (date: string | undefined) => {
    if (date) {
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
    return "Not Available";
  };

  return (
    <div className="md:flex justify-between items-center mx-[4vw] h-full md:mt-[0.5vw] mt-[2vh] md:space-y-[0vh] space-y-[2vh]">
      <div>
        <div className="md:text-[0.9vw] text-[4vw]">Release</div>
        <div className="text-customTextColor md:text-[0.9vw] text-[4vw]">
          {formatDate(releaseDate)}
        </div>
      </div>
      <div>
        <div className="md:text-[0.9vw] text-[4vw]">Genres</div>
        <div className="text-customTextColor md:text-[0.9vw] text-[4vw]">
          {genres
            .slice(0, 3)
            .map((genre) => genre.name)
            .join(", ")}
        </div>
      </div>
      <div>
        <div className="md:text-[0.9vw] text-[4vw]">Origins</div>
        <div className="text-customTextColor md:text-[0.9vw] text-[4vw]">
          {origins}
        </div>
      </div>
      <div>
        <div className="md:text-[0.9vw] text-[4vw]">Languages</div>
        <div className="text-customTextColor md:text-[0.9vw] text-[4vw]">
          {language}
        </div>
      </div>
      <div>
        <div className="md:text-[0.9vw] text-[4vw]">Budget</div>
        <div className="text-customTextColor md:text-[0.9vw] text-[4vw]">{`$${budget}`}</div>
      </div>
      <div>
        <div className="md:text-[0.9vw] text-[4vw]">Box Office</div>
        <div className="text-customTextColor md:text-[0.9vw] text-[4vw]">{`$${boxOffice}`}</div>
      </div>
    </div>
  );
}

export default MoreInfo;
