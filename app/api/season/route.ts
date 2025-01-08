import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (request: any) => {
  const { season, userEmail, episodeNumber, Id } = await request.json(); // ✅ Expect userId from the frontend
  // console.log("ID", Id);
  // console.log("season", season);
  // console.log("watchedEpisodes", episodeNumber);
  await connect();

  try {
    if (!userEmail) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    // ✅ Ensure the like is added for the correct user
    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const existingSeason = existingUser.season.find(
      (s: any) => s.seriesId === Id && s.seasonNumber === season
    );

    // ✅ Check if the episode already exists
    const episodeExists = existingSeason?.episodes.includes(episodeNumber);

    if (episodeExists) {
      return NextResponse.json(
        { message: "Episode already exists." },
        { status: 400 }
      );
    }

    let result;

    if (existingSeason) {
      // result = await User.updateOne(
      //     {
      //         email: userEmail,
      //         "season.seriesId": Id,
      //         "season.seasonNumber": season
      //     },
      //     {
      //         $addToSet: {
      //             "season.$.episodes": episodeNumber
      //         }
      //     }
      // );
      result = await User.updateOne(
        {
            email: userEmail, // Match the user by email
        },
        {
            $addToSet: {
                "season.$[element].episodes": episodeNumber  // Only update the matched season
            }
        },
        {
            arrayFilters: [
                {
                    "element.seriesId": Id,  // Ensure the series ID matches
                    "element.seasonNumber": season // Ensure the season number matches
                }
            ]
        }
    );
  } else {
      // ✅ New season, create the first entry
      result =  await User.updateOne(
          { email: userEmail },
          {
              $push: {
                  season: {
                      seriesId: Id,
                      seasonNumber: season,
                      episodes: [episodeNumber]
                  }
              }
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
  //console.log("watchlistt");
  await connect(); // Ensure the database is connected

  try {
    const session: any = await getServerSession(authOptions);

    //console.log("Session", session);

    const userEmail = session.user.email; // ✅ Securely fetch userId from session
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: userEmail }, "season");
    const season = user.season;

    //console.log("season", season);

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

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
  const { season, userEmail, episodeNumber, Id } = await request.json();
  //console.log("ID", Id);
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

    //console.log("ID", Id);

    // ✅ Remove the episode from the specified series and season
    const result = await User.updateOne(
      {
        email: userEmail,
        "season.seriesId": Id, // ✅ Match the correct series
        "season.seasonNumber": season,
      },
      {
        $pull: {
          "season.$.episodes": episodeNumber, // ✅ Remove the specific episode
        },
      }
    );

    //console.log(result);

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
