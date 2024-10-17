import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/filmes-series"];

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;
	const { pathname } = req.nextUrl;

	if (protectedRoutes.some((route) => pathname.startsWith(route))) {
		if (!token) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
	}

	if (token && (pathname === "/login" || pathname === "/signup")) {
		return NextResponse.redirect(new URL("/filmes-series", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/filmes-series/:path*", "/login", "/signup"],
};
