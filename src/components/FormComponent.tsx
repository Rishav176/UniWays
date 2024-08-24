"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
	coursename: z.string().min(2, {
		message: "Course name must be at least 2 characters.",
	}),
	building: z.string().min(2, {
		message: "Building name must be at least 2 characters.",
	}),
	time: z.string().min(2, {
		message: "Time must be at least 2 characters.",
	}),
});

function FormComponent() {
	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const { toast } = useToast();

	const params = useParams<{ day: string }>();

	// Initialize the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coursename: "",
			building: "",
			time: "",
		},
	});

	// Handle form submission
	const handleSendMessage = async (data: z.infer<typeof formSchema>) => {
		setIsSendingMessage(true);

		try {
			// Use the day from params in the request
			const response = await axios.post("/api/save-course", {
				...data,
				day: params.day,
			});

			// Reset form fields
			form.reset();

			setIsSendingMessage(false);

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

	return (
		<main className="flex items-center justify-between">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSendMessage)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="coursename"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Course Name</FormLabel>
								<FormControl>
									<Input placeholder="CMPUT 201" {...field} />
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
						name="building"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Building</FormLabel>
								<FormControl>
									<Input placeholder="DICE" {...field} />
								</FormControl>
								<FormDescription>
									Enter the building where the class is
									located.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Input placeholder="1:00 PM" {...field} />
								</FormControl>
								<FormDescription>
									Enter the time of the class.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isSendingMessage}>
						{isSendingMessage ? "Saving..." : "Submit"}
					</Button>
				</form>
			</Form>
		</main>
	);
}

export default FormComponent;
