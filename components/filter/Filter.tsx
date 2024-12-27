import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FaFilter } from "react-icons/fa";

// Define genres and availability arrays with `as const`
const availability = [
  { id: 1, tag: "streaming" },
  { id: 2, tag: "theaters" },
  { id: 3, tag: "comingSoon" },
] as const;

const genres = [
  { id: 28, tag: "action" },
  { id: 12, tag: "adventure" },
  { id: 16, tag: "animated" },
  { id: 35, tag: "comedy" },
  { id: 80, tag: "crime" },
  { id: 10751, tag: "family" },
  { id: 878, tag: "sciFi" }, // Science Fiction
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

const platforms = [
  { id: 8, tag: "netflix" },
  { id: 119, tag: "primeVideo" },
  { id: 384, tag: "max" },
  { id: 387, tag: "Peacock" },
  { id: 15, tag: "Hulu" },
  { id: 350, tag: "AppleTv" },
  { id: 337, tag: "DisneyPlus" },
  { id: 531, tag: "ParamountPlus" },
  { id: 279, tag: "Fandango" },
] as const;

const ratings = [
  { id: 1, tag: "G" },
  { id: 2, tag: "PG" },
  { id: 3, tag: "R" },
  { id: 4, tag: "PG13" },
] as const;

const runtime = [
  { id: 1, tag: "LessThan1h" },
  { id: 2, tag: "OneToTwohours" },
  { id: 3, tag: "MoreThan2hr" },
] as const;

// Display name mapping
const displayNames: { [key: string]: string } = {
  LessThan1h: "Less Than 1 Hour",
  OneToTwohours: "1-2 Hours",
  MoreThan2hr: "More Than 2 Hours",
  PG13: "PG-13",
  primeVideo: "Prime Video",
  DisneyPlus: "Disney+",
  ParamountPlus: "Paramount+",
  //awarded: "Award Winners",
};

// Dynamically infer types from arrays
type GenresFilter = (typeof genres)[number]["tag"];
type AvailabilityFilter = (typeof availability)[number]["tag"];
type PlatformFilter = (typeof platforms)[number]["tag"];
type RatingsFilter = (typeof ratings)[number]["tag"];
type RuntimeFilter = (typeof runtime)[number]["tag"];
type FilterName =
  | GenresFilter
  | AvailabilityFilter
  | PlatformFilter
  | RatingsFilter
  | RuntimeFilter;
type FilterCategory =
  | "availability"
  | "genres"
  | "platforms"
  | "ratings"
  | "runtime";

interface FilterProp {
  filter: boolean;
  handleFilter: () => void;
  handleFilterParams: (
    newFilter: number[],
    newFilterPlatfrom: number[]
  ) => void;
  handleFilterClear: (newFilter: number[], newFilterPlatfrom: number[]) => void;
  //listGenres: number[]
}

interface SelectedFilters {
  availability: Record<AvailabilityFilter, boolean>;
  //genres: Record<GenresFilter, boolean>;
  genres: Record<GenresFilter, { id: number; selected: boolean; tag: string }>;
  platforms: Record<
    PlatformFilter,
    { id: number; selected: boolean; tag: string }
  >;
  ratings: Record<RatingsFilter, boolean>;
  runtime: Record<RuntimeFilter, boolean>;
}
//Next objective is to also add the states of the filter buttons in redux so that they don't disapper when going from single page back to grid view.
function Filter({
  filter,
  handleFilter,
  handleFilterParams,
  handleFilterClear,
}: FilterProp) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    availability: { streaming: false, theaters: false, comingSoon: false },
    genres: {
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

    platforms: {
      netflix: { id: 8, selected: false, tag: "netflix" },
      primeVideo: { id: 119, selected: false, tag: "primeVideo" },
      max: { id: 384, selected: false, tag: "max" },
      Peacock: { id: 387, selected: false, tag: "Peacock" },
      Hulu: { id: 15, selected: false, tag: "Hulu" },
      AppleTv: { id: 350, selected: false, tag: "AppleTv" },
      DisneyPlus: { id: 337, selected: false, tag: "DisneyPlus" },
      ParamountPlus: { id: 531, selected: false, tag: "ParamountPlus" },
      Fandango: { id: 279, selected: false, tag: "Fandango" },
    },

    ratings: {
      G: false,
      PG: false,
      R: false,
      PG13: false,
    },

    runtime: {
      LessThan1h: false,
      OneToTwohours: false,
      MoreThan2hr: false,
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

  const handleClear = () => {
    setSelectedFilters({
      availability: { streaming: false, theaters: false, comingSoon: false },
      genres: {
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
      platforms: {
        netflix: { id: 8, selected: false, tag: "netflix" },
        primeVideo: { id: 119, selected: false, tag: "primeVideo" },
        max: { id: 384, selected: false, tag: "max" },
        Peacock: { id: 387, selected: false, tag: "Peacock" },
        Hulu: { id: 15, selected: false, tag: "Hulu" },
        AppleTv: { id: 350, selected: false, tag: "AppleTv" },
        DisneyPlus: { id: 337, selected: false, tag: "DisneyPlus" },
        ParamountPlus: { id: 531, selected: false, tag: "ParamountPlus" },
        Fandango: { id: 279, selected: false, tag: "Fandango" },
      },
      ratings: {
        G: false,
        PG: false,
        R: false,
        PG13: false,
      },
      runtime: {
        LessThan1h: false,
        OneToTwohours: false,
        MoreThan2hr: false,
      },
    });
  };

  const handleClick = () => {
    handleClear();
    handleFilterClear([], []);
  };

  const handleClickParams = async () => {
    const selectedGenreIds = Object.entries(selectedFilters.genres)
      .filter(([_, value]) => value.selected) // Filter only selected genres
      .map(([_, value]) => value.id); // Map to their IDs

    const selectedPlatformIds = Object.entries(selectedFilters.platforms)
      .filter(([_, value]) => value.selected) // Filter only selected genres
      .map(([_, value]) => value.id); // Map to their IDs

    console.log("Selected Genre IDs:", selectedGenreIds);
    console.log("Selected Platforms Ids:", selectedPlatformIds);

    // Pass the selectedGenreIds to handleFilterParams
    handleFilterParams(selectedGenreIds, selectedPlatformIds);
  };

  // Type guard for narrowing down category-specific filter names
  const handleFilterClick = (
    category: FilterCategory,
    filterName: FilterName
  ) => {
    setSelectedFilters((prevState) => {
      //We pass a function to setSelectedFilters to access the current state (prevState)
      if (category === "availability" && filterName in prevState.availability) {
        //Ensures that filterName is a valid key in prevState.availability (e.g., "streaming", "theaters").
        return {
          ...prevState,
          availability: {
            //By not wrapping availability in square brackets, JavaScript interprets it as a fixed key.
            ...prevState.availability, //Creates a copy of prevState.availability so only the specific filterName is modified.
            //Toggles the current value (if true, it becomes false, and vice versa)
            [filterName]:
              !prevState.availability[filterName as AvailabilityFilter], //By wrapping filterName in square brackets, JavaScript interprets it as a variable instead of a fixed key.
          },
        };
      } else if (category === "genres" && filterName in prevState.genres) {
        return {
          ...prevState,
          genres: {
            ...prevState.genres,
            [filterName]: {
              ...prevState.genres[filterName as GenresFilter],
              selected: !prevState.genres[filterName as GenresFilter].selected,
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
              selected: !prevState.platforms[filterName as PlatformFilter].selected,
            },
          },
        };
      } else if (category === "ratings" && filterName in prevState.ratings) {
        return {
          ...prevState,
          ratings: {
            ...prevState.ratings,
            [filterName]: !prevState.ratings[filterName as RatingsFilter],
          },
        };
      } else if (category === "runtime" && filterName in prevState.runtime) {
        return {
          ...prevState,
          runtime: {
            ...prevState.runtime,
            [filterName]: !prevState.runtime[filterName as RuntimeFilter],
          },
        };
      }
      return prevState;
    });
  };

  return (
    <div
      className={`flex justify-end mr-[0.5vw] p-[0.7vw] transition-all duration-700 ease-in-out -mt-[2vh] ${
        filter
          ? "w-[17vw] h-full bg-customServicesColor rounded-[2vh] ml-[1vw]"
          : "ml-[2.5vw] w-[2vw] "
      }`}
    >
      <div className="w-full">
        <div className="flex justify-end">
          <Button
            onClick={handleFilter}
            className={`bg-customServicesColor rounded-[0.4vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 w-[2.5vw] h-[2.5vw] ${
              filter ? "bg-white/90" : ""
            }`}
          >
            <FaFilter
              className={`w-[1.4vw] h-[1.4vw] min-w-[17px] min-h-[17px] ${
                filter ? "text-black" : ""
              }`}
            />
          </Button>
        </div>

        {filter && (
          <div
            className={`w-full mt-[2vh] transition-opacity duration-700 ${
              showTags ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw]">
              Availability
            </div>
            <div>
              {availability.map((item) => (
                <Button
                  key={item.id} //Each <Button> needs a unique key prop when mapping to help React manage its updates efficiently. Here, tag is used as the unique identifier
                  onClick={() => handleFilterClick("availability", item.tag)}
                  className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    selectedFilters.availability[item.tag]
                      ? "bg-white/90 text-black"
                      : ""
                  }`}
                >
                  {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                </Button>
              ))}
            </div>
            <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
            <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
              Genres
            </div>
            <div>
              {genres.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleFilterClick("genres", item.tag)}
                  className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    selectedFilters.genres[item.tag]?.selected
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
            <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
              Platforms
            </div>
            <div>
              {platforms.map((item) => (
                <Button
                  key={item.id}
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
            <div className="w-full p-[0.1vh] mt-[2vh] bg-white/20"></div>
            <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
              Ratings
            </div>
            <div>
              {ratings.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleFilterClick("ratings", item.tag)}
                  className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    selectedFilters.ratings[item.tag]
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
            <div className="flex justify-start text-[1.2vw] mb-[1vh] ml-[0.5vw] mt-[2vh]">
              Runtime
            </div>
            <div>
              {runtime.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleFilterClick("runtime", item.tag)}
                  className={`bg-customColorCard rounded-full p-[1.1vw] text-[0.8vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                    selectedFilters.runtime[item.tag]
                      ? "bg-white/90 text-black"
                      : ""
                  }`}
                >
                  {displayNames[item.tag] ||
                    item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-[3vh]">
              <Button
                onClick={handleClick}
                className="bg-transparent rounded-full p-[1.5vw] text-[1vw] m-[0.2vw] hover:bg-transparent"
              >
                Clear
              </Button>
              <Button
                onClick={handleClickParams}
                className="bg-customColorCard rounded-full p-[1.5vw] text-[1vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95"
              >
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
