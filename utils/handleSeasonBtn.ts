import { getSession } from "next-auth/react";
import { addEpisode, removeEpisode } from "@/app/features/dbSlice";

async function handleSeasonBtn(
  dispatch: any,
  selectedSeason: any,
  episodeNumber: any,
  Id: any,
  isWatched: any,
  episodeWatched: any
) {
  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return;
  }

  if (isWatched === true) {
    try {
      const res = await fetch("/api/season", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          season: selectedSeason,
          episodeNumber,
          Id,
          episodeWatched,
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
            episodeWatched,
          })
        );
      }
    } catch (error) {
      console.error("Error removing watchlist:", error);
    }
  } else {
    try {
      const res = await fetch("/api/season", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          season: selectedSeason,
          episodeNumber,
          Id,
          episodeWatched,
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
            episodeWatched,
          })
        );
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  }
}

export default handleSeasonBtn;
