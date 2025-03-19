"use client";
import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRouteFromCoordinates } from "@/lib/utils";

interface LatLngTuple {
    lat: number;
    lng: number;
}

interface PackageData {
    trackingNumber: string;
    sender: { fullName: string; email: string; address: string };
    recipient: { fullName: string; email: string; address: string };
    status: "created" | "in-transit" | "delivered";
    currentLocation: LatLngTuple;
    destinationLocation: LatLngTuple;
}

const TrackingPage = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [pkg, setPkg] = useState<PackageData | null>(null);
    const [currentAddress, setCurrentAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
    const mapRef = React.useRef<maplibregl.Map | null>(null);

    // Handle package tracking
    const handleTrack = async () => {
        setLoading(true);
        setShowMap(true);

        try {
            const response = await fetch(`/api/packages?trackingNumber=${trackingNumber}`);
            if (!response.ok) {
                throw new Error("Failed to fetch package details.");
            }

            const data = await response.json();
            console.log({ data })
            if (!data.packages) {
                toast.error("Package not found!");
                return;
            }

            const foundPackage = data.packages;
            console.log({ foundPackage })
            setPkg({
                trackingNumber: foundPackage.trackingNumber,
                sender: {
                    fullName: foundPackage.sender.fullName,
                    address: foundPackage.sender.address,
                    email: foundPackage.sender.email,
                },
                recipient: {
                    fullName: foundPackage.recipient.fullName,
                    address: foundPackage.recipient.address,
                    email: foundPackage.recipient.email
                },
                status: foundPackage.status,
                currentLocation: foundPackage.currentLocation,
                destinationLocation: foundPackage.destinationLocation,
            });

            // Fetch addresses for both current & destination locations
            const currentAddr = await getAddressFromCoordinates(foundPackage.currentLocation.lat, foundPackage.currentLocation.lng);
            setCurrentAddress(currentAddr);

            const destinationAddr = await getAddressFromCoordinates(foundPackage.destinationLocation.lat, foundPackage.destinationLocation.lng);
            setDestinationAddress(destinationAddr);
        } catch (error) {
            console.error("Error tracking package:", error);
            toast.error("Error fetching package details.");
        } finally {
            setLoading(false);
        }
    };

    // Reverse geocoding using Geoapify API
    async function getAddressFromCoordinates(lat: number, lon: number): Promise<string> {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            if (data.features && data.features.length > 0) {
                return data.features[0].properties.formatted ?? "Address not found";
            }

            return "Address not found";
        } catch (error) {
            console.error("Error fetching address:", error);
            return "Error retrieving address";
        }
    }
    
    useEffect(() => {
        if (!showMap || !pkg?.currentLocation || !pkg?.destinationLocation) return;

        if (!mapContainerRef.current) {
            console.error("Map container not available.");
            return;
        }

        console.log("Initializing map...");
        console.log("Current Location:", pkg.currentLocation);
        console.log("Destination Location:", pkg.destinationLocation);

        // Initialize Map
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`,
            center: [pkg.currentLocation.lng, pkg.currentLocation.lat],
            zoom: 2,
        });

        mapRef.current = map; // Store reference to prevent multiple instances

        map.once("load", async () => {
            console.log("Map has loaded successfully.");

            try {
                // Add Blue Marker for Current Location
                new maplibregl.Marker({ color: "blue" })
                    .setLngLat([pkg.currentLocation.lng, pkg.currentLocation.lat])
                    .setPopup(new maplibregl.Popup().setHTML(`Sent From: ${currentAddress}`))
                    .addTo(map);

                // Add Red Marker for Destination
                new maplibregl.Marker({ color: "red" })
                    .setLngLat([pkg.destinationLocation.lng, pkg.destinationLocation.lat])
                    .setPopup(new maplibregl.Popup().setHTML(`Deliver to: ${destinationAddress}`))
                    .addTo(map);

                // Fly to the package location for better visibility
                map.flyTo({
                    center: [pkg.currentLocation.lng, pkg.currentLocation.lat],
                    zoom: 14,
                });

                // Fetch and add route path
                const routeCoordinates = await getRouteFromCoordinates(
                    pkg.currentLocation.lat,
                    pkg.currentLocation.lng,
                    pkg.destinationLocation.lat,
                    pkg.destinationLocation.lng
                );

                if (routeCoordinates) {
                    console.log("Route found:", routeCoordinates);

                    map.addSource("route", {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "LineString",
                                coordinates: routeCoordinates,
                            },
                        },
                    });

                    map.addLayer({
                        id: "route",
                        type: "line",
                        source: "route",
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                        },
                        paint: {
                            "line-color": "#6084eb",
                            "line-width": 8,
                        },
                    });
                } else {
                    console.error("No route found.");
                }
            } catch (error) {
                console.error("Error adding markers or route:", error);
            }
        });

        // Cleanup function to remove the map
        return () => map.remove();
    }, [showMap, pkg?.trackingNumber, currentAddress, destinationAddress, pkg?.currentLocation, pkg?.destinationLocation]);


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            {/* Tracking Form */}
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-4">Track Your Package</h2>
                <Label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
                    Enter Tracking Number
                </Label>
                <Input
                    id="trackingNumber"
                    name="trackingNumber"
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="mt-1 p-3 w-full text-black rounded-lg border-2 border-cyan-400"
                />
                <Button
                    onClick={handleTrack}
                    className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 py-3 text-white rounded-lg"
                >
                    {loading ? "Tracking..." : "Track Shipment"}
                </Button>
            </div>

            {/* Addresses and Map */}
            {pkg && (
                <div className="mt-6 text-center">
                    <div>
                        <strong>Current Location Address: </strong>{currentAddress}
                    </div>
                    <div>
                        <strong>Destination Address: </strong>{destinationAddress}
                    </div>
                </div>
            )}

            {/* Map */}
            {showMap && (
                <div ref={mapContainerRef} className="mt-6 w-full h-96 rounded-lg shadow-md">
                    {/* Map will render here */}
                </div>
            )}
        </div>
    );
};

export default TrackingPage;