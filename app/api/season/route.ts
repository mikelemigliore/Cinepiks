import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
//import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "@/utils/authOptions";

export const POST = async (request: any) => {
  const { season, userEmail, episodeNumber, Id, episodeValue, episodeWatched, } =
    await request.json();

  // console.log("ID", Id);
  // console.log("season", season);
  //console.log("progressValue", progressValue);
  await connect();

  try {
    if (!userEmail) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const existingSeason = existingUser.season.find(
      (s: any) => s.seriesId === Id && s.seasonNumber === season
    );

    let result;

    if (existingSeason) {
      const episodeExists = existingSeason.episodes.find(
        (ep: any) => ep.episodeNumber === episodeNumber
      );

      if (episodeExists) {
        return NextResponse.json(
          { message: "Episode already added." },
          { status: 400 }
        );
      }

      result = await User.updateOne(
        {
          email: userEmail,
        },
        {
          $push: {
            "season.$[element].episodes": {
              episodeNumber: episodeNumber,
              episodeWatched: episodeWatched,
            },
          },
        },
        {
          arrayFilters: [
            {
              "element.seriesId": Id, // Ensure the series ID matches
              "element.seasonNumber": season, // Ensure the season number matches
            },
          ],
        }
      );
    } else {
      result = await User.updateOne(
        { email: userEmail },
        {
          $push: {
            season: {
              seriesId: Id,
              seasonNumber: season,
              episodes: [
                {
                  episodeNumber: episodeNumber,
                  episodeWatched: episodeWatched,
                },
              ],
              progress: episodeValue,
            },
          },
        }
      );
    }

    return NextResponse.json(
      { message: "Like added successfully.", result },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding like.", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (request: any) => {

  try {
    const session: any = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    const user = await User.findOne({ email: userEmail }, "season");

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const season = user.season;

    return NextResponse.json(
      { message: "Likes retrieved successfully.", season },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error retrieving likes.", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: any) => {
  const { season, userEmail, episodeNumber, Id, episodeWatched, } =
    await request.json();
  await connect();

  try {
    if (!season || !userEmail) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const result = await User.updateOne(
      {
        email: userEmail,
      },
      {
        $pull: {
          "season.$[element].episodes": {
            episodeNumber: episodeNumber,
            episodeWatched: episodeWatched,
          },
        },
      },
      {
        arrayFilters: [
          {
            "element.seriesId": Id, // Ensure the series ID matches
            "element.seasonNumber": season, // Ensure the season number matches
          },
        ],
      }
    );

    return NextResponse.json(
      { message: "Like removed successfully.", result },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding like.", error: error.message },
      { status: 500 }
    );
  }
};
