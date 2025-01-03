import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { like } = await request.json();

  await connect();

  try {
    //console.log("Request", like);

    if (!like) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    const existingResult = await User.findOne({ likes: like });

    if(existingResult){
        return NextResponse.json("Already in your likes")
    }

    const result = await User.updateOne({ $push: { likes: like } });

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

export const GET = async () => {
  await connect(); // Ensure the database is connected

  try {
    // Retrieve the first user's likes array
    const user = await User.findOne({}, "likes");
    const likes = user.likes;
    //console.log(user.likes);

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

// export const GET = async () => {
//     //const { like } = await request.json();

//     await connect();

//     try {

//     const user = await User.findOne({}, 'likes');

//       return NextResponse.json(
//         { message: "Like added successfully.", user },
//         { status: 200 }
//       );
//     } catch (error: any) {
//       return NextResponse.json(
//         { message: "Error adding like.", error: error.message },
//         { status: 500 }
//       );
//     }
//   };
