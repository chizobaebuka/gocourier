"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { createOrUpdatePackage } from "../../lib/data";

export default function AdminPanel() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [currentLat, setCurrentLat] = useState("");
    const [currentLng, setCurrentLng] = useState("");
    const [destLat, setDestLat] = useState("");
    const [destLng, setDestLng] = useState("");

    const handleCreatePackage = () => {
        createOrUpdatePackage({
            trackingNumber,
            currentLocation: { lat: Number(currentLat), lng: Number(currentLng) },
            destination: { lat: Number(destLat), lng: Number(destLng) },
            status: "created"
        });

        // Reset form
        setTrackingNumber("");
        setCurrentLat("");
        setCurrentLng("");
        setDestLat("");
        setDestLng("");
    };

    return (
        <section className="py-24 bg-navy-900 relative min-h-screen">
            {/* Background Accent */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-[10%] top-[20%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -right-[10%] bottom-[20%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">Package Manager</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Manage your packages and update their locations here.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-10">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-navy-900 block mb-2">Tracking Number</Label>
                                        <Input
                                            value={trackingNumber}
                                            onChange={(e) => setTrackingNumber(e.target.value)}
                                            className="border-2 border-cyan-400 rounded-lg p-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-navy-900 block mb-2">Current Latitude</Label>
                                        <Input
                                            type="number"
                                            value={currentLat}
                                            onChange={(e) => setCurrentLat(e.target.value)}
                                            className="border-2 border-cyan-400 rounded-lg p-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-navy-900 block mb-2">Current Longitude</Label>
                                        <Input
                                            type="number"
                                            value={currentLng}
                                            onChange={(e) => setCurrentLng(e.target.value)}
                                            className="border-2 border-cyan-400 rounded-lg p-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-navy-900 block mb-2">Destination Latitude</Label>
                                        <Input
                                            type="number"
                                            value={destLat}
                                            onChange={(e) => setDestLat(e.target.value)}
                                            className="border-2 border-cyan-400 rounded-lg p-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-navy-900 block mb-2">Destination Longitude</Label>
                                        <Input
                                            type="number"
                                            value={destLng}
                                            onChange={(e) => setDestLng(e.target.value)}
                                            className="border-2 border-cyan-400 rounded-lg p-2"
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleCreatePackage}
                                    className="w-full bg-cyan-400 text-navy-900 hover:bg-cyan-300 py-3 rounded-lg font-bold transition-colors"
                                >
                                    {trackingNumber ? "Update Package" : "Create New Package"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}