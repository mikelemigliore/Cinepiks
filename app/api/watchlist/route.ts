import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
//import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "@/utils/authOptions";

export const POST = async (request: any) => {
  const { watchlist, userEmail,mediaType } = await request.json(); 

  await connect();

  try {
    if (!watchlist || !userEmail) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const existingWatchlist = existingUser.watchlist.some(
      (watchlistObj: any) => watchlistObj.id === watchlist
    );
    

    if (existingWatchlist) {
      return NextResponse.json("Already liked this content.");
    }

    const result = await User.updateOne(
      { email: userEmail }, 
      {
        $push: {
          watchlist: {
            id: watchlist,
            type: mediaType,
          },
        },
      } 
    );

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

  await connect(); // Ensure the database is connected

  try {
    const session: any = await getServerSession(authOptions);

    const userEmail = session.user.email; 
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: userEmail }, "watchlist");
    const watchlist = user.watchlist;

    //console.log("watchlist",watchlist);
    

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Likes retrieved successfully.", watchlist },
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
  const { watchlist, userEmail,mediaType } = await request.json();

  await connect();

  try {
    if (!watchlist || !userEmail) {
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
      { email: userEmail },
      {
        $pull: {
          watchlist: {
            id: watchlist,
            type: mediaType,
          },
        },
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
