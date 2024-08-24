"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Menubar() {
	const pathname = usePathname();
	const currentDay = pathname.split("/")[2];

	return (
		<nav className="flex items-center justify-center space-x-4 p-4 w-full border-b">
			{daysOfWeek.map((day) => (
				<Link
					key={day}
					href={`/d/${day}`}
					className={`px-3 py-2 rounded-xl text-sm font-medium ${
						currentDay === day
							? "bg-gray-950 text-white"
							: "text-gray-800"
					}`}
				>
					{day}
				</Link>
			))}
		</nav>
	);
}

export default Menubar;
