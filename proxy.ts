import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecret"
);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  
  const protectedRoutes = [
    "/upload",
    "/explore",
    "/dashboard",
    "/admin",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // allow public routes
  if (!isProtected) {
    return NextResponse.next();
  }

  
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    
    if (
      pathname.startsWith("/admin") &&
      payload.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: [
    "/upload",
    "/upload/:path*",

    "/explore",
    "/explore/:path*",

    "/dashboard",
    "/dashboard/:path*",

    "/admin",
    "/admin/:path*",
  ],
};