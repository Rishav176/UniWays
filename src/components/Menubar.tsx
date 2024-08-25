"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import { auth, clerkClient } from "@clerk/nextjs/server";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Menubar() {
	const pathname = usePathname();
	const currentDay = pathname.split("/")[2];

	const { signOut } = useClerk();

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<nav className="flex p-4 w-full border-b">
			<div className="flex flex-1 items-center justify-center space-x-4">
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
			</div>

			<div className="ml-auto">
				<UserButton
					appearance={{
						elements: {
							footer: "hidden",
						},
					}}
				/>
			</div>
		</nav>
	);
}

export default Menubar;
