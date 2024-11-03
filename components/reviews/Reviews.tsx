import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoStarFill } from "react-icons/go";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const reviews = [
  {
    id: 1,
    username: "SkyRo85",
    date: "September 1, 2024",
    score: "80%",
    text: `Finally, the moment I have been eagerly waiting for has arrived - the new film featuring Deadpool and Wolverine! I am thrilled to share my thoughts on this without revealing any spoilers, so brace yourself for a fairly tame review to keep the surprise intact for everyone.
      Marvel is back in its element with this movie, as it takes a playful jab at itself. Deadpool boldly declares that the Multiverse is a mess and proposes putting an end to it - a refreshing take on the superhero genre.  
      The dance sequence is a hilarious throwback to the 90s, adding a touch of nostalgia and charm to the film. And yes, there is plenty of colorful language, including an abundance of the infamous F word - but then again, what else would you expect from Deadpool?
      Prepare to be amazed by some incredible cameos that will leave you jumping out of your seat with excitement, especially if you have a soft spot for certain characters from the past. This movie is an absolute thrill ride that pays homage to the Fox universe and its beloved characters.
      Without giving too much away, there is a surprising appearance by a fan-favorite character who never made it to the superhero league, and the moment is truly jaw-dropping. The storyline may seem chaotic, but that's all part of the Deadpool charm.
      While the villain could have been utilized more effectively given their power, the relationship between Deadpool and Wolverine is beautifully portrayed. The film does a commendable job of explaining the backstory, and the humor is on point, with Deadpool's witty jabs and references adding to the experience.
      Finally, the moment I have been eagerly waiting for has arrived - the new film featuring Deadpool and Wolverine! I am thrilled to share my thoughts on this without revealing any spoilers, so brace yourself for a fairly tame review to keep the surprise intact for everyone.
      Marvel is back in its element with this movie, as it takes a playful jab at itself. Deadpool boldly declares that the Multiverse is a mess and proposes putting an end to it - a refreshing take on the superhero genre.  
      The dance sequence is a hilarious throwback to the 90s, adding a touch of nostalgia and charm to the film. And yes, there is plenty of colorful language, including an abundance of the infamous F word - but then again, what else would you expect from Deadpool?
      Prepare to be amazed by some incredible cameos that will leave you jumping out of your seat with excitement, especially if you have a soft spot for certain characters from the past. This movie is an absolute thrill ride that pays homage to the Fox universe and its beloved characters.
      Without giving too much away, there is a surprising appearance by a fan-favorite character who never made it to the superhero league, and the moment is truly jaw-dropping. The storyline may seem chaotic, but that's all part of the Deadpool charm.
      While the villain could have been utilized more effectively given their power, the relationship between Deadpool and Wolverine is beautifully portrayed. The film does a commendable job of explaining the backstory, and the humor is on point, with Deadpool's witty jabs and references adding to the experience.
      Finally, the moment I have been eagerly waiting for has arrived - the new film featuring Deadpool and Wolverine! I am thrilled to share my thoughts on this without revealing any spoilers, so brace yourself for a fairly tame review to keep the surprise intact for everyone.
      Marvel is back in its element with this movie, as it takes a playful jab at itself. Deadpool boldly declares that the Multiverse is a mess and proposes putting an end to it - a refreshing take on the superhero genre.  
      The dance sequence is a hilarious throwback to the 90s, adding a touch of nostalgia and charm to the film. And yes, there is plenty of colorful language, including an abundance of the infamous F word - but then again, what else would you expect from Deadpool?
      Prepare to be amazed by some incredible cameos that will leave you jumping out of your seat with excitement, especially if you have a soft spot for certain characters from the past. This movie is an absolute thrill ride that pays homage to the Fox universe and its beloved characters.
      Without giving too much away, there is a surprising appearance by a fan-favorite character who never made it to the superhero league, and the moment is truly jaw-dropping. The storyline may seem chaotic, but that's all part of the Deadpool charm.
      While the villain could have been utilized more effectively given their power, the relationship between Deadpool and Wolverine is beautifully portrayed. The film does a commendable job of explaining the backstory, and the humor is on point, with Deadpool's witty jabs and references adding to the experience.
      Finally, the moment I have been eagerly waiting for has arrived - the new film featuring Deadpool and Wolverine! I am thrilled to share my thoughts on this without revealing any spoilers, so brace yourself for a fairly tame review to keep the surprise intact for everyone.
      Marvel is back in its element with this movie, as it takes a playful jab at itself. Deadpool boldly declares that the Multiverse is a mess and proposes putting an end to it - a refreshing take on the superhero genre.  
      The dance sequence is a hilarious throwback to the 90s, adding a touch of nostalgia and charm to the film. And yes, there is plenty of colorful language, including an abundance of the infamous F word - but then again, what else would you expect from Deadpool?
      Prepare to be amazed by some incredible cameos that will leave you jumping out of your seat with excitement, especially if you have a soft spot for certain characters from the past. This movie is an absolute thrill ride that pays homage to the Fox universe and its beloved characters.
      Without giving too much away, there is a surprising appearance by a fan-favorite character who never made it to the superhero league, and the moment is truly jaw-dropping. The storyline may seem chaotic, but that's all part of the Deadpool charm.
      While the villain could have been utilized more effectively given their power, the relationship between Deadpool and Wolverine is beautifully portrayed. The film does a commendable job of explaining the backstory, and the humor is on point, with Deadpool's witty jabs and references adding to the experience.`,
  },
  {
    id: 2,
    username: "HHuiopon",
    date: "September 1, 2024",
    score: "70%",
    text: `Finally, the moment I have been eagerly waiting for has arrived - the new film featuring Deadpool and Wolverine! I am thrilled to share my thoughts on this without revealing any spoilers, so brace yourself for a fairly tame review to keep the surprise intact for everyone.
      Marvel is back in its element with this movie, as it takes a playful jab at itself. Deadpool boldly declares that the Multiverse is a mess and proposes putting an end to it - a refreshing take on the superhero genre.  
      The dance sequence is a hilarious throwback to the 90s, adding a touch of nostalgia and charm to the film. And yes, there is plenty of colorful language, including an abundance of the infamous F word - but then again, what else would you expect from Deadpool?
      Prepare to be amazed by some incredible cameos that will leave you jumping out of your seat with excitement, especially if you have a soft spot for certain characters from the past. This movie is an absolute thrill ride that pays homage to the Fox universe and its beloved characters.
      Without giving too much away, there is a surprising appearance by a fan-favorite character who never made it to the superhero league, and the moment is truly jaw-dropping. The storyline may seem chaotic, but that's all part of the Deadpool charm.`,
  },
  {
    id: 3,
    username: "LaMinchia",
    date: "September 1, 2024",
    score: "64%",
    text: `Finally, the moment I have been eagerly waiting for has arrived - the new film featuring Deadpool and Wolverine! I am thrilled to share my thoughts on this without revealing any spoilers, so brace yourself for a fairly tame review to keep the surprise intact for everyone.
      Marvel is back in its element with this movie, as it takes a playful jab at itself. Deadpool boldly declares that the Multiverse is a mess and proposes putting an end to it - a refreshing take on the superhero genre.`,
  },
  {
    id: 4,
    username: "Sebborroico69",
    date: "September 1, 2024",
    score: "91%",
    text: `Finally, the moment I have been eagerly waiting for has arrived - the new film featuring Deadpool and Wolverine! I am thrilled to share my thoughts on this without revealing any spoilers, so brace yourself for a fairly tame review to keep the surprise intact for everyone.
      Marvel is back in its element with this movie, as it takes a playful jab at itself. Deadpool boldly declares that the Multiverse is a mess and proposes putting an end to it - a refreshing take on the superhero genre.  
      The dance sequence is a hilarious throwback to the 90s, adding a touch of nostalgia and charm to the film. And yes, there is plenty of colorful language, including an abundance of the infamous F word - but then again, what else would you expect from Deadpool?
      Prepare to be amazed by some incredible cameos that will leave you jumping out of your seat with excitement, especially if you have a soft spot for certain characters from the past.`,
  },
];

function Reviews() {
  return (
    <ScrollArea className="h-[21.5vw]">
      <div className=''>
        {reviews.map((reviewsItem) => (
          <div
            key={reviewsItem.id}
            className="w-[34.5vw] h-[10.5vw] bg-buttonColor rounded-2xl mb-[0.4vw] mr-[1vw]"
          >
            <div className="flex mx-[1vw]">
              <div className="flex gap-x-[1vw] mt-[1vw]">
                <div className="h-[2vw] w-[2vw]">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex w-full justify-between gap-x-[19vw]">
                  <div className="flex flex-col">
                    <div>{reviewsItem.username}</div>
                    <div className="text-[0.7vw] text-customTextColor">
                      {reviewsItem.date}
                    </div>
                  </div>
                  <div className="h-[1.7vw] w-[4vw] bg-backgroundButton  flex items-center justify-center pr-[0.4vw] rounded-full">
                    <GoStarFill className="w-[2.5vw] h-[2.5vh]" />
                    {reviewsItem.score}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-[1vw] mt-[0.5vw] text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[32vw] line-clamp-3 leading-[2] md:leading-[1.5]">
              {reviewsItem.text}
            </div>
            <div className="w-full flex justify-start mt-[1vh] pl-[1vw]">
              <Dialog>
                <DialogTrigger className="rounded-full py-1 px-3 md:text-[0.8vw] bg-backgroundButton hover:bg-white/90 hover:text-black text-customTextColor">
                  Real All
                </DialogTrigger>
                <DialogContent className=" md:w-[70vw] md:h-[35vw] bg-buttonColor rounded-full ">
                  <div className="flex w-full mx-[1vw] mt-[2vw]">
                    <div className="flex gap-x-[1vw]">
                      <div className=" ml-[2vw]">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="">
                        <div>{reviewsItem.username}</div>
                        <div className="text-[0.7vw] text-customTextColor">
                          {reviewsItem.date}
                        </div>
                      </div>
                      <div className="h-[2vw] mt-[1.1vh] bg-backgroundButton ml-[50vw] flex items-center justify-center pr-[0.4vw] rounded-full">
                        <GoStarFill className="w-[2.5vw] h-[2.5vh]" />
                        {reviewsItem.score}
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="h-[27vw] mr-[1vw] mt-[1vw]">
                    <div className="ml-[3vw]  text-white text-base md:text-[0.9vw] text-start max-w-[23rem] md:max-w-[65vw] leading-[2] md:leading-[1.5]">
                      {reviewsItem.text}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default Reviews;
