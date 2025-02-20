import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function About() {
    return (
        <section className="py-24 bg-navy-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">About GOCourier</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        We are revolutionizing the logistics industry with innovative solutions and a customer-first approach.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {[
                        { id: 1, title: "Our Mission", text: "To simplify logistics for businesses and individuals, ensuring every package reaches its destination on time and in perfect condition." },
                        { id: 2, title: "Our Vision", text: "To become the most trusted and reliable logistics partner globally, known for our innovation and commitment to sustainability." }
                    ].map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">{item.title}</h2>
                            <p className="text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
                
                <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { id: 1, name: "Paul Clifford", role: "CEO & Founder", src: "https://img.freepik.com/premium-photo/man-pensive-pose-isolated-background_593040-3850.jpg?w=996" },
                        { id: 2, name: "Jane Smith", role: "COO", src: "https://img.freepik.com/premium-photo/portrait-handsome-smiling-man-against-white_252591-2702.jpg?w=826" },
                        { id: 3, name: "Mike Johnson", role: "CTO", src: "https://img.freepik.com/premium-photo/professional-looking-man-with-his-arms-crossed-wearing-suit_488220-75727.jpg?w=1060" }
                    ].map((member) => (
                        <div key={member.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <Image src={member.src} alt={member.name} width={150} height={150} className="rounded-full mx-auto mb-4 object-cover w-32 h-32" />
                            <h3 className="text-xl font-bold text-navy-900">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
                
                <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { id: 1, title: "Customer First", text: "We prioritize our customers' needs and strive to exceed their expectations." },
                        { id: 2, title: "Innovation", text: "We embrace new technologies to deliver cutting-edge solutions." },
                        { id: 3, title: "Sustainability", text: "We are committed to reducing our environmental impact." }
                    ].map((value) => (
                        <div key={value.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">{value.title}</h3>
                            <p className="text-gray-600">{value.text}</p>
                        </div>
                    ))}
                </div>
                
                <div className="bg-cyan-400 text-navy-900 py-12 rounded-lg shadow-lg mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { id: 1, stat: "10M+", label: "Packages Delivered" },
                            { id: 2, stat: "150+", label: "Countries Served" },
                            { id: 3, stat: "98%", label: "Customer Satisfaction" }
                        ].map((stat) => (
                            <div key={stat.id}>
                                <h3 className="text-4xl font-bold">{stat.stat}</h3>
                                <p className="text-lg font-semibold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {[
                        { id: 1, text: "GOCourier has transformed our business with their reliable and fast delivery services. Highly recommended!", name: "Sarah Johnson" },
                        { id: 2, text: "The team at GOCourier is amazing. They truly care about their customers and go above and beyond.", name: "Michael Brown" }
                    ].map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <p className="text-gray-600 italic">“{testimonial.text}”</p>
                            <p className="text-navy-900 font-semibold mt-4">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-400 mb-8">Join thousands of satisfied customers today.</p>
                    <Link href="/contact" passHref>
                        <Button className="bg-cyan-400 text-navy-900 px-8 py-3 rounded-lg hover:bg-cyan-300 transition-colors duration-300 font-semibold">
                        Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
