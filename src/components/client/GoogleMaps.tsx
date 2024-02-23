"use client";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { toast } from "../ui/use-toast";

const MapComponent = () => {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to get the user's current location
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLoading(false); // Set loading to false once location is obtained
                });
            } else {
                toast({
                    title: "Uh oh Something went wrong!",
                    description: "Geolocation is not supported by this browser.",
                });
                console.error("Geolocation is not supported by this browser.");
                setLoading(false); // Set loading to false if geolocation is not supported
            }
        };

        getCurrentLocation();
    }, []);

    return (
        <div className="rounded-lg">
            {loading ? (
                // Show loading spinner while the location is being fetched
                <div className="flex justify-center flex-col h-[400px] items-center">
                    <MoonLoader color="black" />
                    <h1>Loading.....</h1>
                </div>
            ) : (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
                    <GoogleMap center={center} zoom={19} mapContainerStyle={{ width: "100%", height: "360px", borderRadius: "1rem" }}>
                        <Marker position={center} />
                    </GoogleMap>
                </LoadScript>
            )}
        </div>
    );
};

export default MapComponent;
