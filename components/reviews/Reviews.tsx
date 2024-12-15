import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoStarFill } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getReviews } from "@/app/pages/api/singleMoviePage";

interface ReviewsProp {
  id: number;
  hightolow: boolean;
  lowtohigh: boolean;
}

interface AuthorProp {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}

interface ReviewStyleProp {
  author: string;
  author_details: AuthorProp;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

function Reviews({ id, hightolow, lowtohigh }: ReviewsProp) {
  const [reviews, setReviews] = useState<ReviewStyleProp[]>([]);
  //const [hightToLow, setHighToLow] = useState<ReviewStyleProp[]>([])
  const [lowToHigh, setLowToHigh] = useState<ReviewStyleProp[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const responseReviews = await getReviews(id);
          const dataReviews = await responseReviews.json();

          // Ensure rating is parsed as a number
          const parsedReviews = dataReviews.map((review: any) => ({
            ...review,
            author_details: {
              ...review.author_details,
              rating: Number(review.author_details.rating),
            },
          }));

          // Sort reviews from high to low by rating
          const sortedReviews = [...parsedReviews].sort(
            (a: ReviewStyleProp, b: ReviewStyleProp) =>
              b.author_details.rating - a.author_details.rating
          );

          // Sort reviews from low to high by rating
          const sortedLowToHigh = [...parsedReviews].sort(
            (a: ReviewStyleProp, b: ReviewStyleProp) =>
              a.author_details.rating - b.author_details.rating
          );

          setReviews(sortedReviews);
          setLowToHigh(sortedLowToHigh);
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const formatDate = (date: string | undefined) => {
    if (date) {
      // Extract only the date part (before the 'T')
      const datePart = date.split("T")[0];
      const [year, month, day] = datePart.split("-");

      // Lookup table for month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Convert the month number to a month name
      const monthName = monthNames[parseInt(month, 10) - 1];

      // Remove leading zeros from the day
      const formattedDay = parseInt(day, 10);

      // Format the final string
      const formattedDate = `${monthName} ${formattedDay}, ${year}`;
      return formattedDate;
    } else {
      return "Not Available";
    }
  };

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const getOrderOfSort = () => {
    if (hightolow && !lowtohigh) {
      return reviews;
    } else {
      return lowToHigh;
    }
  };

  return (
    <ScrollArea className="h-[21.5vw]">
      {getOrderOfSort().length > 0 ? (
        <div className="">
          {getOrderOfSort().map((reviewsItem) => (
            <div
              key={reviewsItem.id}
              className="w-[34.5vw] h-[10.5vw] bg-buttonColor rounded-2xl mb-[0.4vw] mr-[1vw]"
            >
              <div className="flex mx-[1vw]">
                <div className="flex gap-x-[1vw] mt-[1vw]">
                  <div className="h-[2vw] w-[2vw]">
                    <Avatar>
                      <AvatarImage
                        src={`${BASE_IMAGE_URL}${reviewsItem.author_details.avatar_path}`}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex w-full justify-between gap-x-[19vw]">
                    <div className="flex flex-col">
                      <div>{reviewsItem.author_details.username}</div>
                      <div className="text-[0.7vw] text-customTextColor">
                        {formatDate(reviewsItem.created_at)}
                      </div>
                    </div>
                    <div className="h-[1.7vw] w-[4vw] bg-backgroundButton  flex items-center justify-center pr-[0.4vw] rounded-full">
                      <GoStarFill className="w-[2.5vw] h-[2.5vh]" />
                      {reviewsItem.author_details.rating === 0
                        ? "0%"
                        : reviewsItem.author_details.rating + "0%"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-[1vw] mt-[0.5vw] text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[32vw] line-clamp-3 leading-[2] md:leading-[1.5]">
                {reviewsItem.content}
              </div>
              <div className="w-full flex justify-start mt-[1vh] pl-[1vw]">
                <Dialog>
                  <DialogTrigger className="rounded-full py-1 px-3 md:text-[0.8vw] bg-backgroundButton hover:bg-white/90 hover:text-black text-customTextColor">
                    Real All
                  </DialogTrigger>
                  <DialogContent className=" md:w-[70vw] bg-buttonColor rounded-full ">
                    <div className="flex w-full mx-[1vw] mt-[2vw]">
                      <div className="flex gap-x-[1vw]">
                        <div className=" ml-[2vw]">
                          <Avatar>
                            <AvatarImage
                              src={`${BASE_IMAGE_URL}${reviewsItem.author_details.avatar_path}`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="">
                          <div>{reviewsItem.author_details.username}</div>
                          <div className="text-[0.7vw] text-customTextColor">
                            {formatDate(reviewsItem.created_at)}
                          </div>
                        </div>
                        <div className="h-[2vw] mt-[1.1vh] bg-backgroundButton ml-[50vw] flex items-center justify-center pr-[0.4vw] rounded-full">
                          <GoStarFill className="w-[2.5vw] h-[2.5vh]" />
                          {reviewsItem.author_details.rating === 0
                            ? "0%"
                            : reviewsItem.author_details.rating + "0%"}
                        </div>
                      </div>
                    </div>
                    <ScrollArea className="h-[27vw] mr-[1vw] mt-[1vw]">
                      <div className="ml-[3vw]  text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
                        {reviewsItem.content}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[34.5vw] h-[5vw] bg-buttonColor rounded-[1vw] mb-[0.4vw] mr-[1vw]">
          <h1>Not Available</h1>
        </div>
      )}
    </ScrollArea>
  );
}

export default Reviews;