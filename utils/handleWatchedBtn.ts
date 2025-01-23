import { getSession } from "next-auth/react";
//import ListView from "@/components/listview/ListView";
import { getLike } from "@/app/pages/api/likesPage";
//import { useDispatch } from "react-redux";
import {
  likeMovie,
  unlikeMovie,
  unwatchedMovie,
  unwatchlistMovie,
  watchedMovie,
  watchlistMovie,
} from "@/app/features/dbSlice";
import { getWatchlist } from "@/app/pages/api/watchlistPage";
import { getWatched } from "@/app/pages/api/watchedPage";
import { useGetWatchlistQuery } from "@/app/features/watchlist/watchlistSlice";

//const dispatch = useDispatch();

async function handleWatchedBtn(
  dispatch: any,
  setIsAdded: any,
  isAdded: boolean,
  id: number,
  mediaType: string,
  //watchlistDB:any
) {

  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    console.error("User not logged in!");
    return;
  }


  // const isInWatchlist = watchlistDB?.some(
  //   (item: any) => item.id === id && item.type === mediaType
  // );


  if (isAdded === true) {
    // REMOVE
    try {
      const res = await fetch("/api/watched", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, watched: id, mediaType }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        setIsAdded(true);
        const data = await getWatched(id, mediaType);
        const watchedContent = await data.json();
        dispatch(unwatchedMovie(watchedContent)); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error removing watchlist:", error);
    }
  } else {
    // ADD
    try {
      const res = await fetch("/api/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, watched: id, mediaType }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        setIsAdded(true);
        const data = await getWatched(id, mediaType); // Fetch movie data by IDs
        const watchedContent = await data.json();
        dispatch(watchedMovie(watchedContent)); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  }
}

export default handleWatchedBtn;
