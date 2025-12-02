import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/src/models/User";
import { Message } from "@/src/models/User";
import { ConnectDataBase } from "@/src/lib/connection";
import { auth } from "@/auth";
import dayjs from "dayjs";

export async function POST(request: NextRequest) {
  await ConnectDataBase();
  const session = await auth();
  if (!session || !session.user || !session.user.name) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication required",
      },
      { status: 401 }
    );
  }
  const { to, content } = await request.json();
  const from = session.user.name;

  try {
    console.log({ from, to, content });
    const user = await UserModel.findOne({ name: to });
    if (!user) {
      return NextResponse.json(
        {
          succss: false,
          message: "user not found",
        },
        { status: 400 }
      );
    }
    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        {
          succss: false,
          message: "user is not accepting messages",
        },
        { status: 401 }
      );
    }
    const currentTime = new Date();

    const sendMessageToExistingUser = {
      from,
      to,
      content: content,
      createdAt: currentTime,
    };
    user.messages.push(sendMessageToExistingUser as Message);
    await user.save();
    return NextResponse.json(
      {
        succss: true,
        message: "message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        succss: false,
        message: "failed in send message",
      },
      { status: 500 }
    );
  }
}
