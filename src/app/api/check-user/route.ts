import { NextResponse, NextRequest } from "next/server";
import { usernameQuerySchema } from "@/src/schemas/configSchema";
import { ConnectDataBase } from "@/src/lib/connection";
import UserModel from "@/src/models/User";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = {
    name: searchParams.get("name"),
  };

  await ConnectDataBase();
  try {
    const validate = await usernameQuerySchema.validate(query, {
      abortEarly: false,
    });
    if (!validate.name) {
      return NextResponse.json(
        {
          succss: false,
          message: "query is not valid",
        },
        { status: 500 }
      );
    }

    const { name } = validate;

    const searchExistingUser = await UserModel.findOne({
      name,
    });
    if (!searchExistingUser) {
      return NextResponse.json(
        {
          succss: false,
          available: false,
          message: "user not found",
        },
        { status: 200 }
      );
    }
    if (!searchExistingUser?.isAcceptingMessages) {
      return NextResponse.json(
        {
          available: true,
          user: {
            id: searchExistingUser._id,
            name: searchExistingUser.name,
          },
          success: true,
          message: "user does not accept messages",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        available: true,
        user: {
          id: searchExistingUser._id,
          name: searchExistingUser.name,
        },
        succss: true,
        message: "user founded",
        searchExistingUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        succss: false,
        message: "failed to search user",
      },
      { status: 500 }
    );
  }
}
