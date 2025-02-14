"use client";
import { useState } from "react";
import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPackage } from "../../lib/data";

const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
};

const lineOptions = {
    strokeColor: "#22d3ee",
    strokeOpacity: 0.8,
    strokeWeight: 4,
};
interface PackageData {
    currentLocation: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
};

export default function TrackPage() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [pkg, setPkg] = useState<PackageData | null>(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    const handleTrack = () => {
        const foundPackage = getPackage(trackingNumber);
        setPkg(foundPackage as PackageData);
    };

    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center">
            {/* Centered Content Container */}
            <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-cyan-400 mb-8">Track Your Shipment</h1>
                <div className="mb-8">
                    <div className="flex gap-4 justify-center">
                        <Input
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            placeholder="Enter tracking number"
                            className="border-2 border-cyan-400 rounded-lg p-3 flex-1"
                        />
                        <Button
                            onClick={handleTrack}
                            className="bg-cyan-400 text-navy-900 hover:bg-cyan-300 px-8 py-3 rounded-lg font-bold transition-colors"
                        >
                            Track
                        </Button>
                    </div>
                </div>
                {pkg && isLoaded && (
                    <div className="space-y-6">
                        {/* Journey Progress Section */}
                        <div className="bg-cyan-50 p-4 rounded-lg">
                            <h3 className="text-xl font-bold text-navy-900 mb-2">Journey Progress</h3>
                            <div className="flex justify-between text-cyan-600">
                                <span>Current Location</span>
                                <span>Final Destination</span>
                            </div>
                        </div>
                        {/* Google Map Section */}
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={6}
                            center={pkg.currentLocation}
                        >
                            <Marker
                                position={pkg.currentLocation}
                                label="Current"
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    fillColor: "#22d3ee",
                                    fillOpacity: 1,
                                    scale: 10,
                                }}
                            />
                            <Marker
                                position={pkg.destination}
                                label="Destination"
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    fillColor: "#1e3a8a",
                                    fillOpacity: 1,
                                    scale: 10,
                                }}
                            />
                            <Polyline
                                path={[pkg.currentLocation, pkg.destination]}
                                options={lineOptions}
                            />
                        </GoogleMap>
                    </div>
                )}
            </div>
        </div>
    );
}