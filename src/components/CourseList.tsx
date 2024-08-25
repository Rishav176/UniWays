"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Course {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
	location: string;
}

function CourseList() {
	const [courses, setCourses] = useState<Course[]>([]);
	const pathname = usePathname();
	const currentDay = pathname.split("/")[2];

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch("/api/courses", {
					method: "GET",
				});
				if (response.ok) {
					const data = await response.json();
					setCourses(
						data.filter(
							(course: Course & { day: string }) =>
								course.day === currentDay
						)
					);
				}
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};

		fetchCourses();
	}, [currentDay]);

	return (
		<div className="mt-8">
			<h2 className="text-xl font-semibold mb-4">
				Your Courses for {currentDay}
			</h2>
			{courses.length === 0 ? (
				<p>No courses added for this day yet.</p>
			) : (
				<ul className="space-y-4">
					{courses.map((course) => (
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
