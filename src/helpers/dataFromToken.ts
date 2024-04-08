import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const data: any  = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    );
    return data.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
