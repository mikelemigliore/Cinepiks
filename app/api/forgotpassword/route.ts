import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

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

  const passwordResetExpires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `https://cinepiks.com/resetpassword/${resetToken}`;

  //const body = ` Reset your password by clicking on the link below:` + resetUrl;

  const msg = {
    to: email,
    from: "mikelemigliore@hotmail.com",
    subject: "Reset Password",
    templateId: "d-244504fe4d9842f3bb4860ccb2755001",
    dynamicTemplateData: {
      resetUrl,
    },
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  sgMail
    .send(msg)
    .then(() => {
      return new NextResponse("Reset password email is sent", { status: 200 });
    })
    .catch(async (error) => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return new NextResponse("Failed sending email. Try again", {
        status: 400,
      });
    });

  try {
    await existingUser.save();
    return new NextResponse("Email is sent for restting passord", {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
