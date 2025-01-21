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
import { useGetMovieReviewQuery } from "@/app/features/homepage/movies/moviedetailsSlice";
import { useGetSeriesReviewQuery } from "@/app/features/homepage/series/seriesSlice";

interface ReviewsProp {
  id: number;
  hightolow: boolean;
  lowtohigh: boolean;
  type: string;
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

function Reviews({ id, hightolow, lowtohigh, type }: ReviewsProp) {
  const [reviews, setReviews] = useState<ReviewStyleProp[]>([]);
  //const [hightToLow, setHighToLow] = useState<ReviewStyleProp[]>([])
  const [lowToHigh, setLowToHigh] = useState<ReviewStyleProp[]>([]);

  const { data: movieReviews } = useGetMovieReviewQuery(id);

  const { data: seriesReviews } = useGetSeriesReviewQuery(id);

  useEffect(() => {
    if (type === "movie") {
      if (movieReviews) {
        // Ensure rating is parsed as a number
        const parsedReviews = movieReviews.map((review: any) => ({
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
      }
    } else if (type === "series") {
      if (seriesReviews) {
        // Ensure rating is parsed as a number
        const parsedReviews = seriesReviews.map((review: any) => ({
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
      }
    }
  }, [id, movieReviews, seriesReviews]);

  // useEffect(() => {
  //   if (id) {
  //     const fetchData = async () => {
  //       try {
  //         const responseReviews = await getReviews(id);
  //         const dataReviews = await responseReviews.json();

  //         // Ensure rating is parsed as a number
  //         const parsedReviews = dataReviews.map((review: any) => ({
  //           ...review,
  //           author_details: {
  //             ...review.author_details,
  //             rating: Number(review.author_details.rating),
  //           },
  //         }));

  //         // Sort reviews from high to low by rating
  //         const sortedReviews = [...parsedReviews].sort(
  //           (a: ReviewStyleProp, b: ReviewStyleProp) =>
  //             b.author_details.rating - a.author_details.rating
  //         );

  //         // Sort reviews from low to high by rating
  //         const sortedLowToHigh = [...parsedReviews].sort(
  //           (a: ReviewStyleProp, b: ReviewStyleProp) =>
  //             a.author_details.rating - b.author_details.rating
  //         );

  //         setReviews(sortedReviews);
  //         setLowToHigh(sortedLowToHigh);
  //       } catch (error) {
  //         console.error("Failed to fetch:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [id]);

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
    <ScrollArea className="md:h-[21.5vw] h-[110vw]">
      {getOrderOfSort().length > 0 ? (
        <div className="">
          {getOrderOfSort().map((reviewsItem) => (
            <div
              key={reviewsItem.id}
              className="md:w-[34.5vw] w-[92vw] md:h-[10.5vw] h-[28vh] bg-buttonColor rounded-2xl md:mb-[0.4vw] mb-[2vw] mr-[1vw]"
            >
              <div className="flex mx-[1vw]">
                <div className="flex md:gap-x-[1vw] gap-x-[8vw] md:mt-[1vw] mt-[3vw]">
                  <div className="h-[2vw] w-[2vw] md:ml-[0vw] ml-[1vw] ">
                    <Avatar>
                      <AvatarImage
                        src={`${BASE_IMAGE_URL}${reviewsItem.author_details.avatar_path}`}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex md:w-[29vw] w-[78vw] justify-between">
                    <div className="flex flex-col">
                      <div className="line-clamp-1 md:text-[0.9vw] text-[3.5vw]">
                        {reviewsItem.author_details.username}
                      </div>
                      <div className="md:text-[0.7vw] text-[3.5vw] text-customTextColor">
                        {formatDate(reviewsItem.created_at)}
                      </div>
                    </div>
                    <div className="md:text-[0.9vw] text-[3.5vw] md:h-[1.7vw] md:w-[4vw] h-[9vw] w-[20vw] bg-backgroundButton  flex items-center justify-center pr-[0.4vw] rounded-full">
                      <GoStarFill className="md:w-[2.5vw] md:h-[2.5vh] w-[5vw] h-[5vh] md:mr-[0vw] mr-[2vw]" />
                      {reviewsItem.author_details.rating === 0
                        ? "0%"
                        : reviewsItem.author_details.rating + "0%"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:ml-[1vw] ml-[2vw] md:mt-[0.5vw] mt-[2vw] text-white text-base md:text-[0.8vw] text-start max-w-[23rem] md:max-w-[32vw] line-clamp-3 leading-[2] md:leading-[1.5]">
                {reviewsItem.content}
              </div>
              <div className="w-full flex justify-start mt-[1.5vh] md:pl-[1vw] pl-[2vw]">
                <Dialog>
                  <DialogTrigger className="rounded-full py-1 px-3 md:text-[0.8vw] bg-backgroundButton hover:bg-white/90 hover:text-black text-customTextColor">
                    Real All
                  </DialogTrigger>
                  <DialogContent className=" md:w-[70vw] w-[93vw] bg-buttonColor rounded-2xl">
                    <div className="flex w-full md:mt-[2vw] mt-[3vw]">
                      <div className="flex gap-x-[1vw]">
                        <div className=" ml-[2vw]">
                          <Avatar>
                            <AvatarImage
                              src={`${BASE_IMAGE_URL}${reviewsItem.author_details.avatar_path}`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="md:ml-0 ml-2">
                          <div>{reviewsItem.author_details.username}</div>
                          <div className="md:text-[0.7vw] text-[3.5vw] md:w-[7vw] w-[40vw]  text-customTextColor">
                            {formatDate(reviewsItem.created_at)}
                          </div>
                        </div>
                        <div className="md:h-[2vw] h-[9vw] w-[20vw]  md:w-[4vw] mt-[1.1vh] bg-backgroundButton md:ml-[50vw] ml-[13vw] flex items-center justify-center pr-[0.4vw] rounded-full">
                          <GoStarFill className="md:w-[2.5vw] md:h-[2.5vh] w-[5vw] h-[5vh] md:mr-[0vw] mr-[2vw]" />
                          {reviewsItem.author_details.rating === 0
                            ? "0%"
                            : reviewsItem.author_details.rating + "0%"}
                        </div>
                      </div>
                    </div>
                    <ScrollArea className="md:h-[27vw] h-[70vw] md:mr-[1vw] md:mt-[1vw] mr-[1vw] mt-[3vw] md:mb-[0vw] mb-[3vw]">
                      <div className="md:ml-[2vw] ml-[4vw]   text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
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
        <div className="w-[34.5vw]  h-full bg-transparent rounded-[1vw] mb-[0.4vw] mr-[1vw]">
        <img
          src="/noResultsFound7.png"
          alt="No content found"
          className="md:w-[30vw] w-[100vw] md:ml-[3vw] ml-[0vw] md:mt-[4vh] mt-[14vh] absolute"
        />
      </div>
      )}
    </ScrollArea>
  );
}

export default Reviews;
