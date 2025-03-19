'use client';
import React, { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPackageSchema } from "@/lib/validators";
import { getRouteFromCoordinates, sendEmailNotification } from "@/lib/utils";

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
interface PackageData {
    trackingNumber: string;
    sender: { fullName: string; address: string; email?: string };
    recipient: { fullName: string; address: string; email?: string };
    details: {
        description: string;
        weight: number;
        dimensions: { length: number; width: number; height: number };
        value: number;
    };
    status: "created" | "in-transit" | "delivered";
    currentLocation?: { lat: number; lng: number };
    destinationLocation?: { lat: number; lng: number };
}

export default function TrackPage() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [pkg, setPkg] = useState<PackageData | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("tracking");
    const [showMap, setShowMap] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<string | null>(null);
    const [destinationAddress, setDestinationAddress] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = React.useRef<maplibregl.Map | null>(null);

    const [formData, setFormData] = useState({
        trackingNumber: "",
        sender: {
            fullName: "",
            email: "",
            address: "",
        },
        recipient: {
            fullName: "",
            email: "",
            address: "",
        },
        details: {
            description: "",
            weight: 0,
            dimensions: { length: 0, width: 0, height: 0 },
            value: 0,
        },
        status: "created",
        currentLocation: { lat: 0, lng: 0 },
        destinationLocation: { lat: 0, lng: 0 },
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleTrack = async () => {
        setLoading(true);
        setShowMap(true);

        try {
            const response = await fetch(`/api/packages?trackingNumber=${trackingNumber}`);
            if (!response.ok) {
                throw new Error("Failed to fetch package details.");
            }

            const data = await response.json();
            if (!data.packages) {
                alert("Package not found!");
                return;
            }

            const foundPackage = data.packages;
            setPkg({
                sender: foundPackage.sender,
                recipient: foundPackage.recipient,
                trackingNumber: foundPackage.trackingNumber,
                status: foundPackage.status,
                currentLocation: foundPackage.currentLocation,
                destinationLocation: foundPackage.destinationLocation,
                details: foundPackage.details,
            });

            // Fetch addresses for both current & destination locations
            const currentAddr = await getAddressFromCoordinates(foundPackage.currentLocation.lat, foundPackage.currentLocation.lng);
            setCurrentAddress(currentAddr);

            const destinationAddr = await getAddressFromCoordinates(foundPackage.destinationLocation.lat, foundPackage.destinationLocation.lng);
            setDestinationAddress(destinationAddr);

            // Send email notification if recipient email exists
            if (foundPackage.recipient.email) {
                await sendEmailNotification({
                    to: foundPackage.recipient.email,
                    subject: `Package Update - ${foundPackage.trackingNumber}`,
                    text: `
                        Your package (${foundPackage.trackingNumber}) has been located.
                        Current Location: ${currentAddr}
                        Destination: ${destinationAddr}
                    `,
                    html: `
                        <h2>Package Update</h2>
                        <p>Your package (${foundPackage.trackingNumber}) has been located.</p>
                        <p><strong>Current Location:</strong> ${currentAddr}</p>
                        <p><strong>Destination:</strong> ${destinationAddr}</p>
                    `
                });
            }
        } catch (error) {
            console.error("Error tracking package:", error);
            alert("Error fetching package details.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendPackage = async () => {
        try {
            const validatedData = createPackageSchema.parse({
                trackingNumber: formData.trackingNumber, // ✅ Ensure trackingNumber is included
                recipient: {
                    fullName: formData.recipient.fullName,
                    address: formData.recipient.address,
                    email: formData.recipient.email || "", // ✅ Ensure email is always a string
                },
                sender: {
                    fullName: formData.sender.fullName,
                    address: formData.sender.address,
                    email: formData.sender.email || "",
                },
                details: {
                    description: formData.details.description,
                    weight: parseFloat(formData.details.weight?.toString() ?? "0"),
                    dimensions: {
                        length: parseFloat(formData.details.dimensions.length?.toString() ?? "0"),
                        width: parseFloat(formData.details.dimensions.width?.toString() ?? "0"),
                        height: parseFloat(formData.details.dimensions.height?.toString() ?? "0"),
                    },
                    value: parseFloat(formData.details.value?.toString() ?? "0"),
                },
                currentLocation: {
                    lat: parseFloat(formData.currentLocation.lat?.toString() ?? "0"),
                    lng: parseFloat(formData.currentLocation.lng?.toString() ?? "0"),
                },
                destinationLocation: {
                    lat: parseFloat(formData.destinationLocation.lat?.toString() ?? "0"),
                    lng: parseFloat(formData.destinationLocation.lng?.toString() ?? "0"),
                },
                status: formData.status ?? "created",
            });

            const response = await fetch("/api/packages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData),
            });

            if (response.ok) {
                toast.success("Package created successfully!");

                // Send email notifications to both sender and recipient
                if (formData.sender.email) {
                    await sendEmailNotification({
                        to: formData.sender.email,
                        subject: `Package Created - ${formData.trackingNumber}`,
                        text: `Your package has been created successfully. Tracking number: ${formData.trackingNumber}`,
                        html: `
                            <h2>Package Created Successfully</h2>
                            <p>Your package has been created with tracking number: ${formData.trackingNumber}</p>
                            <p>You can track your package using this tracking number.</p>
                        `
                    });
                }

                if (formData.recipient.email) {
                    await sendEmailNotification({
                        to: formData.recipient.email,
                        subject: `Package Coming Your Way - ${formData.trackingNumber}`,
                        text: `A package is being sent to you. Tracking number: ${formData.trackingNumber}`,
                        html: `
                            <h2>Package Coming Your Way</h2>
                            <p>A package is being sent to you.</p>
                            <p>Tracking number: ${formData.trackingNumber}</p>
                            <p>You can track your package using this tracking number.</p>
                        `
                    });
                }

                setFormData({
                    trackingNumber: "", // ✅ Reset trackingNumber
                    recipient: { fullName: "", address: "", email: "" },
                    sender: { fullName: "", address: "", email: "" },
                    details: {
                        description: "",
                        weight: 0,
                        dimensions: { length: 0, width: 0, height: 0 },
                        value: 0,
                    },
                    currentLocation: { lat: 0, lng: 0 }, // ✅ Always set as object
                    destinationLocation: { lat: 0, lng: 0 },
                    status: "created",
                });
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage || "Failed to create package. Please try again.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error(error.errors.map((issue) => issue.message).join(", "));
            } else {
                toast.error("Failed to create package. Please try again.");
            }
        }
    };

    const parseNumericInput = (value: string) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const handleInputChange = (
        section: keyof PackageData,
        field: string,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...(prev[section] as object || {}),
                [field]: value,
            },
        }));
    };

    const handleNestedInputChange = <
        S extends keyof PackageData,
        SS extends keyof NonNullable<PackageData[S]>
    >(
        section: S,
        subSection: SS,
        field: keyof NonNullable<PackageData[S] extends object ? PackageData[S][SS] : never>,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...(typeof prev[section] === 'object' ? prev[section] : {}),
                [subSection]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ...(prev[section] as Record<SS, any>)[subSection],
                    [field]: value,
                },
            },
        }));
    };

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
            style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`,
            center: [pkg.currentLocation?.lng ?? 0, pkg.currentLocation?.lat ?? 0],
            zoom: 12,
        });

        mapRef.current = map;

        map.once("load", async () => {
            console.log("Map has loaded successfully.");

            try {
                // Add Blue Marker for Current Location
                new maplibregl.Marker({ color: "blue" })
                    .setLngLat([pkg.currentLocation?.lng ?? 0, pkg.currentLocation?.lat ?? 0])
                    .setPopup(new maplibregl.Popup().setHTML(`Sent From: ${currentAddress}`))
                    .addTo(map);

                // Add Red Marker for Destination
                new maplibregl.Marker({ color: "red" })
                    .setLngLat([pkg.destinationLocation?.lng ?? 0, pkg.destinationLocation?.lat ?? 0])
                    .setPopup(new maplibregl.Popup().setHTML(`Deliver to: ${destinationAddress}`))
                    .addTo(map);

                // Fly to the package location for better visibility
                map.flyTo({
                    center: [pkg.currentLocation?.lng ?? 0, pkg.currentLocation?.lat ?? 0],
                    zoom: 14,
                });

                // Fetch and add route path
                const routeCoordinates = await getRouteFromCoordinates(
                    pkg.currentLocation?.lat ?? 0,
                    pkg.currentLocation?.lng ?? 0,
                    pkg.destinationLocation?.lat ?? 0,
                    pkg.destinationLocation?.lng ?? 0
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
                        'id': 'route',
                        'type': 'line',
                        'source': 'route',
                        'layout': {
                            'line-join': "round",
                            'line-cap': "round",
                        },
                        'paint': {
                            'line-color': '#6084eb',
                            'line-width': 8,
                        },
                        'filter': ['==', '$type', 'LineString'],
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
        <div className="flex flex-col md:flex-row h-screen">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-900 text-white p-6 flex flex-col gap-6 md:min-h-screen">
                <h2 className="text-xl font-bold text-center md:text-left mb-6">Dashboard</h2>
                <Button onClick={() => setActiveTab("tracking")} className="w-full bg-cyan-500 py-3">
                    Track Package
                </Button>
                <Button onClick={() => setActiveTab("details")} className="w-full bg-cyan-500 py-3">
                    Package Details
                </Button>
                <Button onClick={() => setActiveTab("send")} className="w-full bg-cyan-500 py-3">
                    Send Package
                </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 bg-gray-100 overflow-auto flex flex-col items-center md:mt-12">
                {activeTab === "tracking" && (
                    <div className="text-center mb-6 w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-6 mt-3">Enter Tracking Number</h2>
                        <Input
                            id="tracking-number"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            placeholder="Enter tracking number"
                            className="mt-4 p-3 w-full text-black rounded-lg border-2 border-cyan-400"
                        />
                        <Button onClick={handleTrack} disabled={loading} className="bg-cyan-400 text-navy-900 hover:bg-cyan-300 px-8 py-3 rounded-lg font-bold transition-colors">
                            {loading ? "Tracking..." : "Track Shipment"}
                        </Button>
                    </div>
                )}

                {activeTab === "details" && pkg && (
                    <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
                        <h3 className="text-lg font-bold mb-2">Package Details</h3>
                        <p><strong>Tracking Number:</strong> {pkg.trackingNumber}</p>
                        <p><strong>Sender:</strong> {pkg.sender.fullName}</p>
                        <p><strong>Recipient:</strong> {pkg.recipient.fullName}</p>
                        <p><strong>Address:</strong> {pkg.recipient.address}</p>
                    </div>
                )}

                {activeTab === "send" && (
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <h2 className="text-2xl font-bold">Send Package</h2>

                        {/* Sender Information */}
                        <div>
                            <Label htmlFor="sender-fullName">Sender Full Name</Label>
                            <Input
                                id="sender-fullName"
                                name="senderFullName"
                                value={formData.sender?.fullName ?? ""}
                                onChange={(e) => handleInputChange("sender", "fullName", e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="sender-address">Sender Address</Label>
                            <Input
                                id="sender-address"
                                name="senderAddress"
                                value={formData.sender?.address ?? ""}
                                onChange={(e) => handleInputChange("sender", "address", e.target.value)}
                                autoComplete="street-address"
                            />
                        </div>
                        <div>
                            <Label htmlFor="sender-email">Sender Email (Optional)</Label>
                            <Input
                                id="sender-email"
                                name="senderEmail"
                                type="email"
                                value={formData.sender?.email ?? ""}
                                onChange={(e) => handleInputChange("sender", "email", e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        {/* Recipient Information */}
                        <div>
                            <Label htmlFor="recipient-fullName">Recipient Full Name</Label>
                            <Input
                                id="recipient-fullName"
                                name="recipientFullName"
                                value={formData.recipient?.fullName ?? ""}
                                onChange={(e) => handleInputChange("recipient", "fullName", e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="recipient-address">Recipient Address</Label>
                            <Input
                                id="recipient-address"
                                name="recipientAddress"
                                value={formData.recipient?.address ?? ""}
                                onChange={(e) => handleInputChange("recipient", "address", e.target.value)}
                                autoComplete="street-address"
                            />
                        </div>
                        <div>
                            <Label htmlFor="recipient-email">Recipient Email (Optional)</Label>
                            <Input
                                id="recipient-email"
                                name="recipientEmail"
                                type="email"
                                value={formData.recipient?.email ?? ""}
                                onChange={(e) => handleInputChange("recipient", "email", e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        {/* Package Details */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="packageDescription"
                                value={formData.details?.description ?? ""}
                                onChange={(e) => handleInputChange("details", "description", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                name="packageWeight"
                                type="number"
                                value={formData.details?.weight ?? 0}
                                onChange={(e) => handleInputChange("details", "weight", parseNumericInput(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Label htmlFor="length">Length (cm)</Label>
                                <Input
                                    id="length"
                                    name="packageLength"
                                    type="number"
                                    value={formData.details?.dimensions?.length ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "length", parseNumericInput(e.target.value))}
                                />
                                <Label htmlFor="width">Width (cm)</Label>
                                <Input
                                    id="width"
                                    name="packageWidth"
                                    type="number"
                                    value={formData.details?.dimensions?.width ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "width", parseNumericInput(e.target.value))}
                                />
                                <Label htmlFor="height">Height (cm)</Label>
                                <Input
                                    id="height"
                                    name="packageHeight"
                                    type="number"
                                    value={formData.details?.dimensions?.height ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "height", parseNumericInput(e.target.value))}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="value">Value ($)</Label>
                            <Input
                                id="value"
                                name="packageValue"
                                type="number"
                                value={formData.details?.value ?? 0}
                                onChange={(e) => handleInputChange("details", "value", parseNumericInput(e.target.value))}
                            />
                        </div>

                        <Button type="button" onClick={handleSendPackage}>Send Package</Button>
                    </form>
                )}

                {isClient && showMap && pkg && (
                    <div ref={mapContainerRef} className="mt-6 w-full h-96 rounded-lg shadow-md">
                        {/* Map will render here */}
                    </div>
                )}
            </div>
        </div>
    );
}