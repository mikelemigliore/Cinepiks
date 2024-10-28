import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Sort() {
  return (
    <div className="w-[15vw] h-[6vh] bg-customServicesColor rounded-[0.4vw] flex justify-center items-center z-40 pr-[0.5vw]">
      <Select defaultValue="releaseDate">
        <SelectTrigger className="w-[15vw] border-none focus:ring-0 focus:border-transparent text-[1vw] rounded-[0.4vw] pl-[3vh]">
          <span>
            Sort By : <SelectValue placeholder="Release Date" />
          </span>
        </SelectTrigger>
        <SelectContent className="bg-customServicesColor border-none text-[1vw] text-white mt-[1.5vh] rounded-[0.4vw] p-[0.5vh] hover:cursor-pointer">
          <SelectItem
            value="releaseDate"
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Release Date
          </SelectItem>
          <SelectItem
            value="popularity"
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Popularity
          </SelectItem>
          <SelectItem
            value="rating"
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Rating
          </SelectItem>
          <SelectItem
            value="a-z"
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            A - Z
          </SelectItem>
          <SelectItem
            value="z-a"
            className="text-[1vw] rounded-full pl-[1vw] hover:cursor-pointer"
          >
            Z - A
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Sort;