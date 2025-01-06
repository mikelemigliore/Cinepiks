import { getSession } from "next-auth/react";
//import ListView from "@/components/listview/ListView";
import { getLike } from "@/app/pages/api/likesPage";
//import { useDispatch } from "react-redux";
import { likeMovie, unlikeMovie, unwatchlistMovie, watchlistMovie } from "@/app/features/dbSlice";
import { getWatchlist } from "@/app/pages/api/watchlistPage";

//const dispatch = useDispatch();

async function handleWatchlistBtn(dispatch:any, setIsAdded: any, isAdded: boolean, id: number, mediaType:string) {

  
  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    console.error("User not logged in!");
    return;
  }

  if (isAdded === true) {
    // REMOVE LIKE
    try {
      const res = await fetch("/api/watchlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, watchlist: id , mediaType}),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        setIsAdded(false);
        const data = await getWatchlist(id,mediaType);
        const watchlistedContent = await data.json();
        dispatch(unwatchlistMovie(watchlistedContent)); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error removing watchlist:", error);
    }
  } else {
    // ADD LIKE
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, watchlist: id,mediaType }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        setIsAdded(true);
        const data = await getWatchlist(id,mediaType); // Fetch movie data by IDs
        const watchlistedContent = await data.json();
        dispatch(watchlistMovie(watchlistedContent)); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  }
}

export default handleWatchlistBtn;
