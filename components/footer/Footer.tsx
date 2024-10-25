import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:ml-[10rem]">
        <div>
          <Link href="/" className="inline-block mb-[2rem] md:mb-[0rem] md:mt-[1rem] md:ml-[10rem] ml-[6rem]">
            <img src="/MovieLogo.png" alt="Movie Logo" className="w-[15rem] md:w-[20rem]" />
          </Link>
        </div>
        <div className="md:ml-[3rem]">
          <h1 className="mt-[-7rem] text-center mx-10 md:mx-[0rem]">
            Keeping track of your favorite movies and stay up to date with the
            latest releases <br /> across all platforms and theaters
          </h1>
        </div>
      </div>
      <div className='flex flex-row'>
        <div className="md:h-[30rem]">
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[5rem] ml-[3rem] md:ml-[10rem]"
            >
              Terms of Service
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              Disclosure
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              About Me
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              The following website is <br/> for informational purposes
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[5rem] ml-[3rem] md:ml-[10rem]"
            >
              Movies
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              TV Series
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              Watchlist
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              Watched
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[2rem] ml-[3rem] md:ml-[10rem]"
            >
              Box Office
            </Link>
          </div>
        </div>
      </div>
      {/* <div className='md:ml-[30rem]'>
        <div>
          <Link href="/" className="inline-block mt-[1rem] md:ml-[10rem] ">
          <img src="/MovieLogo.png" alt="Movie Logo" className="w-[20rem]" />
          </Link>
        </div>
        <div className='ml-[3rem]'>
          <h1 className="mt-[-7rem] text-center">
          Keeping track of your favorite movies and stay up to date
          with the latest releases <br /> across all platforms and theaters
          </h1>
        </div>
      </div> */}
    </div>
  );
}

export default Footer;
