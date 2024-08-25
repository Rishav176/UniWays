import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const url = new URL(req.url);
    const day = url.searchParams.get("day");

    if (!day) {
      return new NextResponse("Invalid day parameter", { status: 400 });
    }

    const courseList = await db.course.findMany({
      where: {
        userId: userId,
        day: day || undefined,
      },
      orderBy: {
        startTime: "asc",
      },
    });
    console.log("courseList::: ", courseList);
    return NextResponse.json(courseList, { status: 200 });
  } catch (error) {
    console.error("GET, COURSE LIST ERROR:", error);
    return new NextResponse("GET, COURSE LIST ERROR", { status: 500 });
  }
}
