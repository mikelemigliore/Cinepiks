import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export const POST = async (request: any) => {
  const { email } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email does not exist", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 3600000; // 1 hour

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;

  const resetUrl = `https://cinepiks.com/resetpassword/${resetToken}`;

  try {
    // 1) Save token & expiry
    await existingUser.save();

    // 2) Send email with Resend
    //const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from: "Cinepiks <no-reply@cinepiks.com>",
      to: email,
      subject: "Reset Your Cinepiks Password",
      html: `
        <p>Hi,</p>
        <p>You requested to reset your Cinepiks password.</p>
        <p>Click the link below to reset it:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      // clear token if sending fails
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return new NextResponse("Failed sending email. Try again", {
        status: 400,
      });
    }

    return new NextResponse("Email is sent for resetting password", {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error during password reset:", error);

    // if something went wrong after setting the token
    existingUser.resetToken = undefined;
    existingUser.resetTokenExpiry = undefined;
    await existingUser.save();

    return new NextResponse("Failed sending email. Try again", {
      status: 500,
    });
  }
};