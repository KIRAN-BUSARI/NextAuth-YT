import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

interface userInterface {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password }: userInterface = body;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Doesn't Exists" },
        { status: 400 }
      );
    }
    // console.log("user Exists", user);

    // console.log(password);
    // console.log(user.password);
    // const correctPassword = await bcryptjs.compare(password, user.password);
    // console.log(correctPassword);

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    // console.log(token);

    user.password = undefined;
    user.token = token;

    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error1: error.message }, { status: 500 });
  }
}
