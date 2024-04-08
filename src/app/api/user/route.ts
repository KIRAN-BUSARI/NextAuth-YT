import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET() {
  const user = await User.findOne({ email: "kiran@gmail.com" });
  console.log(user);
  const username = user.username;
  return NextResponse.json({ message: "Hello, Next.js!", username });
}
