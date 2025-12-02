import { NextRequest, NextResponse } from "next/server";
import { ConnectDataBase } from "@/src/lib/connection";
import UserModel from "@/src/models/User";
// import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  // (await cookies()).delete("registration_started");
  const { name, verifyCode } = await request.json();

  const decodeUsername = decodeURIComponent(name);
  await ConnectDataBase();
  try {
    const user = await UserModel.findOne({ name: decodeUsername });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 }
      );
    }
    const isVerifyCodeValid = user.verifyCode === verifyCode;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (!isVerifyCodeValid) {
      return NextResponse.json(
        {
          success: false,
          message: "the code you have entered is incorrect",
        },
        { status: 401 }
      );
    }
    if (!isCodeNotExpired) {
      return NextResponse.json(
        {
          success: false,
          message: "verify code is expired",
        },
        {
          status: 405,
        }
      );
    }
    if (isCodeNotExpired && isVerifyCodeValid) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json(
        {
          success: true,
          message: "user verified successfully",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "failed in checking verify-code",
      },
      { status: 500 }
    );
  }
}
