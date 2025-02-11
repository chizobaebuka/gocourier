import React from "react";

export function AppPreview() {
    return (
        <section className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="text-white space-y-12">
                        <h2 className="text-4xl font-bold leading-tight">
                            Discover the joy of having a
                            <br />
                            lot on your service.
                        </h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-0.5 h-12 bg-blue-500" />
                                <div>
                                    <h3 className="text-blue-500 font-semibold mb-2">Offer</h3>
                                    <p className="text-gray-400">Safe place delivery photo confirmation</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-0.5 h-12 bg-blue-500" />
                                <div>
                                    <h3 className="text-blue-500 font-semibold mb-2">Security</h3>
                                    <p className="text-gray-400">Direct to a neighbor or safe place</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-0.5 h-12 bg-blue-500" />
                                <div>
                                    <h3 className="text-blue-500 font-semibold mb-2">Real time</h3>
                                    <p className="text-gray-400">Regular real-time tracking information</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-0.5 h-12 bg-blue-500" />
                                <div>
                                    <h3 className="text-blue-500 font-semibold mb-2">Payment</h3>
                                    <p className="text-gray-400">A delivery time window on the day</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-[#1a2b6d] rounded-3xl p-6 mb-8">
                            <h3 className="text-white text-xl font-semibold mb-4">Happiness in each shipment</h3>
                            <div className="relative h-40 bg-[#2a3b8d] rounded-2xl overflow-hidden">
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-24 bg-[#3a4bad]"
                                    style={{
                                        borderRadius: "100% 100% 0 0",
                                    }}
                                />
                                <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full" />
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center">
                            {["Normal Service", "Next Day", "Same Day"].map((service, index) => {
                                let backgroundColor;
                                if (index === 0) {
                                    backgroundColor = "bg-blue-500";
                                } else if (index === 1) {
                                    backgroundColor = "bg-orange-500";
                                } else {
                                    backgroundColor = "bg-yellow-500";
                                }

                                return (
                                    <div key={service} className="bg-white rounded-xl p-4 shadow-lg w-1/3">
                                        <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${backgroundColor}`}>
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor }} />
                                        </div>
                                        <p className="text-sm font-medium text-gray-800">{service}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

