import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User"; // Ensure path is correct for your schema
import { getServerSession } from "next-auth";
//import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "@/utils/authOptions";

export async function POST(request: Request) {
  const { email, picture } = await request.json();

  await connect(); 

  try {
    if (!email || !picture) {
      return NextResponse.json({
        success: false,
        error: "Email and picture are required.",
      });
    }

    const existingUser = await User.findOne({ email: email });


    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Update the user's profile picture
    const result = await User.updateOne(
      { email: email },
      {
        $set: { picture: picture }, 
      }
    );

    return NextResponse.json(
      { message: "Image updated successfully.", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json({ error: "An error occurred." });
  }
}

export const GET = async (request: any) => {
  await connect(); // Ensure the database is connected

  try {
    const session: any = await getServerSession(authOptions);


    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user.email; 
    //console.log("userEmail", userEmail);

    const user = await User.findOne({ email: userEmail }, "picture");
    const picture = user.picture;

    //console.log("picture", picture);

    if (!picture) {
      return NextResponse.json(
        { message: "picture not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "picture retrieved successfully.", picture },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error retrieving picture.", error: error.message },
      { status: 500 }
    );
  }
};
