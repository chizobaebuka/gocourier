import Image from "next/image"
import React from "react"

export default function Contact() {
    return (
        <section className="py-24 bg-navy-900">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        We'd love to hear from you! Reach out to us for any inquiries or feedback.
                    </p>
                </div>

                {/* Contact Form and Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-navy-900 mb-6">Send Us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-cyan-400 text-navy-900 py-2 px-4 rounded-md hover:bg-cyan-300 transition-colors duration-300 font-semibold"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-navy-900 mb-6">Our Office</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Image
                                    src="https://img.icons8.com/ios-filled/50/4a90e2/marker.png"
                                    alt="Location"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <p className="text-gray-600 ml-2">123 Logistics Street, City, Country</p>
                            </div>
                            <div className="flex items-center">
                                <Image
                                    src="https://img.icons8.com/ios-filled/50/4a90e2/phone.png"
                                    alt="Phone"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <p className="text-gray-600 ml-2">+1 (123) 456-7890</p>
                            </div>
                            <div className="flex items-center">
                                <Image
                                    src="https://img.icons8.com/ios-filled/50/4a90e2/email.png"
                                    alt="Email"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <p className="text-gray-600 ml-2">info@gocourier.com</p>
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="mt-8">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.81627974202167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a4b11e3ab6!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633033456789!5m2!1sen!2sus"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Google Maps"
                                className="rounded-lg shadow-sm"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}