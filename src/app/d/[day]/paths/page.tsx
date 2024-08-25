"use client";
import { useEffect, useState } from "react";
import {
	APIProvider,
	Map,
	useMapsLibrary,
	useMap,
} from "@vis.gl/react-google-maps";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import axios from "axios";

interface Course {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
	location: string;
}

export default function Paths() {
	const position = { lat: 53.5232, lng: -113.5263 };

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<Map
					defaultCenter={position}
					defaultZoom={17}
					fullscreenControl={false}
				>
					<Directions />
				</Map>
			</APIProvider>
		</div>
	);
}

function Directions() {
	const map = useMap();
	const routesLibrary = useMapsLibrary("routes");
	const [directionsService, setDirectionsService] =
		useState<google.maps.DirectionsService>();
	const [directionsRenderer, setDirectionsRenderer] =
		useState<google.maps.DirectionsRenderer>();
	const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
	const [routeIndex, setRouteIndex] = useState(0);
	const [courseList, setCourseList] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	const pathname = usePathname();
	const currentDay = pathname.split("/")[2];

	useEffect(() => {
		if (!routesLibrary || !map) return;
		setDirectionsService(new routesLibrary.DirectionsService());
		setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
	}, [routesLibrary, map]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get("/api/course-list", {
					params: { day: currentDay },
				});
				const sortedCourses = response.data.sort(
					(a: Course, b: Course) =>
						a.startTime.localeCompare(b.startTime)
				);
				setCourseList(sortedCourses);
			} catch (err) {
				console.error("Failed to load courses:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, [currentDay]);

	useEffect(() => {
		if (!directionsService || !directionsRenderer || courseList.length < 2)
			return;

		const geocodeLocation = async (location: string) => {
			const geocoder = new google.maps.Geocoder();
			return new Promise((resolve, reject) => {
				geocoder.geocode(
					{ address: location + " UAlberta" },
					(results, status) => {
						if (status === "OK" && results && results.length > 0) {
							resolve(results[0].geometry.location);
						} else {
							reject(`Geocode failed for location: ${location}`);
						}
					}
				);
			});
		};

		const getDirections = async () => {
			try {
				const origin = await geocodeLocation(courseList[0].location);
				const destination = await geocodeLocation(
					courseList[courseList.length - 1].location
				);
				const waypoints = await Promise.all(
					courseList
						.slice(1, -1)
						.map((course) => geocodeLocation(course.location))
				);

				directionsService
					.route({
						origin: origin as google.maps.LatLng,
						destination: destination as google.maps.LatLng,
						waypoints: waypoints.map((location) => ({
							location: location as google.maps.LatLng,
							stopover: true,
						})),
						travelMode: google.maps.TravelMode.WALKING,
						optimizeWaypoints: true,
					})
					.then((response) => {
						directionsRenderer.setDirections(response);
						setRoutes(response.routes);
					})
					.catch((error) => {
						console.error("Error fetching directions:", error);
					});
			} catch (error) {
				console.error(error);
			}
		};

		getDirections();
	}, [directionsService, directionsRenderer, courseList]);

	const selected = routes[routeIndex];
	const leg = selected?.legs[0];

	if (loading) return <div>Loading...</div>;
	if (!leg) return null;

	return (
		<div style={{ position: "absolute", top: "10px", right: "10px" }}>
			<Drawer>
				<DrawerTrigger>
					<Button>Trip Details</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>
							Your Course Route for {currentDay}
						</DrawerTitle>
						{selected.legs.map((leg, index) => (
							<DrawerDescription key={index}>
								<p>
									<span className="font-bold">
										{courseList[index].name} to{" "}
										{courseList[index + 1]?.name || "End"}
									</span>
								</p>
								<p>
									From:{" "}
									{leg.start_address
										.split(",")
										.slice(0, 2)
										.join(", ")}
								</p>
								<p>
									To:{" "}
									{leg.end_address
										.split(",")
										.slice(0, 2)
										.join(", ")}
								</p>
								<p>
									<span className="font-bold">Distance:</span>{" "}
									{leg.distance?.text}
								</p>
								<p>
									<span className="font-bold">Duration:</span>{" "}
									{leg.duration?.text}
								</p>
							</DrawerDescription>
						))}
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose>
							<Button variant="secondary">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
