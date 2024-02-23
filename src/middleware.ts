import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/register" || path === "/verifyToken" || path === "/forgot-password";
    const token = request.cookies.get("token")?.value || "";
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: ["/", "/alert", "/map", "/anynomous-chat", "/login", "/register", "/profile", "/edit-profile", "/verifyToken", "/forgot-password"],
};
