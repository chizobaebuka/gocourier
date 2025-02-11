import React from "react";
import Image from "next/image";

export default function ServicesPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-navy-900 p-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-cyan-400 mb-4">Our Services</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Discover the wide range of services we offer to meet your logistics needs. From fast delivery to secure storage, we've got you covered.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Express Delivery */}
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-center">
                        <Image
                            src="https://img.icons8.com/?size=100&id=dEA10W7E8BP9&format=png&color=000000"
                            alt="Express Delivery"
                            width={80}
                            height={80}
                            className="mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">Express Delivery</h2>
                        <p className="text-gray-600">
                            Get your packages delivered within 24 hours. Perfect for urgent shipments.
                        </p>
                    </div>
                </div>

                {/* International Shipping */}
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-center">
                        <Image
                            src="https://img.icons8.com/ios-filled/100/4a90e2/worldwide-location.png"
                            alt="International Shipping"
                            width={80}
                            height={80}
                            className="mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">International Shipping</h2>
                        <p className="text-gray-600">
                            We deliver worldwide with competitive rates and reliable service.
                        </p>
                    </div>
                </div>

                {/* Warehouse Storage */}
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-center">
                        <Image
                            src="https://img.icons8.com/ios-filled/100/4a90e2/warehouse.png"
                            alt="Warehouse Storage"
                            width={80}
                            height={80}
                            className="mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">Warehouse Storage</h2>
                        <p className="text-gray-600">
                            Secure storage solutions for your goods with easy access and management.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}