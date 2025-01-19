import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// popularity: "popularity.desc",
// releaseDate: "primary_release_date.desc",
// rating: "vote_average.desc",
// alphabetical: "title.desc",

interface SortProp {
  handleSortBy: (newSort: string) => void;
  type: string;
  typeContent: string | null;
  typeQuery: string | null;
  //handleSortBy: () => void;
}

function Sort({ handleSortBy, type, typeContent,typeQuery }: SortProp) {
  return (
    <div className="md:mt-[0vh] mt-[8vh] md:w-[15vw] md:h-[6vh] w-[55vw] h-[6vh] bg-customServicesColor md:rounded-[0.4vw] rounded-lg flex justify-center items-center z-[50] pr-[2vw] md:pr-[0.5vw]">
      <Select
        disabled={typeContent === "trendingMovies" || typeQuery === "all"}
        onValueChange={(value: string) => handleSortBy(value)}
        defaultValue="popularity.desc"
      >
        <SelectTrigger className="md:w-[15vw] border-none focus:ring-0 focus:border-transparent md:text-[1vw] text-[4vw] rounded-[0.4vw] pl-[3vh]">
          <span>
            Sort By : <SelectValue placeholder="Popularity" />
          </span>
        </SelectTrigger>
        <SelectContent className="bg-customServicesColor border-none md:text-[1vw] text-[4vw] text-white mt-[1.5vh] md:rounded-[0.4vw] rounded-lg p-[0.5vh] hover:cursor-pointer">
          <SelectItem
            value={
              type === "series"
                ? "first_air_date.desc"
                : "primary_release_date.desc"
            }
            //onValueChange={handleSortBy}
            className="md:text-[1vw] text-[4vw] rounded-full md:pl-[1vw] pl-[4vw] hover:cursor-pointer"
          >
            Release Date
          </SelectItem>
          <SelectItem
            value="popularity.desc"
            //onClick={handleSortBy}
            className="md:text-[1vw] text-[4vw] rounded-full md:pl-[1vw] pl-[4vw] hover:cursor-pointer"
          >
            Popularity
          </SelectItem>
          <SelectItem
            value="vote_average.desc"
            //onClick={handleSortBy}
            className="md:text-[1vw] text-[4vw] rounded-full md:pl-[1vw] pl-[4vw] hover:cursor-pointer"
          >
            Rating
          </SelectItem>
          <SelectItem
            value={type === "series" ? "name.desc" : "title.desc"}
            //onClick={handleSortBy}
            className="md:text-[1vw] text-[4vw] rounded-full md:pl-[1vw] pl-[4vw] hover:cursor-pointer"
          >
            Alphabetical
          </SelectItem>
          {/* <SelectItem
            value="z-a"
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Z - A
          </SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Sort;
