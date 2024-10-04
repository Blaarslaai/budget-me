import { NextRequest, NextResponse } from "next/server";
import { refreshUserCookie, updateUser } from "../serverFunction";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData(); // Parse the JSON body
    // console.log(body);

    const blob = new Blob([body.get("photo") as File], {
      type: (body.get("photo") as File).type,
    });

    const update = {
      name: body.get("name") as string,
      email: body.get("email") as string,
      photo: blob,
    };

    console.log(update);

    await updateUser(update);

    // Return a success response
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    // Return an error response
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
