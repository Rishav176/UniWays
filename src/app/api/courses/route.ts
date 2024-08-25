import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("Method received:", req.method); // Debugging line

	const { userId } = getAuth(req);

	if (!userId) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	if (req.method === "POST") {
		try {
			const { courses, day } = req.body;

			const user = await prisma.user.upsert({
				where: { clerkId: userId },
				update: {},
				create: { clerkId: userId },
			});

			const createdCourses = await prisma.$transaction(
				courses.map((course: any) =>
					prisma.course.create({
						data: {
							day,
							name: course.name,
							startTime: course.startTime,
							endTime: course.endTime,
							location: course.location,
							userId: user.id,
						},
					})
				)
			);

			res.status(201).json(createdCourses);
		} catch (error) {
			console.error("Error creating courses:", error);
			res.status(500).json({ error: "Error creating courses" });
		}
	} else if (req.method === "GET") {
		try {
			const user = await prisma.user.findUnique({
				where: { clerkId: userId },
				include: { courses: true },
			});

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			res.status(200).json(user.courses);
		} catch (error) {
			console.error("Error fetching courses:", error);
			res.status(500).json({ error: "Error fetching courses" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
