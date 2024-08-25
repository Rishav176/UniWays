"use client";

import React from "react";
import Menubar from "@/components/Menubar";
import FormComponent from "@/components/FormComponent";
import CourseList from "@/components/CourseList";
import { usePathname } from "next/navigation";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function DayPage() {
	const pathname = usePathname();
	const currentDay = pathname.split("/")[2];

	if (daysOfWeek.includes(currentDay)) {
		return (
			<div className="">
				<div className="flex items-center justify-center w-full">
					<Menubar />
				</div>
				<div className="flex flex-col items-center justify-center min-h-screen font-semibold text-lg p-10">
					<h1 className="text-xl font-bold p-6">
						Enter Course Details for {currentDay}
					</h1>
					<div className="w-full max-w-5xl">
						<FormComponent currentDay={currentDay} />
						<CourseList currentDay={currentDay} />
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="flex items-center justify-center h-screen font-semibold text-lg">
				Oh no! Invalid day selected 😔.
			</div>
		);
	}
}

export default DayPage;
