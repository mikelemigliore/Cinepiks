import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Button Element
}

function Watchlist({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-[0.8vw] md:space-x-[0.4vw] space-x-[3vw]"
      asChild
    >
      <Link href="/watchlist" className="flex items-center">
        <LuPlus className="w-5 h-5" />
        <span className='text-[4vw] md:text-[0.8vw]'>Watchlist</span>
      </Link>
    </Button>
  );
}

export default Watchlist;










// import React from "react";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { LuPlus } from "react-icons/lu";

// interface Props {
//   onClick: React.MouseEventHandler<HTMLButtonElement>; // Button Element
// }

// function Watchlist({ onClick }: Props) {
//   const handleReload = () => {
//     window.location.href = "/watchlist"; // Force page reload
//   };

//   return (
//     <Button
//       variant="ghost"
//       onClick={(e) => {
//         if (onClick) onClick(e); // Call the passed onClick handler if provided
//         handleReload(); // Reload the page
//       }}
//       className="!bg-transparent hover:text-white text-white/70 rounded-lg focus:ring-0 font-bold text-[0.8vw]"
//       // asChild
//     >
//       {/* <Link href="/watchlist" className="flex items-center space-x-[0.4vw]"> */}
//       <LuPlus className="w-5 h-5" />
//       <span>Watchlist</span>
//       {/* </Link> */}
//     </Button>
//   );
// }

// export default Watchlist;
