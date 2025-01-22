import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "@/utils/authOptions";

export const PUT = async (request: any) => {
  const { email, newEmail, confirmNewEmail } = await request.json(); 

  await connect();

  try {
    if (!newEmail || !confirmNewEmail) {
      return NextResponse.json(
        { message: "User emails are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email });

    //console.log("existingUser",existingUser);

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const existingUserWithNewEmail = await User.findOne({
      email: confirmNewEmail,
    });
    if (existingUserWithNewEmail) {
      return NextResponse.json(
        { message: "This email is already in use." },
        { status: 400 }
      );
    }

    const result = await User.updateOne(
      { email: email },
      {
        $set: { email: confirmNewEmail }, 
      }
    );

    //console.log("result", result);

    return NextResponse.json(
      { message: "Email updated successfully.", result },
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

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user.email; 

    const user = await User.findOne({ email: userEmail }).lean();
    //const email = user.email;

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Likes retrieved successfully.", user },
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
  const { email } = await request.json();

  await connect();

  try {
    if (!email) {
      return NextResponse.json(
        { message: "User ID and like data are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const result = await User.deleteOne({ email });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "User could not be deleted." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Account deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding like.", error: error.message },
      { status: 500 }
    );
  }
};
