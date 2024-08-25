// import React, { useEffect, useState } from "react";
// import { redirect, usePathname } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { useAuth } from "@clerk/nextjs";
// import axios from "axios";

// interface Course {
// 	id: string;
// 	name: string;
// 	startTime: string;
// 	endTime: string;
// 	location: string;
// }

// function CourseList({ currentDay }: { currentDay: string }) {
// 	// const [courses, setCourses] = useState<Course[]>([]);
// 	// const pathname = usePathname();
// 	// const currentDay = pathname.split("/")[2];

// 	const { userId } = useAuth();

// 	// useEffect(() => {
// 	// 	const fetchCourses = async () => {
// 	// 		try {
// 	// 			const response = await fetch("/api/courses", {
// 	// 				method: "GET",
// 	// 			});
// 	// 			if (response.ok) {
// 	// 				const data = await response.json();
// 	// 				setCourses(
// 	// 					data.filter(
// 	// 						(course: Course & { day: string }) =>
// 	// 							course.day === currentDay
// 	// 					)
// 	// 				);
// 	// 			}
// 	// 		} catch (error) {
// 	// 			console.error("Error fetching courses:", error);
// 	// 		}
// 	// 	};

// 	// 	fetchCourses();
// 	// }, [currentDay]);

// 	if (!userId) {
// 		console.log("User not found");
// 		redirect("/");
// 	}

// 	// const courseList = await db.course.findMany({
// 	// 	where: {
// 	// 		userId: userId,
// 	// 	},
// 	// 	orderBy: {
// 	// 		startTime: "asc",
// 	// 	},
// 	// });

// 	const response = await axios.get("/api/courses");
// 	const courseList = response.data;

// 	console.log("course list", courseList);

// 	return (
// 		<div className="mt-8">
// 			<h2 className="text-xl font-semibold mb-4">
// 				Your Courses for {currentDay}
// 			</h2>
// 			{courseList.length === 0 ? (
// 				<p>No course added for this day yet.</p>
// 			) : (
// 				<ul className="space-y-4">
// 					{courseList.map((course) => (
// 						<li key={course.id} className="border p-4 rounded-md">
// 							<h3 className="font-semibold">{course.name}</h3>
// 							<p>
// 								Time: {course.startTime} - {course.endTime}
// 							</p>
// 							<p>Location: {course.location}</p>
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// }

// export default CourseList;

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Course {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
	location: string;
}

function CourseList({ currentDay }: { currentDay: string }) {
	const [courseList, setCourseList] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get("/api/course-list", {
					params: { day: currentDay },
				});
				setCourseList(response.data);
			} catch (err) {
				setError("Failed to load courses");
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, [currentDay]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className="mt-8">
			<h2 className="text-xl font-semibold mb-4">
				Your Courses for {currentDay}
			</h2>
			{courseList.length === 0 ? (
				<p>No course added for this day yet.</p>
			) : (
				<ul className="space-y-4">
					{courseList.map((course) => (
						<li key={course.id} className="border p-4 rounded-md">
							<h3 className="font-semibold">{course.name}</h3>
							<p>
								Time: {course.startTime} - {course.endTime}
							</p>
							<p>Location: {course.location}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default CourseList;
