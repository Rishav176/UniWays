import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/"]);

export default clerkMiddleware((auth, req) => {
	const { userId } = auth();
	const currentUrl = new URL(req.url);

	const isAccessingDashboard = currentUrl.pathname.startsWith("/d/");

	// If the user is logged in and accessing a public route (e.g., sign-in or sign-up), redirect them to the dashboard
	if (userId && isPublicRoute(req) && !isAccessingDashboard) {
		return NextResponse.redirect(new URL("/d/Monday", req.url));
	}

	// If the user is not logged in and trying to access a non-public route, redirect them to sign-in
	if (!userId && !isPublicRoute(req)) {
		return NextResponse.redirect(new URL("/sign-in", req.url));
	}

	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
