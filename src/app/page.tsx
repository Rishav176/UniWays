import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	MapPin,
	Clock,
	Bell,
	ArrowRight,
	Coffee,
	Book,
	Laptop,
	RouteIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"] });

export default function Component() {
	return (
		<div
			className={`flex flex-col min-h-screen px-4 bg-black text-green-400 ${syne.className}`}
		>
			<header className="px-4 lg:px-6 h-16 flex items-center border-b border-green-800">
				<Link className="flex items-center justify-center" href="#">
					{/* <MapPin className="h-6 w-6 text-green-500" /> */}
					<RouteIcon />
					<span className="ml-2 text-2xl font-bold text-green-500">
						UniWays
					</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-lg font-medium hover:text-green-300 transition-colors"
						href="/sign-in"
					>
						Sign In
					</Link>
					<Link
						className="text-lg font-medium hover:text-green-300 transition-colors"
						href="/sign-up"
					>
						Sign Up
					</Link>
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 border-b border-green-800">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-400">
									Navigate Your Campus Like a Pro
								</h1>
								<p className="mx-auto max-w-[700px] text-green-300 md:text-xl lg:text-2xl">
									UniWays: Your high-tech companion for
									optimal campus navigation and time
									management.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 border-b border-green-800">
					<div className="container px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-green-400">
							Cutting-Edge Features
						</h2>
						<div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
							<div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-green-900 bg-opacity-20 hover:bg-opacity-30 transition-colors">
								<MapPin className="h-12 w-12 text-green-500" />
								<h3 className="text-xl font-bold text-green-400">
									Smart Routing
								</h3>
								<p className="text-green-300 text-base text-center">
									AI-powered pathfinding for the quickest
									routes between classes.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-green-900 bg-opacity-20 hover:bg-opacity-30 transition-colors">
								<Clock className="h-12 w-12 text-green-500" />
								<h3 className="text-xl font-bold text-green-400">
									Time Optimization
								</h3>
								<p className="text-green-300 text-base text-center">
									Advanced scheduling algorithms to maximize
									your productivity.
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-green-900 bg-opacity-20 hover:bg-opacity-30 transition-colors">
								<Bell className="h-12 w-12 text-green-500" />
								<h3 className="text-xl font-bold text-green-400">
									Smart Notifications
								</h3>
								<p className="text-green-300 text-base text-center">
									Contextual alerts to keep you on track and
									never miss a class.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 border-b border-green-800">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<Image
								src="/placeholder.svg?height=400&width=600"
								width={600}
								height={400}
								alt="UniWays app interface"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
							/>
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-400">
										Revolutionize Your Campus Experience
									</h2>
									<p className="max-w-[600px] text-green-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
										UniWays leverages cutting-edge
										technology to adapt to your unique
										schedule and campus layout. Experience
										the future of student life management.
									</p>
								</div>
								<ul className="grid gap-2 py-4">
									<li className="flex items-center gap-2 text-green-300">
										<Coffee className="h-5 w-5 text-green-500" />{" "}
										Optimize breaks between classes
									</li>
									<li className="flex items-center gap-2 text-green-300">
										<Book className="h-5 w-5 text-green-500" />{" "}
										Locate prime study locations
									</li>
									<li className="flex items-center gap-2 text-green-300">
										<Laptop className="h-5 w-5 text-green-500" />{" "}
										Seamless integration with digital
										calendars
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-green-900 bg-opacity-20">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-400">
									Ready to Upgrade Your Campus Life?
								</h2>
								<p className="mx-auto max-w-[600px] text-green-300 md:text-xl">
									Join the ranks of tech-savvy students
									optimizing their university experience with
									UniWays.
								</p>
							</div>
							<div className="w-full max-w-sm space-y-2">
								<Link href="/sign-up">
									<Button
										type="submit"
										className="bg-green-600 hover:bg-green-700 text-black"
									>
										Get Access
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-green-800">
				<p className="text-xs text-green-500">
					© 2023 UniWays. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-xs hover:underline underline-offset-4 text-green-500 hover:text-green-400"
						href="#"
					>
						Terms of Service
					</Link>
					<Link
						className="text-xs hover:underline underline-offset-4 text-green-500 hover:text-green-400"
						href="#"
					>
						Privacy Policy
					</Link>
				</nav>
			</footer>
		</div>
	);
}
