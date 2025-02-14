"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomePage() {
    const [showWhatsAppNumber, setShowWhatsAppNumber] = useState(false);

    const handleButtonClick = (route: string) => {
        window.location.href = route;
    };

    const handleContactSupportClick = () => {
        setShowWhatsAppNumber(!showWhatsAppNumber);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 via-cyan-800 to-blue-900 flex items-center justify-center p-8">
            <div className="max-w-xl w-full bg-white rounded-lg shadow-2xl p-8 text-center space-y-6">
                <h1 className="text-5xl font-extrabold text-cyan-500 mb-6">
                    Welcome to the Shipment Tracker
                </h1>

                <p className="text-lg text-gray-700 mb-8">
                    Seamlessly manage and track your packages in real-time. Choose an option below.
                </p>

                <div className="space-y-4">
                    <Button
                        onClick={() => handleButtonClick("/track-package")}
                        className="w-full bg-cyan-500 text-white hover:bg-cyan-400 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                    >
                        Track a Package
                    </Button>
                    <Button
                        onClick={handleContactSupportClick}
                        className="w-full bg-green-500 text-white hover:bg-green-400 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                    >
                        Contact Support
                    </Button>

                    {showWhatsAppNumber && (
                        <p className="text-xl text-gray-800 mt-6">
                            📞 You can reach us on WhatsApp at: <a href="https://wa.me/11234567890" target="_blank" className="text-blue-500">+1 (123) 456-7890</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}