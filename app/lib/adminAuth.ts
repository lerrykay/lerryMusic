import { jwtVerify } from "jose";
import { dbConnect } from "./dbConnect";
import User from "../models/user";


export async function verifyAdmin(req: Request) {
  // Get token from cookie
  const cookie = req.headers.get("cookie");
  const token = cookie?.split("token=")[1]?.split(";")[0];

  if (!token) {
    throw new Error("No token");
  }

  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload }: any = await jwtVerify(token, secret);

  
  await dbConnect();
  const user = await User.findById(payload.id);

  if (!user) {
    throw new Error("User not found");
  };

  
  if (user.role !== "admin") {
    throw new Error("Not authorized");
  }

  return user;
}