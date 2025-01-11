
import { getSession } from "next-auth/react";
//import ListView from "@/components/listview/ListView";
import { getLike } from "@/app/pages/api/likesPage";
//import { useDispatch } from "react-redux";
import {
  likeMovie,
  addEpisode,
  unlikeMovie,
  unwatchedMovie,
  unwatchlistMovie,
  watchedMovie,
  watchlistMovie,
  removeEpisode,
} from "@/app/features/dbSlice";
import { getWatchlist } from "@/app/pages/api/watchlistPage";
import { getWatched } from "@/app/pages/api/watchedPage";

//const dispatch = useDispatch();

async function handleSeasonBtn(
  dispatch: any,
  selectedSeason: any,
  episodeNumber: any,
  Id: any,
  isWatched: any,
  episodeWatched:any
) {
  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    console.error("User not logged in!");
    return;
  }

  if (isWatched === true) {
    // REMOVE LIKE
    try {
      const res = await fetch("/api/season", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          season: selectedSeason,
          episodeNumber,
          Id,
          episodeWatched
        }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        dispatch(
          removeEpisode({
            seasonNumber: selectedSeason,
            episodeNumber: episodeNumber,
            Id,
            episodeWatched
          })
        ); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error removing watchlist:", error);
    }
  } else {
    // ADD LIKE
    //console.log("watchedEpisodes",episodeNumber);
    try {
      const res = await fetch("/api/season", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          season: selectedSeason,
          episodeNumber,
          Id,
          episodeWatched
        }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        dispatch(
          addEpisode({
            Id,
            seasonNumber: selectedSeason,
            episodeNumber: episodeNumber,
            episodeWatched
          })
        ); // ✅ Dispatch Redux action
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  }
}

export default handleSeasonBtn;
