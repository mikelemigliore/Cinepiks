import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface TagsProp {
    reviews?:boolean
}

function Tags({reviews}:TagsProp) {
  const [all, setAll] = useState(true);
  const [subscription, setSubscription] = useState(false);
  const [rent, setRent] = useState(false);
  const [buy, setBuy] = useState(false);
  const [hightolow, setHightolow] = useState(true);
  const [lowtohigh, setLowtohigh] = useState(false);

  const handleHightolow =()=>{
    setHightolow(true)
    setLowtohigh(false)
  }

  const handleLowtohigh =()=>{
    setLowtohigh(true)
    setHightolow(false)
  }

  const handleAll = () => {
    setAll(true);
    setSubscription(false);
    setRent(false);
    setBuy(false);
  };

  const handleSubscription = () => {
    setSubscription((prev) => !prev);
    //setSeries(false);
    if (!subscription) setAll(false);
  };

  const handleBuy = () => {
    setBuy((prev) => !prev);
    // setSeries(false);
    // setMovies(false);
    if (!buy) setAll(false);
  };

  const handleRent = () => {
    setRent((prev) => !prev);
    //setMovies(false);
    if (!rent) setAll(false);
  };

  // Logic to check if both Movies and Series are selected
  if (subscription && rent && buy) {
    handleAll(); // Re-enable "All" and disable both movies and series
  }

  // Set 'All' to true when none of the other categories are selected
  useEffect(() => {
    if (!subscription && !rent && !buy) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [subscription, rent, buy]);

  return (
    <div className="flex transition-transform duration-700 ease-in-out">
      {reviews ? (
        <div className='flex'>
          <Button
            onClick={handleHightolow}
            className={`px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                hightolow ? "bg-white/90 text-black " : ""
            }`}
          >
            High To Low
          </Button>
          <Button
            onClick={handleLowtohigh}
            className={`px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
                lowtohigh ? "bg-white/90 text-black" : ""
            }`}
          >
            Low To High
          </Button>
        </div>
      ) : (
        <div className='flex'>
          <Button
            onClick={handleAll}
            className={`px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              all ? "bg-white/90 text-black " : ""
            }`}
          >
            All
          </Button>
          <Button
            onClick={handleSubscription}
            className={`px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              subscription ? "bg-white/90 text-black" : ""
            }`}
          >
            Subscription
          </Button>
          <Button
            onClick={handleRent}
            className={`px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[0.5vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              rent ? "bg-white/90 text-black " : ""
            }`}
          >
            Rent
          </Button>
          <Button
            onClick={handleBuy}
            className={`px-[1vw] h-[4.5vh] bg-customServicesColor rounded-full flex justify-center items-center mr-[1vw] text-[0.9vw] hover:bg-white/90 hover:text-black active:bg-white/90 active:scale-95 ${
              buy ? "bg-white/90 text-black" : ""
            }`}
          >
            Buy
          </Button>
        </div>
      )}
    </div>
  );
}

export default Tags;
