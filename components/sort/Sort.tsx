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
  //handleSortBy: () => void;
}

function Sort({ handleSortBy, type }: SortProp) {
  return (
    <div className="w-[15vw] h-[6vh] bg-customServicesColor rounded-[0.4vw] flex justify-center items-center z-40 pr-[0.5vw]">
      <Select
        onValueChange={(value: string) => handleSortBy(value)}
        defaultValue="popularity.desc"
      >
        <SelectTrigger className="w-[15vw] border-none focus:ring-0 focus:border-transparent text-[1vw] rounded-[0.4vw] pl-[3vh]">
          <span>
            Sort By : <SelectValue placeholder="Popularity" />
          </span>
        </SelectTrigger>
        <SelectContent className="bg-customServicesColor border-none text-[1vw] text-white mt-[1.5vh] rounded-[0.4vw] p-[0.5vh] hover:cursor-pointer">
          <SelectItem
            value={
              type === "series"
                ? "first_air_date.desc"
                : "primary_release_date.desc"
            }
            //onValueChange={handleSortBy}
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Release Date
          </SelectItem>
          <SelectItem
            value="popularity.desc"
            //onClick={handleSortBy}
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Popularity
          </SelectItem>
          <SelectItem
            value="vote_average.desc"
            //onClick={handleSortBy}
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Rating
          </SelectItem>
          <SelectItem
            value={type === "series" ? "name.desc" : "title.desc"}
            //onClick={handleSortBy}
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
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
