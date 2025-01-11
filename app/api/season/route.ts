import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (request: any) => {
  // const { season, userEmail, episodeNumber, Id, progressValue } =
  //   await request.json();
  const { season, userEmail, episodeNumber, Id, episodeValue, episodeWatched, } =
    await request.json();

  // ✅ Expect userId from the frontend
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

    // ✅ Ensure the like is added for the correct user
    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // const existingSeason = existingUser.season.find(
    //   (s: any) => s.seriesId === Id && s.seasonNumber === season
    // );

    // const episodeExists = existingSeason?.episodes.includes(episodeNumber);

    // if (episodeExists) {
    //   return NextResponse.json(
    //     { message: "Episode already exists." },
    //     { status: 400 }
    //   );
    // }

    // let result;

    // if (existingSeason) {
    //   result = await User.updateOne(
    //     {
    //       email: userEmail, // Match the user by email
    //     },
    //     {
    //       $addToSet: {
    //         "season.$[element].episodes": episodeNumber, // Only update the matched season
    //       },
    //       $set: {
    //         "season.$[element].progress": progressValue, // Only update the matched season
    //       },
    //     },
    //     {
    //       arrayFilters: [
    //         {
    //           "element.seriesId": Id, // Ensure the series ID matches
    //           "element.seasonNumber": season, // Ensure the season number matches
    //         },
    //       ],
    //     }
    //   );
    // }

    // ✅ Check if the season exists
    const existingSeason = existingUser.season.find(
      (s: any) => s.seriesId === Id && s.seasonNumber === season
    );

    let result;

    if (existingSeason) {
      // ✅ Check if the episode already exists
      const episodeExists = existingSeason.episodes.find(
        (ep: any) => ep.episodeNumber === episodeNumber
      );

      if (episodeExists) {
        return NextResponse.json(
          { message: "Episode already added." },
          { status: 400 }
        );
      }

      // ✅ Add the new episode with a specific value
      result = await User.updateOne(
        {
          email: userEmail,
          // "season.seriesId": Id,
          // "season.seasonNumber": season,
        },
        {
          $push: {
            "season.$[element].episodes": {
              episodeNumber: episodeNumber,
              //episodeValue: episodeValue, // ✅ New structure!
              episodeWatched: episodeWatched,
            },
          },
          // $inc: {
          //   "season.$[element].progress": episodeValue, // ✅ Increment the progress directly in the database
          // },
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
      // ✅ New season, create the first entry
      // result = await User.updateOne(
      //   { email: userEmail },
      //   {
      //     $push: {
      //       season: {
      //         seriesId: Id,
      //         seasonNumber: season,
      //         episodes: [episodeNumber],
      //         progress: progressValue,
      //       },
      //     },
      //   }
      // );
      // ✅ If the season doesn't exist, create it
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
                  //episodeValue: episodeValue, // ✅ Adding value directly
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
  //console.log("watchlistt");
  await connect(); // Ensure the database is connected

  try {
    const session: any = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    // ✅ Correct the order of checking user existence
    const user = await User.findOne({ email: userEmail }, "season");

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // ✅ Now access the season after confirming the user exists
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

    // ✅ Remove the episode from the specified series and season
    // const result = await User.updateOne(
    //   {
    //     email: userEmail, // Match the user by email
    //   },
    //   {
    //     $pull: {
    //       "season.$[element].episodes": episodeNumber, // Only update the matched season
    //     },
    //     $unset: {
    //       "season.progress": progressValue,
    //     },
    //   },
    //   {
    //     arrayFilters: [
    //       {
    //         "element.seriesId": Id, // Ensure the series ID matches
    //         "element.seasonNumber": season, // Ensure the season number matches
    //       },
    //     ],
    //   }
    // );

    const result = await User.updateOne(
      {
        email: userEmail,
        // "season.seriesId": Id,
        // "season.seasonNumber": season,
      },
      // {
      //   $pull: {
      //     "season.$[element].episodes": { episodeNumber: episodeNumber }, // ✅ Remove the episode using the nested object
      //   },
      // }
      {
        $pull: {
          "season.$[element].episodes": {
            episodeNumber: episodeNumber,
            //episodeValue: episodeValue, // ✅ New structure!
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
