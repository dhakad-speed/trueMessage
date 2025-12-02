import { auth } from "@/auth";
import UserModel from "@/src/models/User";
import { ConnectDataBase } from "@/src/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import type { User } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  const user = session?.user as User;

  await ConnectDataBase();

  try {
    if (!session || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const { acceptance } = await request.json();
    console.log(acceptance);
    if (typeof acceptance !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payload. Expected boolean.",
        },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { name: user.name },
      { isAcceptingMessages: acceptance },
      { new: true }
    );
    console.log(updatedUser);
    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update message acceptance status",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        user: user?.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update user status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await ConnectDataBase();
  try {
    const session = await auth();
    const user: User = session?.user as User;
    const userName = user.name;
    const foundExistingUser = await UserModel.findOne({ name: userName });
    if (!foundExistingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Message Acceptance update status failed",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        isAcceptingMessage: foundExistingUser?.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update user status", error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
