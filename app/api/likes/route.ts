import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (request: any) => {
  const { like, userEmail, mediaType } = await request.json(); // ✅ Expect userId from the frontend

  //console.log(mediaType);

  await connect();

  try {
    if (!like || !userEmail) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    // ✅ Ensure the like is added for the correct user
    const existingUser = await User.findOne({ email: userEmail });

    //console.log("existingUser",existingUser);
    

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // ✅ Check if the like already exists using `some()`
    const existingLike = existingUser.likes.some(
      (likeObj: any) => likeObj.id === like
    );

    //console.log("existingLike",existingLike);
    
    if (existingLike) {
      return NextResponse.json("Already liked this content.");
    }

    const result = await User.updateOne(
      { email: userEmail }, // ✅ Update only this specific user
      {
        $push: {
          likes: {
            id: like,
            type: mediaType,
          },
        },
      } // ✅ Add the like to the user's array
    );

    //console.log("result",result);
    

    return NextResponse.json(
      { message: "Like added successfully.", result },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error adding like:", error); // Log the full error
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

    //console.log("Session", session);

    const userEmail = session.user.email; // ✅ Securely fetch userId from session
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: userEmail }, "likes");
    const likes = user.likes;

    //console.log("likes",likes);
    

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Likes retrieved successfully.", likes },
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
  const { like, userEmail, mediaType } = await request.json();

  await connect();

  try {
    if (!like || !userEmail) {
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
          likes: {
            id: like,
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
