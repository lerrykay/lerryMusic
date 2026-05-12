import { SignJWT, jwtVerify } from "jose";


export type TokenPayload = {
  id: string;
  email: string;
  role: "user" | "admin";
};



const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const secret = new TextEncoder().encode(JWT_SECRET);



export function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}



export async function verifyToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload as TokenPayload;
  } catch (error) {
    console.log("JWT VERIFY ERROR:", error);
    return null;
  }
}