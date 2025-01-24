import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FaFilter } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const availability = [
  { id: "4", tag: "streaming" },
  { id: "2|3", tag: "theaters" },
  { id: "2|3", tag: "upcoming" },
] as const;

const genresMovie = [
  { id: 28, tag: "action" },
  { id: 12, tag: "adventure" },
  { id: 16, tag: "animated" },
  { id: 35, tag: "comedy" },
  { id: 80, tag: "crime" },
  { id: 10751, tag: "family" },
  { id: 878, tag: "sciFi" },
  { id: 18, tag: "drama" },
  { id: 27, tag: "horror" },
  { id: 53, tag: "thriller" },
  { id: 10749, tag: "romance" },
  { id: 36, tag: "history" },
  { id: 9648, tag: "mystery" },
  { id: 10752, tag: "war" },
  { id: 37, tag: "western" },
  { id: 99, tag: "documentary" },
  { id: 10402, tag: "music" },
  { id: 14, tag: "fantasy" },
] as const;

const genresSeries = [
  { id: 10759, tag: "actionAndAdventure" }, // Action & Adventure
  { id: 16, tag: "animation" }, // Animation
  { id: 35, tag: "comedy" }, // Comedy
  { id: 80, tag: "crime" }, // Crime
  { id: 99, tag: "documentary" }, // Documentary
  { id: 18, tag: "drama" }, // Drama
  { id: 10751, tag: "family" }, // Family
  { id: 10762, tag: "kids" }, // Kids
  { id: 9648, tag: "mystery" }, // Mystery
  { id: 10763, tag: "news" }, // News
  { id: 10764, tag: "reality" }, // Reality
  { id: 10765, tag: "sciFiAndFantasy" }, // Sci-Fi & Fantasy
  { id: 10766, tag: "soap" }, // Soap
  { id: 10767, tag: "talk" }, // Talk
  { id: 10768, tag: "warAndPolitics" }, // War & Politics
  { id: 37, tag: "western" }, // Western
] as const;

const platforms = [
  { id: 8, tag: "netflix" },
  { id: 119, tag: "primeVideo" },
  { id: 384, tag: "max" },
  { id: 387, tag: "Peacock" },
  { id: 15, tag: "Hulu" },
  { id: 350, tag: "AppleTv" },
  { id: 337, tag: "DisneyPlus" },
  { id: 531, tag: "ParamountPlus" },
] as const;

const runtime = [
  { id: 1, tag: "LessThan1h" },
  { id: 2, tag: "OneToTwohours" },
  { id: 3, tag: "MoreThan2hr" },
] as const;

const displayNames: { [key: string]: string } = {
  warAndPolitics: "War And Politics",
  sciFiAndFantasy: "SciFi And Fantasy",
  actionAndAdventure: "Action And Adventure",
  LessThan1h: "less than 90 min",
  OneToTwohours: "90-120 min",
  MoreThan2hr: "more than 120 min",
  PG13: "PG-13",
  primeVideo: "Prime Video",
  DisneyPlus: "Disney+",
  ParamountPlus: "Paramount+",
};

type GenresFilter = (typeof genresMovie)[number]["tag"];
type SeriesGenresFilter = (typeof genresSeries)[number]["tag"];
type AvailabilityFilter = (typeof availability)[number]["tag"];
type PlatformFilter = (typeof platforms)[number]["tag"];
type RuntimeFilter = (typeof runtime)[number]["tag"];
type FilterName =
  | GenresFilter
  | SeriesGenresFilter
  | AvailabilityFilter
  | PlatformFilter
  //| RatingsFilter
  | RuntimeFilter;
type FilterCategory =
  | "availability"
  | "genresMovie"
  | "genresSeries"
  | "platforms"
  | "ratings"
  | "runtime";

interface Availability {
  id: string;
  tag: string;
}

interface FilterProp {
  filter: boolean;
  handleFilter: () => void;
  handleFilterParams: (
    newFilter: number[],
    newFilterPlatfrom: string[],
    //newAvailability: string[],
    newAvailability: Availability[],
    newRuntime: number[]
  ) => void;
  handleFilterClear: (newFilter: number[], newFilterPlatfrom: string[]) => void;
  typeQuery: string | null;
  typeContent: string | null;
  typeService: string[] | null;
  typeGenres: string[] | null;
  isDesktop: boolean;
  //listGenres: number[]
}

interface SelectedFilters {
  availability: Record<
    AvailabilityFilter,
    { id: string; selected: boolean; tag: string }
  >;
  //genres: Record<GenresFilter, boolean>;
  genresMovie: Record<
    GenresFilter,
    { id: number; selected: boolean; tag: string }
  >;
  genresSeries: Record<
    SeriesGenresFilter,
    { id: number; selected: boolean; tag: string }
  >;
  platforms: Record<
    PlatformFilter,
    { id: number; selected: boolean; tag: string }
  >;
  //ratings: Record<RatingsFilter, boolean>;
  runtime: Record<
    RuntimeFilter,
    { id: number; selected: boolean; tag: string }
  >;
}

function Filter({
  filter,
  handleFilter,
  handleFilterParams,
  handleFilterClear,
  typeQuery,
  typeContent,
  typeService,
  typeGenres,
  isDesktop,
}: FilterProp) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    availability: {
      streaming: { id: "4", selected: false, tag: "streaming" },
      theaters: { id: "2|3", selected: false, tag: "inTheaters" },
      upcoming: {
        id: "2|3",
        selected: false,
        tag: "upcoming",
      },
    },
    genresMovie: {
      action: { id: 28, selected: false, tag: "action" },
      adventure: { id: 12, selected: false, tag: "adventure" },
      animated: { id: 16, selected: false, tag: "animated" },
      comedy: { id: 35, selected: false, tag: "comedy" },
      crime: { id: 80, selected: false, tag: "crime" },
      family: { id: 10751, selected: false, tag: "family" },
      sciFi: { id: 878, selected: false, tag: "sciFi" },
      drama: { id: 18, selected: false, tag: "drama" },
      horror: { id: 27, selected: false, tag: "horror" },
      thriller: { id: 53, selected: false, tag: "thriller" },
      romance: { id: 10749, selected: false, tag: "romance" },
      history: { id: 36, selected: false, tag: "history" },
      mystery: { id: 9648, selected: false, tag: "mystery" },
      war: { id: 10752, selected: false, tag: "war" },
      western: { id: 37, selected: false, tag: "western" },
      documentary: { id: 99, selected: false, tag: "documentary" },
      music: { id: 10402, selected: false, tag: "music" },
      fantasy: { id: 14, selected: false, tag: "fantasy" },
    },

    genresSeries: {
      actionAndAdventure: {
        id: 10759,
        selected: false,
        tag: "actionAndAdventure",
      }, // Action & Adventure
      animation: { id: 16, selected: false, tag: "animation" }, // Animation
      comedy: { id: 35, selected: false, tag: "comedy" }, // Comedy
      crime: { id: 80, selected: false, tag: "crime" }, // Crime
      documentary: { id: 99, selected: false, tag: "documentary" }, // Documentary
      drama: { id: 18, selected: false, tag: "drama" }, // Drama
      family: { id: 10751, selected: false, tag: "family" }, // Family
      kids: { id: 10762, selected: false, tag: "kids" }, // Kids
      mystery: { id: 9648, selected: false, tag: "mystery" }, // Mystery
      news: { id: 10763, selected: false, tag: "news" }, // News
      reality: { id: 10764, selected: false, tag: "reality" }, // Reality
      sciFiAndFantasy: { id: 10765, selected: false, tag: "sciFiAndFantasy" }, // Sci-Fi & Fantasy
      soap: { id: 10766, selected: false, tag: "soap" }, // Soap
      talk: { id: 10767, selected: false, tag: "talk" }, // Talk
      warAndPolitics: { id: 10768, selected: false, tag: "warAndPolitics" }, // War & Politics
      western: { id: 37, selected: false, tag: "western" }, // Western
    },

    platforms: {
      netflix: { id: 8, selected: false, tag: "netflix" },
      primeVideo: { id: 119, selected: false, tag: "primeVideo" },
      max: { id: 384, selected: false, tag: "max" },
      Peacock: { id: 387, selected: false, tag: "Peacock" },
      Hulu: { id: 15, selected: false, tag: "Hulu" },
      AppleTv: { id: 350, selected: false, tag: "AppleTv" },
      DisneyPlus: { id: 337, selected: false, tag: "DisneyPlus" },
      ParamountPlus: { id: 531, selected: false, tag: "ParamountPlus" },
    },

    runtime: {
      LessThan1h: { id: 90, selected: false, tag: "LessThan1h" },
      OneToTwohours: { id: 120, selected: false, tag: "OneToTwohours" },
      MoreThan2hr: { id: 121, selected: false, tag: "MoreThan2hr" },
    },
  });

  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    if (filter) {
      const timeout = setTimeout(() => {
        setShowTags(true);
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      setShowTags(false);
    }
  }, [filter]);

  const [isApplyDisabled, setIsApplyDisabled] = useState(true);

  useEffect(() => {
    const isAnySelected = Object.values(selectedFilters).some((category) =>
      Object.values(category).some((item: any) => item.selected)
    );
    setIsApplyDisabled(!isAnySelected);
  }, [selectedFilters]);

  const handleClear = () => {
    setSelectedFilters({
      availability: {
        streaming: { id: "4", selected: false, tag: "action" },
        theaters: { id: "2|3", selected: false, tag: "inTheaters" },
        upcoming: { id: "2|3", selected: false, tag: "upcoming" },
      },
      genresMovie: {
        action: { id: 28, selected: false, tag: "action" },
        adventure: { id: 12, selected: false, tag: "adventure" },
        animated: { id: 16, selected: false, tag: "animated" },
        comedy: { id: 35, selected: false, tag: "comedy" },
        crime: { id: 80, selected: false, tag: "crime" },
        family: { id: 10751, selected: false, tag: "family" },
        sciFi: { id: 878, selected: false, tag: "sciFi" },
        drama: { id: 18, selected: false, tag: "drama" },
        horror: { id: 27, selected: false, tag: "horror" },
        thriller: { id: 53, selected: false, tag: "thriller" },
        romance: { id: 10749, selected: false, tag: "romance" },
        history: { id: 36, selected: false, tag: "history" },
        mystery: { id: 9648, selected: false, tag: "mystery" },
        war: { id: 10752, selected: false, tag: "war" },
        western: { id: 37, selected: false, tag: "western" },
        documentary: { id: 99, selected: false, tag: "documentary" },
        music: { id: 10402, selected: false, tag: "music" },
        fantasy: { id: 14, selected: false, tag: "fantasy" },
      },

      genresSeries: {
        actionAndAdventure: {
          id: 10759,
          selected: false,
          tag: "actionAndAdventure",
        }, // Action & Adventure
        animation: { id: 16, selected: false, tag: "animation" }, // Animation
        comedy: { id: 35, selected: false, tag: "comedy" }, // Comedy
        crime: { id: 80, selected: false, tag: "crime" }, // Crime
        documentary: { id: 99, selected: false, tag: "documentary" }, // Documentary
        drama: { id: 18, selected: false, tag: "drama" }, // Drama
        family: { id: 10751, selected: false, tag: "family" }, // Family
        kids: { id: 10762, selected: false, tag: "kids" }, // Kids
        mystery: { id: 9648, selected: false, tag: "mystery" }, // Mystery
        news: { id: 10763, selected: false, tag: "news" }, // News
        reality: { id: 10764, selected: false, tag: "reality" }, // Reality
        sciFiAndFantasy: { id: 10765, selected: false, tag: "sciFiAndFantasy" }, // Sci-Fi & Fantasy
        soap: { id: 10766, selected: false, tag: "soap" }, // Soap
        talk: { id: 10767, selected: false, tag: "talk" }, // Talk
        warAndPolitics: { id: 10768, selected: false, tag: "warAndPolitics" }, // War & Politics
        western: { id: 37, selected: false, tag: "western" }, // Western
      },

      platforms: {
        netflix: { id: 8, selected: false, tag: "netflix" },
        primeVideo: { id: 119, selected: false, tag: "primeVideo" },
        max: { id: 384, selected: false, tag: "max" },
        Peacock: { id: 387, selected: false, tag: "Peacock" },
        Hulu: { id: 15, selected: false, tag: "Hulu" },
        AppleTv: { id: 350, selected: false, tag: "AppleTv" },
        DisneyPlus: { id: 337, selected: false, tag: "DisneyPlus" },
        ParamountPlus: { id: 531, selected: false, tag: "ParamountPlus" },
        //Fandango: { id: 279, selected: false, tag: "Fandango" },
      },
      runtime: {
        LessThan1h: { id: 1, selected: false, tag: "LessThan1h" },
        OneToTwohours: { id: 2, selected: false, tag: "OneToTwohours" },
        MoreThan2hr: { id: 3, selected: false, tag: "MoreThan2hr" },
      },
    });
  };

  useEffect(() => {
    if (typeContent === "upcoming") {
      setSelectedFilters((prevState) => ({
        ...prevState,
        availability: {
          ...prevState.availability,
          upcoming: {
            ...prevState.availability.upcoming,
            selected: true,
          },
        },
      }));
    }

    if (typeContent === "nowPlaying") {
      setSelectedFilters((prevState) => ({
        ...prevState,
        availability: {
          ...prevState.availability,
          theaters: {
            ...prevState.availability.theaters,
            selected: true,
          },
        },
      }));
    }

    if (typeService) {
      typeService.forEach((item) => {
        const platformMatch = Object.values(selectedFilters.platforms).find(
          (platform) => platform.id === Number(item)
        );

        if (platformMatch) {
          const platformTag =
            platformMatch.tag as keyof typeof selectedFilters.platforms;

          setSelectedFilters((prevState) => {
            return {
              ...prevState,
              platforms: {
                ...prevState.platforms,
                [platformTag]: {
                  ...prevState.platforms[platformTag],
                  selected: true, // Toggle the selection
                },
              },
            };
          });
        }
      });
    }

    if (typeGenres) {
      typeGenres.forEach((item) => {
        const genresMatch = Object.values(selectedFilters.genresMovie).find(
          (genre) => genre.id === Number(item)
        );

        if (genresMatch) {
          const genreTag =
            genresMatch.tag as keyof typeof selectedFilters.genresMovie;

          setSelectedFilters((prevState) => {
            return {
              ...prevState,
              genresMovie: {
                ...prevState.genresMovie,
                [genreTag]: {
                  ...prevState.genresMovie[genreTag],
                  selected: true, // Toggle the selection
                },
              },
            };
          });
        }
      });
    }
  }, []);

  const handleClick = () => {
    handleClear();
    handleFilterClear([], []);
  };

  const handleFilterClickFrontEnd = () => {
    handleClickParams();
    handleFilter();
  };

  const handleClickParams = () => {
    let selectedGenreIds;

    if (typeQuery !== "series") {
      selectedGenreIds = Object.entries(selectedFilters.genresMovie)
        .filter(([_, value]) => value.selected)
        .map(([_, value]) => value.id);
    } else {
      selectedGenreIds = Object.entries(selectedFilters.genresSeries)
        .filter(([_, value]) => value.selected)
        .map(([_, value]) => value.id);
    }

    const selectedPlatformIds = Object.entries(selectedFilters.platforms)
      .filter(([_, value]) => value.selected)
      .map(([_, value]) => String(value.id));

    const selectedAvailabilityIds = Object.entries(selectedFilters.availability)
      .filter(([_, value]) => value.selected)
      .map(([_, value]) => ({ id: value.id, tag: value.tag }));

    const selectedRuntimeIds = Object.entries(selectedFilters.runtime)
      .filter(([_, value]) => value.selected)
      .map(([_, value]) => value.id);

    handleFilterParams(
      selectedGenreIds,
      selectedPlatformIds,
      selectedAvailabilityIds,
      selectedRuntimeIds
    );
  };

  const handleFilterClick = (
    category: FilterCategory,
    filterName: FilterName
  ) => {
    setSelectedFilters((prevState: any) => {
      if (category === "availability" && filterName in prevState.availability) {
        return {
          ...prevState,
          availability: {
            ...prevState.availability,
            [filterName]: {
              ...prevState.availability[filterName as AvailabilityFilter],
              selected:
                !prevState.availability[filterName as AvailabilityFilter]
                  .selected,
            },
          },
        };
      } else if (
        category === "genresMovie" &&
        filterName in prevState.genresMovie
      ) {
        return {
          ...prevState,
          genresMovie: {
            ...prevState.genresMovie,
            [filterName]: {
              ...prevState.genresMovie[filterName as GenresFilter],
              selected:
                !prevState.genresMovie[filterName as GenresFilter].selected,
            },
          },
        };
      } else if (
        category === "genresSeries" &&
        filterName in prevState.genresSeries
      ) {
        return {
          ...prevState,
          genresSeries: {
            ...prevState.genresSeries,
            [filterName]: {
              ...prevState.genresSeries[filterName as GenresFilter],
              selected:
                !prevState.genresSeries[filterName as GenresFilter].selected,
            },
          },
        };
      } else if (
        category === "platforms" &&
        filterName in prevState.platforms
      ) {
        return {
          ...prevState,
          platforms: {
            ...prevState.platforms,
            [filterName]: {
              ...prevState.platforms[filterName as PlatformFilter],
              selected:
                !prevState.platforms[filterName as PlatformFilter].selected,
            },
          },
        };
      } else if (category === "runtime" && filterName in prevState.runtime) {
        const resetRuntime = Object.keys(prevState.runtime).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...prevState.runtime[key as RuntimeFilter],
              selected: false,
            },
          }),
          {}
        );

        return {
          ...prevState,
          runtime: {
            ...resetRuntime,
            [filterName]: {
              ...prevState.runtime[filterName as RuntimeFilter],
              selected:
                !prevState.runtime[filterName as RuntimeFilter].selected,
            },
          },
        };
      }
      return prevState;
    });
  };

  return (
    <div
      className={`flex md:justify-end md:mr-[0.5vw] p-[0.7vw] transition-all duration-700 ease-in-out md:-mt-[1.5vh] -mt-[1.5vh] ${
        filter
          ? "md:w-[17vw] md:h-full md:bg-customServicesColor md:rounded-[2vh] md:ml-[1vw]"
          : "md:ml-[2.5vw] md:w-[2vw] "
      }`}
    >
      <div className="w-full">
        <div className="flex md:justify-end">
          <Button
            onClick={handleFilter}
            disabled={typeContent === "trendingMovies" || typeQuery === "all"}
            className={`mr-[-14vw] ml-[3vw] md:ml-[0vw] md:mr-[0vw] bg-customServicesColor md:rounded-[0.4vw] rounded-lg hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 w-[12vw] h-[6vh] md:w-[2.5vw] md:h-[2.5vw] z-50 ${
              filter ? "bg-white/90" : ""
            }`}
          >
            <FaFilter
              className={`md:w-[1.4vw] md:h-[1.4vw] w-[6vw] h-[6vw] min-w-[17px] min-h-[17px] ${
                filter ? "text-black" : ""
              }`}
            />
          </Button>
        </div>

        {filter && isDesktop ? (
          <div
            className={` w-full mt-[2vh] transition-opacity duration-700 ${
              showTags ? "opacity-100" : "opacity-0"
            }`}
          >
            {typeQuery !== "series" && (
              <div>
                <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw]">
                  Availability
                </div>
                <div>
                  {availability.map((item, index) => (
                    <Button
                      key={`${item.id}-${item.tag}`}
                      onClick={() =>
                        handleFilterClick("availability", item.tag)
                      }
                      className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                        selectedFilters.availability[item.tag]?.selected
                          ? "bg-white/90 text-black"
                          : ""
                      }`}
                    >
                      {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
              </div>
            )}
            {typeQuery !== "series" ? (
              <div>
                <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
                  Genres
                </div>
                <div>
                  {genresMovie.map((item) => (
                    <Button
                      key={`${item.id}-${item.tag}`}
                      onClick={() => handleFilterClick("genresMovie", item.tag)}
                      className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                        selectedFilters.genresMovie[item.tag]?.selected
                          ? "bg-white/90 text-black"
                          : ""
                      }`}
                    >
                      {displayNames[item.tag] ||
                        item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
              </div>
            ) : (
              <div>
                <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
                  Genres
                </div>
                <div>
                  {genresSeries.map((item) => (
                    <Button
                      key={`${item.id}-${item.tag}`}
                      onClick={() =>
                        handleFilterClick("genresSeries", item.tag)
                      }
                      className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                        selectedFilters.genresSeries[item.tag]?.selected
                          ? "bg-white/90 text-black"
                          : ""
                      }`}
                    >
                      {displayNames[item.tag] ||
                        item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
              </div>
            )}
            <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
              Platforms
            </div>
            <div>
              {platforms.map((item) => (
                <Button
                  key={`${item.id}-${item.tag}`}
                  onClick={() => handleFilterClick("platforms", item.tag)}
                  className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    selectedFilters.platforms[item.tag]?.selected
                      ? "bg-white/90 text-black"
                      : ""
                  }`}
                >
                  {displayNames[item.tag] ||
                    item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                </Button>
              ))}
            </div>
            {typeQuery !== "series" && (
              <div>
                <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
                <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
                  Runtime
                </div>
                <div>
                  {runtime.map((item) => (
                    <Button
                      key={`${item.id}-${item.tag}`}
                      onClick={() => handleFilterClick("runtime", item.tag)}
                      className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                        selectedFilters.runtime[item.tag]?.selected
                          ? "bg-white/90 text-black"
                          : ""
                      }`}
                    >
                      {displayNames[item.tag] ||
                        item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-[3vh]">
              <Button
                onClick={handleClick}
                disabled={isApplyDisabled}
                className="bg-transparent rounded-full p-[1.5vw] text-[1vw] m-[0.2vw] hover:bg-transparent"
              >
                Clear
              </Button>
              <Button
                onClick={handleClickParams}
                disabled={isApplyDisabled}
                className={`bg-customColorCard hover:bg-white/90 hover:text-black rounded-full p-[1.5vw] text-[1vw] m-[0.2vw]`}
              >
                Apply
              </Button>
            </div>
          </div>
        ) : filter && !isDesktop ? (
          <div
            className={`fixed top-0 left-0 bg-customColor w-full overflow-y-auto h-screen  pb-[12vh] pt-[5vh] z-[100] ${
              showTags ? "opacity-100 " : "opacity-0"
            }`}
          >
            <div>
              <button
                className="text-white mb-[4vw] ml-[2vw]"
                onClick={handleFilter}
                aria-label="Toggle menu"
              >
                {filter ? <IoCloseOutline size={30} /> : <></>}
              </button>
            </div>
            <div className="mx-[2vw]">
              {typeQuery !== "series" && (
                <div>
                  <div className="flex justify-start md:text-[1.2vw] text-[5vw] mb-[1vh] ml-[0.5vw]">
                    Availability
                  </div>
                  <div>
                    {availability.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() =>
                          handleFilterClick("availability", item.tag)
                        }
                        className={`bg-customColorCard rounded-full md:p-[1.1vw] p-[5vw] md:text-[0.8vw] text-[4vw] md:m-[0.2vw] m-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                          selectedFilters.availability[item.tag]?.selected
                            ? "bg-white/90 text-black"
                            : ""
                        }`}
                      >
                        {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
                </div>
              )}
              {typeQuery !== "series" ? (
                <div>
                  <div className="flex justify-start md:text-[1.2vw] text-[5vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
                    Genres
                  </div>
                  <div>
                    {genresMovie.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() =>
                          handleFilterClick("genresMovie", item.tag)
                        }
                        className={`bg-customColorCard rounded-full md:p-[1.1vw] p-[5vw] md:text-[0.8vw] text-[4vw] md:m-[0.2vw] m-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                          selectedFilters.genresMovie[item.tag]?.selected
                            ? "bg-white/90 text-black"
                            : ""
                        }`}
                      >
                        {displayNames[item.tag] ||
                          item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-start md:text-[1.2vw] text-[5vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
                    Genres
                  </div>
                  <div>
                    {genresSeries.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() =>
                          handleFilterClick("genresSeries", item.tag)
                        }
                        className={`bg-customColorCard rounded-full md:p-[1.1vw] p-[5vw] md:text-[0.8vw] text-[4vw] md:m-[0.2vw] m-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                          selectedFilters.genresSeries[item.tag]?.selected
                            ? "bg-white/90 text-black"
                            : ""
                        }`}
                      >
                        {displayNames[item.tag] ||
                          item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
                </div>
              )}
              <div className="flex justify-start md:text-[1.2vw] text-[5vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
                Platforms
              </div>
              <div>
                {platforms.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleFilterClick("platforms", item.tag)}
                    className={`bg-customColorCard rounded-full md:p-[1.1vw] p-[5vw] md:text-[0.8vw] text-[4vw] md:m-[0.2vw] m-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                      selectedFilters.platforms[item.tag]?.selected
                        ? "bg-white/90 text-black"
                        : ""
                    }`}
                  >
                    {displayNames[item.tag] ||
                      item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                  </Button>
                ))}
              </div>
              {typeQuery !== "series" && (
                <div>
                  <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
                  <div className="flex justify-start md:text-[1.2vw] text-[5vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
                    Runtime
                  </div>
                  <div>
                    {runtime.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => handleFilterClick("runtime", item.tag)}
                        className={`bg-customColorCard rounded-full md:p-[1.1vw] p-[5vw] md:text-[0.8vw] text-[4vw] md:m-[0.2vw] m-[1vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                          selectedFilters.runtime[item.tag]?.selected
                            ? "bg-white/90 text-black"
                            : ""
                        }`}
                      >
                        {displayNames[item.tag] ||
                          item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex md:justify-between md:mt-[3vh] mt-[6vh]">
                <Button
                  onClick={handleClick}
                  disabled={isApplyDisabled}
                  className="bg-transparent rounded-full md:p-[1.5vw] p-[7vw] md:text-[1vw] text-[5vw] m-[0.2vw] hover:bg-transparent"
                >
                  Clear
                </Button>
                <Button
                  onClick={handleFilterClickFrontEnd}
                  disabled={isApplyDisabled}
                  className={`bg-customColorCard hover:bg-white/90 hover:text-black rounded-full md:p-[1.5vw] p-[7vw] md:text-[1vw] text-[5vw] m-[0.2vw]`}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Filter;
