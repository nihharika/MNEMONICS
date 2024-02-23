"use client";
// Import necessary libraries/components
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
    const aecCoordinates = { lat: 26.1427, lng: 91.6597 };
    const [center, setCenter] = useState(aecCoordinates);
    const [loading, setLoading] = useState(true);

    const getDistanceBetweenPoints = (point1: any, point2: any) => {
        const lat1 = point1.lat;
        const lon1 = point1.lng;
        const lat2 = point2.lat;
        const lon2 = point2.lng;

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    };

    const campusBounds = {
        north: aecCoordinates.lat + 0.072, // 8km radius approximation
        south: aecCoordinates.lat - 0.072,
        east: aecCoordinates.lng + 0.072,
        west: aecCoordinates.lng - 0.072,
    };

    const getCurrentLocation = () => {
        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Check if the user's location is within the 8km radius around AEC
                const distance = getDistanceBetweenPoints(userLocation, aecCoordinates);
                if (distance <= 8) {
                    setCenter(userLocation);
                } else {
                    // If the user is outside the radius, default to the center of AEC
                    setCenter(aecCoordinates);
                }

                setLoading(false);
            },
            (error) => {
                console.error("Error getting location:", error);
                setLoading(false);

                // Handle errors and set default center to the center of AEC
                setCenter(aecCoordinates);
            },
        );
    };

    useEffect(() => {
        console.log("The Google Maps function ran");
        getCurrentLocation();
    }, []);

    const loadScriptCallback = () => {
        return (
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
                <GoogleMap
                    center={center}
                    zoom={19} // Adjust the zoom level as needed
                    mapContainerStyle={{ width: "100%", height: "360px", borderRadius: "1rem" }}
                    options={{
                        restriction: {
                            latLngBounds: campusBounds,
                            strictBounds: false,
                        },
                    }}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        );
    };

    return (
        <div className="rounded-lg">
            {loading ? (
                <div className="flex justify-center flex-col h-[400px] items-center">
                    <MoonLoader color="black" />
                    <h1>Loading.....</h1>
                </div>
            ) : (
                <>{loadScriptCallback()}</>
            )}
        </div>
    );
};

export default MapComponent;
