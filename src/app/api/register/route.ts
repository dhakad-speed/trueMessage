import { ConnectDataBase } from "@/src/lib/connection";
import UserModel from "@/src/models/User";
import { encryptPassword } from "@/src/lib/secure";
import { SendVerificationEmail } from "@/src/helpers/SendVerification";
import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  await ConnectDataBase();
  try {
    const { name, email, password } = await request.json();
    console.log(name);

    const existingUserVerifiedByUsername = await UserModel.findOne({
      name: name,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return NextResponse.json({
        success: false,
        message: "username is already taken",
      });
    }
    const otp = Math.floor(100000 * Math.random() + 900000).toString();
    const existingUserByEmail = await UserModel.findOne({
      email,
    });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json({
          success: false,
          message: "user with this email already exist",
        });
      } else {
        const securePassword = await encryptPassword({ password });
        existingUserByEmail.password = securePassword;
        existingUserByEmail.verifyCode = otp;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const securePassword = await encryptPassword({ password });
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const registerNewUser = new UserModel({
        name: name,
        email,
        password: securePassword,
        verifyCode: otp,
        verifyCodeExpiry: expiryDate,
      });
      await registerNewUser.save();
    }

    const sendVerification = await SendVerificationEmail({
      username: name,
      email,
      verifyCode: otp,
    });
    if (!sendVerification.success) {
      console.log("verification email failed");
      return NextResponse.json(
        {
          success: true,
          message: sendVerification.message,
        },
        { status: 500 }
      );
    }
    // (await cookies()).set("registration_started", "true", {
    //   httpOnly: true,
    //   path: "/",
    // });
    return NextResponse.json(
      {
        success: true,
        message: "registered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "failed in register ",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  await ConnectDataBase();
  try {
    const users = await UserModel.find();
    if (!users) {
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}
