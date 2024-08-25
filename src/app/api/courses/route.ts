import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const { courses, day } = await req.json();

    console.log("courses::: ", courses);

    // Validate the incoming data
    if (!courses || !day) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const createNewCourse = await Promise.all(
      courses.map((course: any) =>
        db.course.create({
          data: {
            name: course.name,
            startTime: course.startTime,
            endTime: course.endTime,
            location: course.location,
            day: day,
            userId: userId,
          },
        })
      )
    );

    return NextResponse.json(createNewCourse, { status: 200 });
  } catch (error) {
    console.error("POST, NEW COURSE ERROR:", error);
    return new NextResponse("POST, NEW COURSE ERROR", { status: 500 });
  }
}
