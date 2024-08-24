"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

// Validation schema
const formSchema = z.object({
	courses: z
		.array(
			z.object({
				coursename: z.string().min(2, {
					message: "Course name must be at least 2 characters.",
				}),
				building: z.string().min(2, {
					message: "Building name must be at least 2 characters.",
				}),
				time: z.string().min(2, {
					message: "Time must be at least 2 characters.",
				}),
			})
		)
		.length(5), // Expect exactly 5 courses
});

type FormData = z.infer<typeof formSchema>;

function FormComponent() {
	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const { toast } = useToast();

	const params = useParams<{ day: string }>();

	// Initialize the form
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			courses: Array(5).fill({ coursename: "", building: "", time: "" }),
		},
	});

	const handleSendMessage: SubmitHandler<FormData> = async (data) => {
		setIsSendingMessage(true);

		try {
			// Use the day from params in the request
			await axios.post("/api/save-courses", {
				...data,
				day: params.day,
			});

			// Reset form fields
			form.reset();

			toast({
				title: "Success!",
				description: "Course details have been saved.",
			});
		} catch (error) {
			console.error("Error in saving course details", error);
			const axiosError = error as AxiosError;

			// toast({
			// 	title: "Error",
			// 	description:
			// 		axiosError.response?.data.message ??
			// 		"There was a problem saving your course details. Please try again.",
			// 	variant: "destructive",
			// });

			setIsSendingMessage(false);
		}
	};

	const { fields } = useFieldArray({
		name: "courses",
		control: form.control,
	});

	return (
		<main className="flex flex-col items-center space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSendMessage)}>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{fields.map((field, index) => (
							<div
								key={field.id}
								className="space-y-4 border p-4 rounded-md"
							>
								<h2 className="text-lg font-semibold">
									Course {index + 1}
								</h2>
								<FormField
									control={form.control}
									name={`courses.${index}.coursename`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Course Name</FormLabel>
											<FormControl>
												<Input
													placeholder="CMPUT 201"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Enter the name of your course.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`courses.${index}.building`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Building</FormLabel>
											<FormControl>
												<Input
													placeholder="DICE"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Enter the building where the
												class is located.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`courses.${index}.time`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Time</FormLabel>
											<FormControl>
												<Input
													placeholder="1:00 PM"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Enter the time of the class.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}
					</div>
					<div className="flex items-center justify-center my-10">
						<Button type="submit" disabled={isSendingMessage}>
							{isSendingMessage
								? "Saving..."
								: "Submit All Courses"}
						</Button>
					</div>
				</form>
			</Form>
		</main>
	);
}

export default FormComponent;
