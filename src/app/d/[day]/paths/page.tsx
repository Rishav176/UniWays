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

export default function Paths() {
  const position = { lat: 53.5232, lng: -113.5263 };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={position}
          defaultZoom={17}
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
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();

  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: "DICE Ualberta",
        destination: "Tory Building",
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: [
          {
            location: "CCIS Ualberta",
            stopover: true,
          },
          {
            location: "ETLC Ualberta",
            stopover: true,
          },
        ],
        // provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);

  console.log(selected);

  if (!leg) return null;
  console.log(leg);
  return (
    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      <Drawer>
        <DrawerTrigger>
          <Button>Trip Via: {selected.summary}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selected.summary}</DrawerTitle>
            {selected.legs.map((leg, index) => (
              <DrawerDescription key={index}>
                <p>
                  <span className="font-bold">
                    Class {index + 1} to Class {index + 2} (Point{" "}
                    {String.fromCharCode(65 + index)}-
                    {String.fromCharCode(65 + index + 1)})
                  </span>
                  : {leg.start_address.split(",").slice(0, 2).join(", ")} to{" "}
                  {leg.end_address.split(",").slice(0, 2).join(", ")}
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
