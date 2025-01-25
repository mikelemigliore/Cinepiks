import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/authOptions";

export const PUT = async (request: any) => {
  const { scoreId, userEmail, mediaType, value } = await request.json(); 
  //console.log("HERE");
  
  await connect();

  try {

    if (!scoreId || !userEmail) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const existingScore = existingUser.score.findIndex(
      (scoreObj: any) => scoreObj.id === scoreId
    );

    let result;

    if (existingScore !== -1) {
      result = await User.updateOne(
        { email: userEmail, "score.id": scoreId },
        { $set: { "score.$.score": value } }
      );

    } else {
      result = await User.updateOne(
        { email: userEmail }, 
        {
          $push: {
            score: {
              id: scoreId,
              type: mediaType,
              score: value,
            },
          },
        } 
      );
    }

    //console.log("result",result);

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
  await connect(); 

  try {
    const session: any = await getServerSession(authOptions);

    //console.log("Session", session);

    const userEmail = session.user.email; 
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: userEmail }, "score");
    const score = user.score;

    //console.log("watchlist",watchlist);

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Likes retrieved successfully.", score },
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
  const { scoreId, userEmail, mediaType, value } = await request.json();

  await connect();

  try {
    if (!scoreId || !userEmail) {
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
          score: {
            id: scoreId,
            type: mediaType,
            score: value,
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
