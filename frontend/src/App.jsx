import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customIconUrl from "./icons/marker-icon.png";
import { findNearestRoutes, findPointsInViewport } from "./requests";
import Point from "./models/Point";

const customIcon = L.icon({
	iconUrl: customIconUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

const defaultPosition = [43.53, 16.49];

const MapEventHandler = ({ onClick, onMove }) => {
	const map = useMapEvents({
		click: onClick,
		moveend: () => onMove(map),
	});
	return <React.Fragment />;
};

function App() {
	const [position, setPosition] = useState(defaultPosition);
	const [points, setPoints] = useState([]);
	const [nearestRoutePoints, setNearestRoutePoints] = useState([]);
	//
	const loadPoints = useCallback((viewport) => {
		findPointsInViewport(viewport)
			.then((data) => setPoints(data.map(Point.create)))
			.catch((error) => console.error(`Could not load points in Viewport! Error: ${error}`));
	}, []);
	//
	useEffect(() => {
		loadPoints({
			lng1: defaultPosition[1] - 0.05,
			lat1: defaultPosition[0] - 0.1,
			lng2: defaultPosition[1] + 0.05,
			lat2: defaultPosition[0] + 0.1,
		});
	}, [loadPoints]);
	//
	const onMapClick = useCallback((e) => {
		setPosition([e.latlng.lat, e.latlng.lng]);
		findNearestRoutes({
			lng: e.latlng.lng,
			lat: e.latlng.lat,
		})
			.then((route) => {
				if (route !== undefined) {
					setNearestRoutePoints(route.points.map((p) => p.id));
				}
			})
			.catch((error) => console.error(`Could not load nearest route! Error: ${error}`));
	}, []);
	//
	const onMapMove = useCallback(
		(map) => {
			const bounds = map.getBounds();
			const northWest = bounds.getNorthWest();
			const southEast = bounds.getSouthEast();

			loadPoints({
				lng1: northWest.lng,
				lat1: northWest.lat,
				lng2: southEast.lng,
				lat2: southEast.lat,
			});
		},
		[loadPoints]
	);
	//
	return (
		<MapContainer center={defaultPosition} zoom={16} style={{ height: window.innerHeight, width: "100%" }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker icon={customIcon} position={position} />
			<MapEventHandler onClick={onMapClick} onMove={onMapMove} />
			{points.map((point) => (
        // Using Math.random as key because the library has a bug and won't properly rerender
				<Polygon key={`${Math.random()}`} positions={point.region} color={nearestRoutePoints.includes(point.id) ? "red" : "blue"} />
			))}
		</MapContainer>
	);
}

export default App;
