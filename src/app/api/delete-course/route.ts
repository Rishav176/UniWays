import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("User Not Authenticated", { status: 401 });
		}
		const url = new URL(req.url);
		const courseId = url.searchParams.get("courseId");

		if (!courseId) {
			return new NextResponse("Invalid courseId parameter", {
				status: 400,
			});
		}

		const course = await db.course.findFirst({
			where: {
				id: courseId,
				userId: userId,
			},
		});

		if (!course) {
			return new NextResponse("Course not found", { status: 404 });
		}

		await db.course.delete({
			where: {
				id: courseId,
			},
		});

		return new NextResponse("Course deleted", { status: 200 });
	} catch (error) {
		console.error("Error deleting course:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
