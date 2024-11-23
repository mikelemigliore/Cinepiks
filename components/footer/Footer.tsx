import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:ml-[10vw] md:mt-[5vw]">
        <div>
          <Link href="/" className="inline-block mb-[5vh] md:mb-[2vh] md:mt-[2vh] md:ml-[11vw] ml-[10vw]">
            <img src="/MovieLogo.png" alt="Movie Logo" className="w-[10vw] md:w-[10vw]" />
          </Link>
        </div>
        <div className="md:ml-[2vw]">
          <h1 className="mt-[-2vh] text-center mx-[5vw] md:mx-0 text-[0.8vw]">
            Keeping track of your favorite movies and stay up to date with the
            latest releases <br /> across all platforms and theaters
          </h1>
        </div>
      </div>
      <div className="flex flex-row text-[0.8vw] ml-[10vw]">
        <div className="md:h-[50vh]">
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[10vh] ml-[6vw] md:ml-[5vw]"
            >
              Terms of Service
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Disclosure
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              About Me
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              The following website is <br /> for informational purposes
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[10vh] ml-[6vw] md:ml-[5vw]"
            >
              Movies
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              TV Series
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Watchlist
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Watched
            </Link>
          </div>
          <div>
            <Link
              href="/testpage"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Box Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;