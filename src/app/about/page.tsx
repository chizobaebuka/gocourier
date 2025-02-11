import Image from "next/image"
import React from "react"

export default function About() {
    return (
        <section className="py-24 bg-navy-900">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">About GOCourier</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        We are revolutionizing the logistics industry with innovative solutions and a customer-first approach.
                    </p>
                </div>

                {/* Mission and Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            To simplify logistics for businesses and individuals, ensuring every package reaches its destination on time and in perfect condition.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Vision</h2>
                        <p className="text-gray-600">
                            To become the most trusted and reliable logistics partner globally, known for our innovation and commitment to sustainability.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <Image
                                src="https://img.freepik.com/premium-photo/man-pensive-pose-isolated-background_593040-3850.jpg?w=996"
                                alt="Team Member"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
                            />
                            <h3 className="text-xl font-bold text-navy-900">Paul Clifford</h3>
                            <p className="text-gray-600">CEO & Founder</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <Image
                                src="https://img.freepik.com/premium-photo/portrait-handsome-smiling-man-against-white_252591-2702.jpg?w=826"
                                alt="Team Member"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
                            />
                            <h3 className="text-xl font-bold text-navy-900">Jane Smith</h3>
                            <p className="text-gray-600">COO</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <Image
                                src="https://img.freepik.com/premium-photo/professional-looking-man-with-his-arms-crossed-wearing-suit_488220-75727.jpg?w=1060"
                                alt="Team Member"
                                width={150}
                                height={150}
                                className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
                            />
                            <h3 className="text-xl font-bold text-navy-900">Mike Johnson</h3>
                            <p className="text-gray-600">CTO</p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">Customer First</h3>
                            <p className="text-gray-600">
                                We prioritize our customers' needs and strive to exceed their expectations.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">Innovation</h3>
                            <p className="text-gray-600">
                                We embrace new technologies to deliver cutting-edge solutions.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">Sustainability</h3>
                            <p className="text-gray-600">
                                We are committed to reducing our environmental impact.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-cyan-400 text-navy-900 py-12 rounded-lg shadow-lg mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold">10M+</h3>
                            <p className="text-lg font-semibold">Packages Delivered</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">150+</h3>
                            <p className="text-lg font-semibold">Countries Served</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">98%</h3>
                            <p className="text-lg font-semibold">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <p className="text-gray-600 italic">
                                "GOCourier has transformed our business with their reliable and fast delivery services. Highly recommended!"
                            </p>
                            <p className="text-navy-900 font-semibold mt-4">- Sarah Johnson</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <p className="text-gray-600 italic">
                                "The team at GOCourier is amazing. They truly care about their customers and go above and beyond."
                            </p>
                            <p className="text-navy-900 font-semibold mt-4">- Michael Brown</p>
                        </div>
                    </div>
                </div>

                {/* Call-to-Action */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-400 mb-8">Join thousands of satisfied customers today.</p>
                    <button className="bg-cyan-400 text-navy-900 px-8 py-3 rounded-lg hover:bg-cyan-300 transition-colors duration-300 font-semibold">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    )
}