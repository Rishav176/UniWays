"use client";
import { useEffect, useState } from "react";
import {
	APIProvider,
	Map,
	useMapsLibrary,
	useMap,
} from "@vis.gl/react-google-maps";

export default function Paths() {
	const position = { lat: 37.7749, lng: -122.4194 };

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<Map
					center={position}
					zoom={9}
					//mapId={process.env.NEXT_PUBLIC_MAP_ID}
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

	return null;
}
