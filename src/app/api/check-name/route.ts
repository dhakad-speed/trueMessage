import { usernameQuerySchema } from "@/src/schemas/configSchema";
import { ConnectDataBase } from "@/src/lib/connection";
import UserModel from "@/src/models/User";

import { NextRequest, NextResponse } from "next/server";

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
          success: false,
          message: "query not validated",
        },
        { status: 401 }
      );
    }
    const { name } = validate;

    const existingRegisteredUser = await UserModel.findOne({ name });
    if (existingRegisteredUser) {
      return NextResponse.json(
        {
          success: false,
          message: "username is already Taken",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "username is unique",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("error checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "checking username...",
      },
      { status: 500 }
    );
  }
}
