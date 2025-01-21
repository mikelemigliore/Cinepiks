import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <img src="/WebsiteLogo.png" alt="Movie Logo" className="w-[17vw] md:w-[5.5vw] transform scale-150 md:ml-[1vw] ml-[8vw]" />
    </Link>
  );
}

export default Logo;

//asChild allows the Link component to take over rendering while still applying the Button component's styles and behavior (like size)
