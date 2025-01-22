import { getSession } from "next-auth/react";
//import ListView from "@/components/listview/ListView";
import { getLike } from "@/app/pages/api/likesPage";
//import { useDispatch } from "react-redux";
import {
  likeMovie,
  unlikeMovie,
  unscoreMovie,
  unwatchedMovie,
  unwatchlistMovie,
  updateScore,
  watchedMovie,
  watchlistMovie,
} from "@/app/features/dbSlice";
import { getWatchlist } from "@/app/pages/api/watchlistPage";
import { getWatched } from "@/app/pages/api/watchedPage";

//const dispatch = useDispatch();

async function handleScoreBtn(
  dispatch: any,
  value: number,
  id: number,
  media_type: string
) {
  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    //console.error("User not logged in!");
    return;
  }

  //console.log(value);
  

  if (value === 0) {
    // REMOVE LIKE
    try {
      const res = await fetch("/api/score", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, scoreId: id, media_type, value }),
      });

      if (res.status === 400) {
        console.log("ErrorRRR");
      }

      if (res.status === 200) {
        dispatch(unscoreMovie(res)); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error removing watchlist:", error);
    }
  } else {
    // ADD LIKE
    try {
      const res = await fetch("/api/score", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, scoreId: id, media_type, value }),
      });

      if (res.status === 400) {
        console.log("ErrorDDD");
      }

      if (res.status === 200) {
        console.log(res);
        
        const data = await res.json();
        console.log(data);
        dispatch(updateScore(data)); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  }
}

export default handleScoreBtn;



