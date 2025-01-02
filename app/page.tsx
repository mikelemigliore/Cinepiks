"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons for toggle
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import ServicesSwiper from "@/components/carousel/ServicesSwiper";
import MovieSwiper from "@/components/carousel/MovieSwiper";
//import { getGenres, getLoginMainCarousel, getPopular, getUpcoming } from "./pages/api/loginPage";
import { useGetNowPlayingQuery } from "./features/homepage/movies/movieSlice";
import {
  useGetGenresQuery,
  useGetUpcomingQuery,
  useGetPopularQuery,
} from "./features/loginpage/loginSlice";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
//import './globals/background.css';

interface ItemProp {
  backdrop_path: string | null; // `null` in case the path is missing
  title: string; // Other properties in your API response can be added here
  genre_ids: number[];
  poster_path: string | null;
}

const services = [
  { id: 1, title: "Netflix", img: "/genresIcons/netflix-3.svg" },
  { id: 2, title: "Hulu", img: "/genresIcons/Hulu-Logo.wine.svg" },
  {
    id: 3,
    title: "Prime Video",
    img: "/genresIcons/Amazon_Prime_Video_logo.svg.png",
  },
  {
    id: 4,
    title: "Apple Tv",
    img: "/genresIcons/apple-tv-plus-seeklogo.svg",
  },
  { id: 5, title: "Disney+", img: "/genresIcons/Disney+_2024.svg.png" },
  { id: 6, title: "Max", img: "/genresIcons/20230413031451!Max_logo.svg" },
  {
    id: 7,
    title: "Peacock",
    img: "/genresIcons/NBCUniversal_Peacock_Logo.svg",
  },
  { id: 8, title: "Paramount+", img: "/genresIcons/paramount-seeklogo.svg" },
  { id: 9, title: "Fandango", img: "/genresIcons/Fandango_logo14.png" },
];

const swiperTitles = [
  { id: 1, title: "In Theaters" },
  { id: 2, title: "Popular" },
];

function LoginIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  //const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  //console.log("Router", router);

  //const { data: session, status } = useSession();

  const [items, setItems] = useState<ItemProp[]>([]);
  const [itemsGenres, setItemsGenres] = useState([]);
  const [inTheaters, setInTheaters] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [logInPage, setLogInPage] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const totalSlides = items.length; // Set the total number of slides

  const { data: loginmainCaraseul } = useGetNowPlayingQuery();

  const { data: genres } = useGetGenresQuery({});

  const { data: moviesUpcoming } = useGetUpcomingQuery({});

  const { data: moviesPopular } = useGetPopularQuery({});

  useEffect(() => {
    if (loginmainCaraseul) {
      setItems(loginmainCaraseul);
    }

    if (genres) {
      setItemsGenres(genres.genres);
    }

    if (moviesUpcoming) {
      setInTheaters(moviesUpcoming.results);
    }

    if (moviesPopular) {
      setPopularMovies(moviesPopular.results);
    }
  }, [loginmainCaraseul, moviesUpcoming, moviesPopular]);

  const getGenreNames = (genreId: number, Genres: any[]) => {
    const genre = Genres.find((g) => g.id === genreId); //The find() method searches the Genres array for an element matching the given condition (g.id === genreId).

    return genre ? genre.name : "Unknown Genre";
    //Without the check, the code assumes that find() will always return an object. When it doesn't (i.e.,
    //the genreId isn't found in Genres), the code tries to access undefined.name.
    //This results in the TypeError: Cannot read properties of undefined (reading 'name').
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Ref to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevious = () => {
    setActiveSlide((prevSlide) =>
      prevSlide - 1 < 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  // Reset timeout when manually navigating or auto-advancing
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 10000); // Change every 10 seconds
  };

  //Fetching data from the /pages/api/loginMainCarousel.ts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getLoginMainCarousel(); // Await the Promise
  //       const responseGenres = await getGenres();
  //       const responsePopular= await getPopular();
  //       const responseInTheaters= await getUpcoming();
  //       const data = await response.json(); // Extract JSON data
  //       const dataGenres = await responseGenres.json();
  //       const dataPopular = await responsePopular.json();
  //       const dataInTheaters = await responseInTheaters.json();
  //      // console.log(dataPopular);

  //       setItems(data.results); // Update state with the resolved data
  //       setItemsGenres(dataGenres.genres);
  //       setPopularMovies(dataPopular.results)
  //       setInTheaters(dataInTheaters.results)
  //     } catch (error) {
  //       console.error("Error fetching carousel items:", error);
  //     }
  //   };

  //   fetchData(); // Call the async function
  // }, []);

  useEffect(() => {
    resetTimeout(); // Set or reset the timeout on activeSlide change

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Cleanup on unmount
      }
    };
  }, [activeSlide, handleNext]);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    //console.log("Session", session);

    if (sessionStatus === "authenticated") {
      router.replace("/homepage");
    }
  }, [sessionStatus, router]);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.replace("/homepage");
  //   }
  // }, [status, router]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //console.log("Form submitted");

    //const username = e.target[0].value;
    const email = e.target[0].value;
    const password = e.target[1].value;
    //const confirmPassword = e.target[3].value;

    //console.log("Email:", email, "Password:", password); // E

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // if(res === undefined){
    //   console.log("Not working");
    // }

    if (res?.error) {
      //console.log("Entered");
      setError("Invalid email or password");
      if (res?.url) router.replace("/homepage");
    } else {
      //console.log("Not entered");
      setError("");
      // if (res?.url) {
      //   router.replace("/homepage"); // Navigate to the homepage on success
      // }
    }

    // console.log(email, password);
  };

  // const handleRedirect = () => {
  //   router.replace("/homepage"); // Replace with the actual route you want to test
  // };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="">
        <div className="flex">
          <div className="w-[70vw] rounded-tr-custom rounded-br-custom overflow-hidden">
            {/* The overflow-hidden property solved the issue because it ensures that any content (such as the CarouselContent, CarouselItem, or img elements) 
      that extends outside the boundaries of the parent container (div.w-[70vw]) is clipped and confined within those boundaries. */}
            <Carousel
              activeSlide={activeSlide} //activeSlide: Keeps track of which slide is currently shown
              totalSlides={totalSlides} //Provides the number of slides in the carousel.
            >
              <CarouselContent>
                {items.map((item: ItemProp) => (
                  <CarouselItem className="relative w-full flex justify-center items-center ">
                    <div className="relative">
                      <img
                        src={`${BASE_IMAGE_URL}${item.backdrop_path}`}
                        className="bg-cover bg-center md:bg-top bg-no-repeat"
                      />
                      <div className="absolute inset-0 flex flex-col justify-between ml-[7vw] my-[4vw]">
                        <div>
                          <h1 className="text-[1.7vw] font-semibold line-clamp-1">
                            Now Playing
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-[2.5vw] font-semibold line-clamp-1">
                            {item.title}
                          </h1>
                          <div className="text-[1vw] flex justify-start items-center">
                            <span>
                              {getGenreNames(item.genre_ids[0], itemsGenres)}
                            </span>
                            <GoDotFill className="w-[0.7vw] h-[0.7vw] mx-[0.4vw] rounded-full" />
                            <span>
                              {getGenreNames(item.genre_ids[1], itemsGenres)}
                            </span>
                            <GoDotFill className="w-[0.7vw] h-[0.7vw] mx-[0.4vw] rounded-full" />
                            <span className="pr-[0.6vw]">
                              {getGenreNames(item.genre_ids[2], itemsGenres)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                onClick={handlePrevious}
                className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50"
              />
              <CarouselNext
                onClick={handleNext}
                className="hidden md:block mx-[4vw] !bg-transparent hover:text-white text-white/70 border-none z-50"
              />
            </Carousel>
          </div>

          <div className="mt-[1vw] ml-[8vw]">
            <img
              src="/MovieLogo.png"
              alt="Movie Logo"
              className="w-[8vw] m-[2vw]"
            />
            <div className="flex flex-col items-center">
              <div className="space-y-[1vw]">
                <h1 className="mb-[1vh] text-[1.2vw] font-bold">Log In</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-[1vw]">
                    <input
                      type="text"
                      className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[14vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor`}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="mb-[1vw]">
                    <div className="flex relative">
                      {/* Search Input */}
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`md:bg-transparent md:h-[5.5vh] md:px-[1.5vw] w-[14vw] placeholder-customTextColor md:rounded-full md:text-[0.8vw] border border-customTextColor ${
                          showPassword ? "text-[0.9vw]" : "text-[0.9vw]"
                        }`}
                        placeholder="Enter password"
                        required
                      />
                      <div
                        className="absolute right-[1vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-customColor pl-[0.5vw]"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="bg-customColor w-[1.3vw] h-[1.3vw]" />
                        ) : (
                          <AiOutlineEye className="bg-customColor w-[1.3vw] h-[1.3vw]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      //onClick={handleRedirect}
                      className=" font-bold rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95"
                    >
                      Log In
                    </button>
                  </div>
                </form>
                <div className="flex items-center space-x-2">
                  <div>
                    <div className="flex items-center">
                      <Checkbox
                        id="terms1"
                        className="border border-white m-[0.5vw]"
                      />
                      <div>
                        <label
                          htmlFor="terms1"
                          className="text-customTextColor text-[0.7vw] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remind Me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="pl-[1.5vw]">
                    <Link
                      href="/forgotpassword"
                      className="text-[0.7vw] font-medium leading-none text-customTextColor  border-b-[0.1vw] border-transparent hover:border-customTextColor"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div>
                  {/* <Link href={{ pathname: "/homepage", query: { guest: "true" } }}> */}
                  <Link href="/homepage">
                    <Button className=" font-bold rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                      Continue As Guest
                    </Button>
                  </Link>
                </div>
                <div className="flex">
                  <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
                  <h1 className="flex mx-[1vw] mt-[0.5vw] text-[0.7vw]">Or</h1>
                  <div className="w-full h-[0.1vh] mt-[2vh] bg-white/20"></div>
                </div>
                <div className="">
                  <Button
                    onClick={() => {
                      signIn("google");
                    }}
                    className=" rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-transparent hover:bg-white text-white/90 hover:text-black active:bg-white active:scale-95 border border-customTextColor"
                  >
                    <FcGoogle className="w-[1.3vw] h-[1.3vw] ml-[-1vw] mr-[1vw]" />
                    Continue with Google
                  </Button>
                </div>
                {/* <div>
                <Button className="rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-transparent hover:bg-white text-white/90 hover:text-black  active:bg-white active:scale-95 border border-customTextColor">
                  <img
                    src="/genresIcons/facebook.svg"
                    className="w-[1.4vw] h-[1.4vw]  mr-[1vw] text-blue-500"
                  />
                  Continue with Facebook
                </Button>
              </div> */}
                <div>
                  <Button
                    onClick={() => {
                      signIn("github");
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-transparent hover:bg-white text-white/90 hover:text-black  active:bg-white active:scale-95 border border-customTextColor"
                  >
                    {hovered ? (
                      <img
                        src="/genresIcons/github-mark.svg"
                        className="w-[1.4vw] h-[1.4vw]  mr-[1vw] text-blue-500"
                      />
                    ) : (
                      <img
                        src="/genresIcons/github-mark-white.svg"
                        className="w-[1.4vw] h-[1.4vw]  mr-[1vw] text-blue-500"
                      />
                    )}
                    Continue with GitHub
                  </Button>
                </div>
                <p className="text-red-600 text-[0.9vw] mt-[0.5vw]">
                  {error && error}
                </p>
                <div className="flex items-center space-x-2 ml-[2.5vw]">
                  <div>
                    <h1 className="text-[0.8vw] font-medium leading-none text-customTextColor">
                      Don't have one?
                    </h1>
                  </div>
                  <div>
                    <Link
                      href="/singup"
                      className="text-[0.8vw] font-medium leading-none text-blue-500  border-b-[0.1vw] border-transparent hover:border-blue-500"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[6vw]">
          <div className="w-[90vw] h-[7vw] bg-customServicesColor rounded-3xl">
            <div className="m-[1.5vw] flex justify-between items-center">
              <div>
                <h1 className="font-bold text-[1vw]">Disclaimer</h1>
                <h2 className="text-[0.9vw] font-medium text-gray-300">
                  The following website is for informational purposes. This
                  website is not affiliated with or endorsed by Netflix, Hulu,
                  Amazon Prime, <br />
                  or any other streaming service. All trademarks and service
                  marks are the property of their respective owners.
                </h2>
              </div>
              <div>
                <Button className="font-bold rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                  Discalimer
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative z-50">
            <h1 className="text-[2vw] font-semibold w-full text-center mt-[6vw] mb-[6vw]">
              What You'll Be Able To Do
            </h1>
            <div className="mt-[4vw]">
              <div className="flex justify-center items-center space-x-[15vw]">
                <div className="text-[0.9vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center w-[15vw] h-[15vw] ">
                  <img src="/Compass.png" className="h-[6vw]"></img>
                  <div className="mt-[1vw]">
                    <h1 className="font-bold text-[1vw] text-white">
                      Explore Your Favorite Titles
                    </h1>
                    Search for movies and TV shows by title, genre, or platform.
                    Use Filter and Sort to personalinze your search.
                  </div>
                </div>{" "}
                <div className="text-[0.9vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center w-[15vw] h-[15vw] ">
                  <img src="/Star.png" className="h-[6vw]"></img>
                  <div className="mt-[1vw]">
                    <h1 className="font-bold text-[1vw] text-white">
                      Rate and Review Content
                    </h1>
                    Give a score using a star system to movies or TV shows you
                    have watched.
                  </div>
                </div>
                <div className="text-[0.9vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center w-[15vw] h-[15vw] ">
                  <img src="/Bookmark.png" className="h-[6vw]"></img>
                  <div className="mt-[1vw]">
                    <h1 className="font-bold text-[1vw] text-white">
                      Create Personalized Watchlist
                    </h1>
                    Add movies or TV shows to a watchlist, mark items as
                    watched, and track viewing progress.
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-full space-x-[15vw] mt-[3vw]">
                <div className="text-[0.9vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center w-[15vw] h-[15vw] ">
                  <img src="/Stats.png" className="h-[6vw]"></img>
                  <div className="mt-[1vw]">
                    <h1 className="font-bold text-[1vw] text-white">
                      All The Info In One Place
                    </h1>
                    Explore trailer, cast, ratings,synopsis, reviews, and where
                    to watch—all in one place.
                  </div>
                </div>
                <div className="text-[0.9vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center w-[15vw] h-[15vw] ">
                  <img src="/Like.png" className="h-[6vw]"></img>
                  <div className="mt-[1vw]">
                    <h1 className="font-bold text-[1vw] text-white">
                      Like Your Favorites
                    </h1>
                    Show your love for movies and shows by liking them with a
                    single click.
                  </div>
                </div>
                <div className="text-[0.9vw] font-medium  text-gray-300 text-center break-words flex flex-col justify-center items-center w-[15vw] h-[15vw] ">
                  <img src="/Camera.png" className="h-[6vw]"></img>
                  <div className="mt-[1vw]">
                    <h1 className="font-bold text-[1vw] text-white">
                      Track Entertainment
                    </h1>
                    Your go-to place for exploring movie and TV details,
                    tracking what you love, and planning your next watch.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <img
              src="/Ellipse2.png"
              className="absolute w-[65vw] h-[65vw]  mt-[-30vw]"
            ></img>
          </div>
          {/* <div className=" flex justify-center items-center">
          <div className="absolute bg-ellipseColor w-[30vw] h-[30vw] rounded-full opacity-100 filter blur-[200px] mt-[-25vw]"></div>
        </div> */}
        </div>
        <div className="flex justify-center mt-[10vw] w-full h-full rounded-3xl overflow-hidden ">
          <img
            src="/obliqueCollage.jpg"
            className="relative w-[93vw] h-[30vw] rounded-3xl object-cover opacity-35 filter blur-[1px]"
            alt="Oblique Collage"
          />
          <div className="absolute flex flex-col justify-center items-center w-[40vw] h-[30vw]">
            <h1 className="text-[1.3vw] font-semibold">
              Explore, Rate, and Track All Your Favorite Movies and Shows
            </h1>
            <h2 className="text-[0.9vw] pt-[2vh] pb-[2vh] font-medium text-center leading-[2]">
              Discover, organize, and track your favorite movies and TV shows
              all in one place! Create personalized watchlists, explore content
              by genre or platform, and watch trailers directly on the site.
              Stay updated with detailed reviews, ratings, and where to stream
              your favorite titles. Your ultimate movie companion starts here!
            </h2>
            <div className="flex justify-center items-center mt-[3vh] mb-[3vh]">
              <Link href="/singup">
                <Button className=" font-bold rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                  Sign Up Now
                </Button>
              </Link>
              <h1 className="px-[1vw] font-bold">Or</h1>
              <Link href="/homepage">
                <Button className=" font-bold rounded-full md:h-[5.5vh] md:px-[1.5vw] w-[14vw] text-[0.8vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                  Explore As Guest
                </Button>
              </Link>
            </div>
            <h2 className="text-[0.8vw] mt-[4vh] text-center">
              non-affiliation disclaimer: The following website is for
              informational purposes. This website is not affiliated with or
              endorsed by Netflix, Hulu, Amazon Prime, or any other streaming
              service. All trademarks and service marks are the property of
              their respective owners.
            </h2>
          </div>
        </div>

        <div className="mt-[7vw]">
          <ServicesSwiper logInPage={logInPage} services={services} />
        </div>
        <div className="mt-[2vw] mb-[4vw]">
          <div
            className={`ml-2 mb-4 md:ml-[3vw] text-white text-xl md:text-[1.3vw] font-semibold`}
          >
            <h1>See What's Waiting for You</h1>

            <div
              className={`text-[2vw] md:text-[0.9vw] pt-[1vh] pb-[1vh] font-medium text-gray-300`}
            >
              <h2>
                Get a sneak peek at trending movies and series available to
                explore.
              </h2>
            </div>
          </div>
          {/* {swiperTitles.map((swiperTitle) => ( */}
          <div>
            <h1 className="ml-2 mb-4 md:ml-[3.7vw] md:mb-[1vh] text-white text-[1.5vw] font-semibold">
              Upcoming
            </h1>
            <MovieSwiper
              description={""}
              logInPage={logInPage}
              medias={inTheaters}
              itemsGenres={itemsGenres}
              //getGenreNames={getGenreNames}
              //title={swiperTitle.title}
              mediaType={"movie"}
            />
          </div>
          <div>
            <h1 className="ml-2 mb-4 md:ml-[3.7vw] md:mb-[1vh] text-white text-[1.5vw] font-semibold">
              Popular
            </h1>
            <MovieSwiper
              description={""}
              logInPage={logInPage}
              medias={popularMovies}
              itemsGenres={itemsGenres}
              //getGenreNames={getGenreNames}
              //title={swiperTitle.title}
              mediaType={"movie"}
            />
          </div>
          {/* ))} */}
        </div>
      </div>
    )
  );
}

export default LoginIn;

// function LoginIn() {

//   return (
//     <div className="">
//       <h1>Login Page</h1>
//     </div>
//   );
// }

// export default LoginIn;
