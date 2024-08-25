import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

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

	const handleDelete = async (courseId: string) => {
		try {
			await axios.delete(`/api/delete-course`, {
				params: { courseId: courseId },
			});
			setCourseList(
				courseList.filter((course) => course.id !== courseId)
			);
		} catch (error) {
			console.error("Error deleting course:", error);
		}
	};

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
						<li
							key={course.id}
							className="border p-4 rounded-md relative"
						>
							<h3 className="font-semibold">{course.name}</h3>
							<p>
								Time: {course.startTime} - {course.endTime}
							</p>
							<p>Location: {course.location}</p>
							<button
								className="absolute top-1/2 right-2 transform -translate-y-1/2"
								onClick={() => handleDelete(course.id)}
							>
								<X />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default CourseList;
