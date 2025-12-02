import { ConnectDataBase } from "@/src/lib/connection";
import UserModel from "@/src/models/User";
import { User } from "next-auth";
import { auth } from "@/auth";
export async function GET(request: Request) {
  await ConnectDataBase();

  try {
    const session = await auth();
    const user: User = session?.user as User;

    if (!session || !user) {
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    const sessionUsername = session?.user?.name;
    console.log(sessionUsername);
    const existingUser = await UserModel.aggregate([
      { $match: { name: session.user?.name } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$name", messages: { $push: "$messages" } } },
    ]);

    if (!existingUser || existingUser.length === 0) {
      return Response.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: existingUser[0]?.messages },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return Response.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
