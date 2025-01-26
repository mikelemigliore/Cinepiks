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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import ServicesSwiper from "@/components/carousel/ServicesSwiper";
import MovieSwiper from "@/components/carousel/MovieSwiper";
import { useGetNowPlayingQuery } from "./features/homepage/movies/movieSlice";
import {
  useGetGenresQuery,
  useGetUpcomingQuery,
  useGetPopularQuery,
} from "./features/loginpage/loginSlice";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemProp {
  backdrop_path: string | null;
  title: string;
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

function LoginIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  const [items, setItems] = useState<ItemProp[]>([]);
  const [itemsGenres, setItemsGenres] = useState([]);
  const [inTheaters, setInTheaters] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [logInPage, setLogInPage] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const totalSlides = items.length;

  const { data: loginmainCaraseul, isLoading } = useGetNowPlayingQuery();

  const { data: genres } = useGetGenresQuery({});

  const { data: moviesUpcoming } = useGetUpcomingQuery({});

  const { data: moviesPopular } = useGetPopularQuery({});

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

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
    const genre = Genres.find((g) => g.id === genreId);

    return genre ? genre.name : "Unknown Genre";
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

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 10000);
  };

  useEffect(() => {
    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeSlide, handleNext]);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/homepage");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailInput = e.target[0].value;
    const email = emailInput.toLowerCase();
    const password = e.target[1].value;

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

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/homepage");
    } else {
      setError("");
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="">
        <div className="md:flex">
          <div className="md:w-[70vw] w-[150vw] ml-[-25vw] md:ml-[0vw] md:rounded-tr-custom md:rounded-br-custom md:rounded-bl-[0] overflow-hidden rounded-br-custom rounded-bl-custom">
            <Carousel activeSlide={activeSlide} totalSlides={totalSlides}>
              <CarouselContent>
                {items.length === 0 ? (
                  <div className="md:flex">
                    <Skeleton className="bg-backgroundButton md:w-[70vw] md:h-[83vh] w-[200vw] h-[44vh] ml-[-25vw] md:ml-[0vw] md:rounded-tr-custom md:rounded-br-custom md:rounded-bl-[0] overflow-hidden rounded-br-custom rounded-bl-custom" />
                  </div>
                ) : (
                  <>
                    {items.map((item: ItemProp, index) => (
                      <CarouselItem
                        key={index}
                        className="relative w-full flex justify-center items-center "
                      >
                        <div className="relative">
                          <img
                            src={`${BASE_IMAGE_URL}${item.backdrop_path}`}
                            className="bg-cover bg-center md:bg-top bg-no-repeat"
                          />
                          <div className="absolute inset-0 flex flex-col justify-between md:ml-[7vw] my-[4vw]">
                            <div>
                              <h1 className="md:text-[1.7vw] text-[5vw] font-semibold line-clamp-1 ml-[35vw] md:ml-[0vw]">
                                {isDesktop ? (
                                  <>Now Playing</>
                                ) : (
                                  <>{item.title}</>
                                )}
                              </h1>
                            </div>
                            <div className="ml-[50vw] md:ml-[0vw] hidden md:block">
                              <h1 className="md:text-[2.5vw] font-semibold line-clamp-1">
                                {item.title}
                              </h1>
                              <div className="text-[1vw] md:flex justify-start items-center">
                                <span>
                                  {getGenreNames(
                                    item.genre_ids[0],
                                    itemsGenres
                                  )}
                                </span>
                                <GoDotFill className="w-[0.7vw] h-[0.7vw] mx-[0.4vw] rounded-full" />
                                <span>
                                  {getGenreNames(
                                    item.genre_ids[1],
                                    itemsGenres
                                  )}
                                </span>
                                <GoDotFill className="w-[0.7vw] h-[0.7vw] mx-[0.4vw] rounded-full" />
                                <span className="pr-[0.6vw]">
                                  {getGenreNames(
                                    item.genre_ids[2],
                                    itemsGenres
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </>
                )}
              </CarouselContent>
              <CarouselPrevious
                onClick={handlePrevious}
                className="md:mx-[4vw] ml-[40vw] !bg-transparent hover:text-white text-white/70 border-none z-50"
              />
              <CarouselNext
                onClick={handleNext}
                className=" md:mx-[4vw] mr-[40vw] !bg-transparent hover:text-white text-white/70 border-none z-50"
              />
            </Carousel>
          </div>

          <div className="md:mt-[1vw] md:ml-[5vw]">
            <img
              src="/WebsiteLogo.png"
              alt="Movie Logo"
              className="md:w-[14vw] md:m-[2vw] w-[50vw] ml-[25vw] mt-[10vw]  md:mb-[2vw] mb-[5vw]"
            />
            <div className="flex flex-col items-center">
              <div className="md:space-y-[1vw] space-y-[5vw]">
                <h1 className="mb-[1vh]  md:text-[1.2vw] text-[5vw] font-bold">
                  Log In
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="md:mb-[1vw] mb-[5vw]">
                    <input
                      type="text"
                      className={`bg-transparent md:h-[5.5vh] h-[7vh] md:px-[1.5vw] px-[5vw] md:w-[14vw] w-[80vw] placeholder-customTextColor rounded-full md:text-[0.8vw] text-[4vw] border border-customTextColor`}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="md:mb-[1vw] mb-[5vw]">
                    <div className="flex relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`bg-transparent md:h-[5.5vh] h-[7vh] md:px-[1.5vw] px-[5vw] md:w-[14vw] w-[80vw] placeholder-customTextColor rounded-full md:text-[0.8vw] text-[4vw] border border-customTextColor ${
                          showPassword ? "text-[0.9vw]" : "text-[0.9vw]"
                        }`}
                        placeholder="Enter password"
                        required
                      />
                      <div
                        className="absolute md:right-[1vw] right-[2vw] top-[50%] transform -translate-y-[50%] cursor-pointer bg-customColor pl-[0.5vw]"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="bg-customColor md:w-[1.3vw] md:h-[1.3vw] w-[12vw] h-[7vw]" />
                        ) : (
                          <AiOutlineEye className="bg-customColor md:w-[1.3vw] md:h-[1.3vw] w-[12vw] h-[7vw]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className=" font-bold rounded-full md:h-[5.5vh] h-[7vh] md:px-[1.5vw] px-[5vw] md:w-[14vw] w-[80vw] md:text-[0.8vw] text-[4vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95"
                    >
                      Log In
                    </button>
                  </div>
                </form>
                <div className="flex items-center space-x-5">
                  <div className="w-full h-[0.1vh]  bg-white/20"></div>
                  <div className="flex flex-col justify-center items-center mt-[0.5vw] mb-[0.5vw]">
                    <div className="items-center justify-center flex md:w-[6vw] w-[35vw] md:text-[0.7vw] text-[4vw] font-medium text-customTextColor">
                      Forgot Password ?
                    </div>

                    <Link
                      href="/forgotpassword"
                      className=" md:text-[0.7vw] text-[4vw] font-medium text-blue-500  border-b-[0.1vw] border-transparent hover:border-blue-500"
                    >
                      Click Here
                    </Link>
                  </div>
                  <div className="w-full h-[0.1vh]  bg-white/20"></div>
                </div>

                <div>
                  <Link href="/homepage">
                    <Button className=" font-bold rounded-full md:h-[5.5vh] h-[7vh] md:px-[1.5vw] px-[5vw] md:w-[14vw] w-[80vw] md:text-[0.8vw] text-[4vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                      Continue As Guest
                    </Button>
                  </Link>
                </div>
                <div className="">
                  <Button
                    onClick={() => {
                      signIn("google");
                    }}
                    className=" rounded-full md:h-[5.5vh] h-[7vh] md:px-[1.5vw] px-[5vw] md:w-[14vw] w-[80vw] md:text-[0.8vw] text-[4vw] bg-transparent hover:bg-white text-white/90 hover:text-black active:bg-white active:scale-95 border border-customTextColor"
                  >
                    <FcGoogle className="md:w-[1.3vw] w-[7vw] h-[7vw] md:h-[1.3vw]  md:mr-[2vw]  mr-[8vw]" />
                    Continue with Google
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      signIn("github");
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="rounded-full md:h-[5.5vh] h-[7vh] md:px-[1.5vw] px-[5vw] md:w-[14vw] w-[80vw] md:text-[0.8vw] text-[4vw] bg-transparent hover:bg-white text-white/90 hover:text-black  active:bg-white active:scale-95 border border-customTextColor"
                  >
                    {hovered ? (
                      <img
                        src="/genresIcons/github-mark.svg"
                        className="md:w-[1.3vw] w-[7vw] h-[7vw] md:h-[1.3vw]  md:mr-[2vw]  mr-[8vw] "
                      />
                    ) : (
                      <img
                        src="/genresIcons/github-mark-white.svg"
                        className="md:w-[1.3vw] w-[7vw] h-[7vw] md:h-[1.3vw]  md:mr-[2vw]  mr-[8vw] "
                      />
                    )}
                    Continue with GitHub
                  </Button>
                </div>
                <p className="text-red-600 md:text-[0.9vw] text-[4vw] mt-[0.5vw]">
                  {error && error}
                </p>
                <div className="flex items-center space-x-2 ml-[2.5vw]">
                  <div>
                    <h1 className="md:text-[0.8vw] text-[4vw] font-medium leading-none text-customTextColor">
                      Don't have one?
                    </h1>
                  </div>
                  <div>
                    <Link
                      href="/singup"
                      className="md:text-[0.8vw] text-[4vw] font-medium leading-none text-blue-500  border-b-[0.1vw] border-transparent hover:border-blue-500"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center md:mt-[6vw] mt-[20vw]">
          <div className="md:w-[90vw] md:h-[7vw] w-[80vw] h-[70vw] bg-customServicesColor rounded-3xl">
            <div className="md:m-[1.5vw] m-[4vw] md:flex justify-between items-center">
              <div className="md:space-y-0 space-y-5">
                <h1 className="font-bold md:text-[1vw] text-[4vw] text-center md:text-start">
                  Disclaimer
                </h1>
                <h2 className="md:text-[0.9vw] text-[3.5vw] font-medium text-gray-300 text-center md:text-start">
                  The following website is for informational purposes. This
                  website is not affiliated with or endorsed by Netflix, Hulu,
                  Amazon Prime, <br />
                  or any other streaming service. All trademarks and service
                  marks are the property of their respective owners.
                </h2>
              </div>
              <div className="mt-[10vw] md:mt-[0vw]">
                <Link
                  href="/disclaimer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-[16vw] md:ml-[0vw] font-bold rounded-full md:h-[5.5vh] h-[7vh] md:py-[1vw] py-[4vw] md:px-[4vw] px-[12vw] md:w-[14vw] w-[70vw] md:text-[0.8vw] text-[3.5vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95"
                >
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative z-50">
            <h1 className="md:text-[2vw] text-[5vw] font-semibold w-full text-center md:mt-[6vw] mt-[20vw] md:mb-[6vw] mb-[12vw]">
              What You'll Be Able To Do
            </h1>
            <div className="mt-[4vw]">
              <>
                <div className="md:flex md:justify-center md:items-center md:space-x-[15vw] md:space-y-0 space-y-[10vh]">
                  <div className="md:text-[0.9vw] text-[3.5vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center md:w-[15vw] md:h-[15vw]">
                    <img
                      src="/Compass.png"
                      className="md:h-[6vw] h-[25vw]"
                    ></img>
                    <div className="mt-[1vw] md:w-full w-[80vw]">
                      <h1 className="font-bold md:text-[1vw] text-[4vw] text-white">
                        Explore Your Favorite Titles
                      </h1>
                      Search for movies and TV shows by title, genre, or
                      platform. Use Filter and Sort to personalinze your search.
                    </div>
                  </div>{" "}
                  <div className="md:text-[0.9vw] text-[3.5vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center md:w-[15vw] md:h-[15vw] ">
                    <img src="/Star.png" className="md:h-[6vw] h-[25vw]"></img>
                    <div className="mt-[1vw] md:w-full w-[80vw]">
                      <h1 className="font-bold md:text-[1vw] text-[4vw] text-white">
                        Rate and Review Content
                      </h1>
                      Give a score using a star system to movies or TV shows you
                      have watched.
                    </div>
                  </div>
                  <div className="md:text-[0.9vw] text-[3.5vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center md:w-[15vw] md:h-[15vw] ">
                    <img
                      src="/Bookmark.png"
                      className="md:h-[6vw] h-[25vw]"
                    ></img>
                    <div className="mt-[1vw] md:w-full w-[80vw]">
                      <h1 className="font-bold md:text-[1vw] text-[4vw] text-white">
                        Create Personalized Watchlist
                      </h1>
                      Add movies or TV shows to a watchlist, mark items as
                      watched, and track viewing progress.
                    </div>
                  </div>
                </div>
                <div className="md:flex md:justify-center md:items-center w-full md:space-x-[15vw] md:mt-[3vw] mt-[10vh] md:space-y-0 space-y-[10vh]">
                  <div className="md:text-[0.9vw] text-[3.5vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center md:w-[15vw] md:h-[15vw] ">
                    <img src="/Stats.png" className="md:h-[6vw] h-[25vw]"></img>
                    <div className="mt-[1vw] md:w-full w-[80vw]">
                      <h1 className="font-bold md:text-[1vw] text-[4vw] text-white">
                        All The Info In One Place
                      </h1>
                      Explore trailer, cast, ratings,synopsis, reviews, and
                      where to watch—all in one place.
                    </div>
                  </div>
                  <div className="md:text-[0.9vw] text-[3.5vw] font-medium text-gray-300 text-center break-words flex flex-col justify-center items-center md:w-[15vw] md:h-[15vw] ">
                    <img src="/Like.png" className="md:h-[6vw] h-[25vw]"></img>
                    <div className="mt-[1vw] md:w-full w-[80vw]">
                      <h1 className="font-bold md:text-[1vw] text-[4vw] text-white">
                        Like Your Favorites
                      </h1>
                      Show your love for movies and shows by liking them with a
                      single click.
                    </div>
                  </div>
                  <div className="md:text-[0.9vw] text-[3.5vw] font-medium  text-gray-300 text-center break-words flex flex-col justify-center items-center md:w-[15vw] md:h-[15vw] ">
                    <img
                      src="/Camera.png"
                      className="md:h-[6vw] h-[25vw]"
                    ></img>
                    <div className="mt-[1vw] md:w-full w-[80vw]">
                      <h1 className="font-bold md:text-[1vw] text-[4vw] text-white">
                        Track Entertainment
                      </h1>
                      Your go-to place for exploring movie and TV details,
                      tracking what you love, and planning your next watch.
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/Ellipse2.png"
              className="absolute md:w-[65vw] md:h-[65vw] h-[505vw]  md:mt-[-30vw] mt-[-300vw]"
            ></img>
          </div>
        </div>
        <div className="flex justify-center md:mt-[10vw] mt-[30vw] w-full h-full rounded-3xl overflow-hidden ">
          <img
            src="/obliqueCollage.jpg"
            className="relative md:w-[93vw] md:h-[30vw] w-[93vw] h-[150vw] rounded-3xl object-cover opacity-35 filter blur-[1px]"
            alt="Oblique Collage"
          />
          <div className="absolute flex flex-col justify-center items-center md:w-[40vw] md:h-[30vw] h-[150vw] w-[80vw] text-center">
            <h1 className="md:text-[1.3vw] text-[5vw] font-semibold">
              Explore, Rate, and Track All Your Favorite Movies and Shows
            </h1>
            <h2 className="md:text-[0.9vw] text-[3.5vw] pt-[2vh] pb-[2vh] font-medium text-center leading-[2]">
              Discover, organize, and track your favorite movies and TV shows
              all in one place! Create personalized watchlists, explore content
              by genre or platform, and watch trailers directly on the site.
              Stay updated with detailed reviews, ratings, and where to stream
              your favorite titles. Your ultimate movie companion starts here!
            </h2>
            <div className="flex justify-center items-center mt-[3vh] mb-[3vh]">
              <Link href="/singup">
                <Button className=" font-bold rounded-full md:h-[5.5vh] h-[6vh] md:px-[1.5vw] md:w-[14vw] md:text-[0.8vw] text-[3.5vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                  Sign Up Now
                </Button>
              </Link>
              <h1 className="md:px-[1vw] px-[5vw] font-bold">Or</h1>
              <Link href="/homepage">
                <Button className=" font-bold rounded-full md:h-[5.5vh] h-[6vh] md:px-[1.5vw] md:w-[14vw] md:text-[0.8vw] text-[3.5vw] bg-white/70 hover:bg-white text-black active:bg-white active:scale-95">
                  Explore As Guest
                </Button>
              </Link>
            </div>
            <h2 className="md:text-[0.8vw] text-[3vw] mt-[4vh] text-center">
              non-affiliation disclaimer: The following website is for
              informational purposes. This website is not affiliated with or
              endorsed by Netflix, Hulu, Amazon Prime, or any other streaming
              service. All trademarks and service marks are the property of
              their respective owners.
            </h2>
          </div>
        </div>

        <div className="md:mt-[7vw] mt-[20vw]">
          <ServicesSwiper logInPage={logInPage} services={services} />
        </div>
        <div className="ml-2 md:ml-0 md:mt-[2vw] mt-[10vw] mb-[4vw]">
          <div
            className={`ml-2 mb-4 md:ml-[3vw] text-white text-xl md:text-[1.3vw] font-semibold`}
          >
            <h1>See What's Waiting for You</h1>

            <div
              className={`text-[3.5vw] md:text-[0.9vw]  pt-[1vh] pb-[1vh] font-medium text-gray-300`}
            >
              <h2>
                Get a sneak peek at trending movies and series available to
                explore.
              </h2>
            </div>
          </div>
          <div>
            <h1 className="ml-2 mb-4 md:ml-[3vw] md:mb-[1vh] text-white md:text-[1.5vw] text-xl font-semibold">
              Upcoming
            </h1>
            <MovieSwiper
              description={""}
              logInPage={logInPage}
              medias={inTheaters}
              itemsGenres={itemsGenres}
              mediaType={"movie"}
            />
          </div>
          <div>
            <h1 className="ml-2 mb-4 md:ml-[3vw] md:mb-[1vh] text-white md:text-[1.5vw] text-xl font-semibold">
              Popular
            </h1>
            <MovieSwiper
              description={""}
              logInPage={logInPage}
              medias={popularMovies}
              itemsGenres={itemsGenres}
              mediaType={"movie"}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default LoginIn;
