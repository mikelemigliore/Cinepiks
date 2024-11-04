import { IoPersonSharp } from "react-icons/io5";
import { IoIosSwitch } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

type NavLink = {
  href: string;
  label: string;
  icon?: React.ReactNode; // The icon is an optional field that can accept a React node (JSX)
};

export const links: NavLink[] = [
  { href: "/account", label: "Account", icon: <IoPersonSharp size={20}/> },
  { href: "/switchprofile", label: "Switch Profile", icon: <IoIosSwitch size={20}/> },
  { href: "/watchlist", label: "Watchlist", icon: <LuPlus size={25}/> },
  { href: "/watched", label: "Watched", icon: <IoCheckmark size={25}/> },
  { href: "/likes", label: "Likes", icon: <AiFillLike size={25}/> },
  { href: "/testpage", label: "Test Page", icon: <AiFillLike size={25}/> },
];
