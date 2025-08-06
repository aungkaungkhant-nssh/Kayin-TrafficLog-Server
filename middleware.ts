// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    console.log("AUTH_SECRET:", process.env.AUTH_SECRET);
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });
    console.log("URL:", request.url);
    console.log("Cookies:", JSON.stringify(request.cookies));
    console.log("Token:", token);
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // protect this route
};