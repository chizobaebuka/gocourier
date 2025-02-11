import Image from "next/image";
import React from "react";

export default function Features() {
    return (
        <section className="py-24 bg-navy-900">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">Our Features</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Discover the powerful features that make GOCourier the best choice for your logistics needs.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <Image
                            src="https://img.freepik.com/free-vector/delivery-service-with-masks-concept_23-2148497067.jpg"
                            alt="Fast Delivery"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">Fast Delivery</h2>
                        <p className="text-gray-600">
                            Get your packages delivered within 24 hours with our express service.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <Image
                            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4585.jpg"
                            alt="Secure Payments"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">Secure Payments</h2>
                        <p className="text-gray-600">
                            Enjoy hassle-free and secure payment options for all your transactions.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <Image
                            src="https://img.freepik.com/free-vector/customer-support-concept-illustration_114360-5585.jpg"
                            alt="24/7 Support"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">24/7 Support</h2>
                        <p className="text-gray-600">
                            Our customer support team is available around the clock to assist you.
                        </p>
                    </div>
                </div>

                {/* Call-to-Action */}
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-4">Ready to Experience GOCourier?</h2>
                    <p className="text-gray-400 mb-8">Sign up today and enjoy seamless logistics solutions.</p>
                    <button className="bg-cyan-400 text-navy-900 px-8 py-3 rounded-lg hover:bg-cyan-500 transition">
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    );
}