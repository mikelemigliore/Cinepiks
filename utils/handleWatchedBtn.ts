import { getSession } from "next-auth/react";
import { unwatchedMovie, watchedMovie } from "@/app/features/dbSlice";
import { getWatched } from "@/app/pages/api/watchedPage";

async function handleWatchedBtn(
  dispatch: any,
  setIsAdded: any,
  isAdded: boolean,
  id: number,
  mediaType: string
) {
  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    console.error("User not logged in!");
    return;
  }

  if (isAdded === true) {
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
        dispatch(unwatchedMovie(watchedContent));
      }
    } catch (error) {
      console.error("Error removing watchlist:", error);
    }
  } else {
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
        const data = await getWatched(id, mediaType);
        const watchedContent = await data.json();
        dispatch(watchedMovie(watchedContent));
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  }
}

export default handleWatchedBtn;
