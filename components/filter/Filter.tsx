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
  { id: 1, tag: "action" },
  { id: 2, tag: "adventure" },
  { id: 3, tag: "animated" },
  { id: 4, tag: "awarded" },
  { id: 5, tag: "comedy" },
  { id: 6, tag: "crime" },
  { id: 7, tag: "family" },
  { id: 8, tag: "sciFi" },
  { id: 9, tag: "drama" },
  { id: 10, tag: "horror" },
  { id: 11, tag: "thriller" },
  { id: 12, tag: "romance" },
  { id: 13, tag: "history" },
  { id: 14, tag: "mystery" },
  { id: 15, tag: "war" },
  { id: 16, tag: "western" },
  { id: 17, tag: "documentary" },
  { id: 18, tag: "music" },
  { id: 19, tag: "sport" },
] as const;

const platforms = [
  { id: 1, tag: "netflix" },
  { id: 2, tag: "primeVideo" },
  { id: 3, tag: "max" },
  { id: 4, tag: "Peacock" },
  { id: 5, tag: "Hulu" },
  { id: 6, tag: "AppleTv" },
  { id: 7, tag: "DisneyPlus" },
  { id: 8, tag: "ParamountPlus" },
  { id: 9, tag: "Fandango" },
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
  awarded: "Award Winners",
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
}

interface SelectedFilters {
  availability: Record<AvailabilityFilter, boolean>;
  genres: Record<GenresFilter, boolean>;
  platforms: Record<PlatformFilter, boolean>;
  ratings: Record<RatingsFilter, boolean>;
  runtime: Record<RuntimeFilter, boolean>;
}

function Filter({ filter, handleFilter }: FilterProp) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    availability: { streaming: false, theaters: false, comingSoon: false },
    genres: {
      action: false,
      adventure: false,
      animated: false,
      awarded: false,
      comedy: false,
      crime: false,
      family: false,
      sciFi: false,
      drama: false,
      horror: false,
      thriller: false,
      romance: false,
      history: false,
      mystery: false,
      war: false,
      western: false,
      documentary: false,
      music: false,
      sport: false,
    },

    platforms: {
      netflix: false,
      primeVideo: false,
      max: false,
      Peacock: false,
      Hulu: false,
      AppleTv: false,
      DisneyPlus: false,
      ParamountPlus: false,
      Fandango: false,
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
        action: false,
        adventure: false,
        animated: false,
        awarded: false,
        comedy: false,
        crime: false,
        family: false,
        sciFi: false,
        drama: false,
        horror: false,
        thriller: false,
        romance: false,
        history: false,
        mystery: false,
        war: false,
        western: false,
        documentary: false,
        music: false,
        sport: false,
      },
      platforms: {
        netflix: false,
        primeVideo: false,
        max: false,
        Peacock: false,
        Hulu: false,
        AppleTv: false,
        DisneyPlus: false,
        ParamountPlus: false,
        Fandango: false,
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
            [filterName]: !prevState.genres[filterName as GenresFilter],
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
            [filterName]: !prevState.platforms[filterName as PlatformFilter],
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
      filter ? "w-[17vw] h-full bg-customServicesColor rounded-[2vh] ml-[1vw]" : "ml-[2.5vw] w-[2vw] "
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
                      ? "bg-white/90 text-black font-semibold"
                      : ""
                  }`}
                >
                  {/* you get a new string where the first letter is capitalized, and the rest of the string remains the same */}
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
                    selectedFilters.genres[item.tag]
                      ? "bg-white/90 text-black font-semibold"
                      : ""
                  }`}
                >
                  {displayNames[item.tag] || item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
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
                    selectedFilters.platforms[item.tag]
                      ? "bg-white/90 text-black font-semibold"
                      : ""
                  }`}
                >
                  {displayNames[item.tag] || item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
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
                      ? "bg-white/90 text-black font-semibold"
                      : ""
                  }`}
                >
                  {displayNames[item.tag] || item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
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
                      ? "bg-white/90 text-black font-semibold"
                      : ""
                  }`}
                >
                  {displayNames[item.tag] || item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                </Button>
              ))}
            </div>
            <div className='flex justify-between mt-[3vh]'>
              <Button onClick={handleClear} className="bg-transparent rounded-full p-[1.5vw] text-[1vw] m-[0.2vw] hover:bg-transparent">Clear</Button>
              <Button className="bg-customColorCard rounded-full p-[1.5vw] text-[1vw] m-[0.2vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95" >Apply</Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
