"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Footer() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:ml-[10vw] md:mt-[5vw]">
        <div>
          <Link
            href="/"
            className="inline-block mb-[2vh] md:mb-[2vh] md:mt-[2vh] mt-[5vh] md:ml-[11vw] ml-[26vw]"
          >
            <img
              src="/WebsiteLogo.png"
              alt="Movie Logo"
              className="w-[45vw] md:w-[15vw]"
            />
          </Link>
        </div>
        <div className="md:ml-[3vw]">
          {isDesktop ? (
            <>
              <h1 className="mt-[-2vh] text-center mx-[5vw] md:mx-0 md:text-[0.8vw] text-[3vw] w-[30vw]">
                Keeping track of your favorite movies and stay up to date with
                the latest releases across all platforms and theaters.
              </h1>
              <h1 className="mt-[2vh] text-customTextColor text-center mx-[5vw] md:mx-0 text-[0.8vw] w-[31vw] hidden md:block">
                ** The following website is for informational purposes only.
                This website is not affiliated with or endorsed by Netflix,
                Hulu, Amazon Prime, or any other streaming service. All
                trademarks and service marks are the property of their
                respective owners.
              </h1>
            </>
          ) : (
            <>
              <h1 className="mt-[-2vh] text-center mx-[5vw] md:mx-0 md:text-[0.8vw] text-[3vw]">
                @Movies Tracker Website
              </h1>
              <h1 className="mt-[2vh] text-customTextColor text-center mx-[5vw] md:mx-0 md:text-[0.8vw] text-[3vw]">
                ** non-affiliation disclaimer: The following website is for
                informational purposes.
              </h1>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row md:text-[0.8vw] text-[3vw] ml-[10vw] md:mt-[4vh]">
        <div className="md:h-[50vh]">
          <div>
            <Link
              href="/termsofservice"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-[10vh] ml-[6vw] md:ml-[5vw]"
            >
              Terms of Service
            </Link>
          </div>
          <div>
            <Link
              href="/privatePolicy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link
              href="/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              Disclaimer
            </Link>
          </div>
          <div>
            <Link
              href="https://www.linkedin.com/in/michele-migliore-b377b7278/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-[4vh] ml-[6vw] md:ml-[5vw]"
            >
              About Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
