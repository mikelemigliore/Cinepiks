import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:ml-[10vw] md:mt-[5vw]">
        <div>
          <Link
            href="/"
            className="inline-block mb-[5vh] md:mb-[2vh] md:mt-[2vh] md:ml-[11vw] ml-[10vw]"
          >
            <img
              src="/MovieLogo.png"
              alt="Movie Logo"
              className="w-[10vw] md:w-[10vw]"
            />
          </Link>
        </div>
        <div className="md:ml-[2vw]">
          <h1 className="mt-[-2vh] text-center mx-[5vw] md:mx-0 text-[0.8vw] w-[30vw]">
            Keeping track of your favorite movies and stay up to date with the
            latest releases across all platforms and theaters.
          </h1>
          <h1 className="mt-[2vh] text-customTextColor text-center mx-[5vw] md:mx-0 text-[0.8vw] w-[31vw]">
            ** The following website is for informational purposes only. This
            website is not affiliated with or endorsed by Netflix, Hulu, Amazon
            Prime, or any other streaming service. All trademarks and service
            marks are the property of their respective owners.
          </h1>
        </div>
      </div>
      <div className="flex flex-row text-[0.8vw] ml-[10vw] mt-[4vh]">
        <div className="md:h-[50vh]">
          <div>
            <Link
              href="/termsofservice" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-[10vh] ml-[6vw] md:ml-[5vw]"
            >
              Terms of Service
            </Link>
          </div>
          <div>
            <Link
              href="/privatePolicy" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link
              href="/disclaimer" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Disclaimer
            </Link>
          </div>
          <div>
            <Link
              href="/testpage" //Link to linkedin
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              About Me
            </Link>
          </div>
          {/* <div>
            <h1 className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw] w-[25vw]">
            The following website is for informational purposes only. This
                  website is not affiliated with or endorsed by Netflix, Hulu,
                  Amazon Prime, or any other streaming service. All trademarks and service
                  marks are the property of their respective owners.
            </h1>
          </div> */}
        </div>
        {/* <div>
          <div>
            <h1 className="inline-block mt-[17vh] ml-[6vw] md:ml-[5vw] w-[25vw] text-center">
              The following website is for informational purposes only. This
              website is not affiliated with or endorsed by Netflix, Hulu,
              Amazon Prime, or any other streaming service. All trademarks and
              service marks are the property of their respective owners.
            </h1>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
