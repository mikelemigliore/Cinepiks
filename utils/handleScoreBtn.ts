import { getSession } from "next-auth/react";
import { unscoreMovie, updateScore } from "@/app/features/dbSlice";

async function handleScoreBtn(
  dispatch: any,
  value: number,
  id: number,
  media_type: string
) {
  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return;
  }

  if (value === 0) {
    try {
      const res = await fetch("/api/score", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, scoreId: id, media_type, value }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        dispatch(unscoreMovie(res));
      }
    } catch (error) {
      console.error("Error removing watchlist:", error);
    }
  } else {
    try {
      const res = await fetch("/api/score", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, scoreId: id, media_type, value }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        const data = await res.json();
        dispatch(updateScore(data));
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  }
}

export default handleScoreBtn;
