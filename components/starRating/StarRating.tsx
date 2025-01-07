import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdModeEditOutline } from "react-icons/md";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import handleScoreBtn from "@/utils/handleScoreBtn";
import { useDispatch } from "react-redux";

interface StarRatingProp {
  title?: string;
  name?: string;
  value: number | null;
  handleValue: (newValue: number) => void;
  id: number;
  mediaType: string;
}

const labels: { [index: string]: string } = {
  0: "No Score",
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function StarRating({
  title,
  value,
  handleValue,
  id,
  mediaType,
}: StarRatingProp) {
  const [hover, setHover] = React.useState(-1);

  const media_type = mediaType === "movie" ? "movie" : "tv";

  const dispatch = useDispatch();

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const handleScore = (value:number) => {
    if (value !== null) {
      handleScoreBtn(dispatch, value, id, media_type);
    } else {
      handleScoreBtn(dispatch, value, id, media_type);
    }
  };



  return (
    <div>
      <Dialog>
        <DialogTrigger className="ml-[1vw] mt-[-0.5vw] flex justify-center items-center px-[0vw] py-[0.5vw] rounded-full text-sm md:text-[0.9vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black hover:font-bold active:bg-white active:scale-95 duration-500">
          <MdModeEditOutline className="w-[2vw] h-[2vh]" />
        </DialogTrigger>
        <DialogContent className="md:w-[25vw] md:h-[16vw] bg-buttonColor flex flex-col items-center justify-center pb-[4vw]">
          <img
            className="w-[4.5vw] h-[4.5vw] mt-[2vw]"
            src="/genresIcons/icons8-star.svg"
          />
          <div className="font-bold text-[1.2vw]">{title}</div>
          <Rating
            size="large"
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                handleValue(newValue);
                handleScore(newValue);
              } else {
                handleValue(0);
                handleScore(0);
              }
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StarRating;
