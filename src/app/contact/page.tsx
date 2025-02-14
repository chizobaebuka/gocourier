"use client"

import { MapPin, Mail, Phone, MessageSquare } from "lucide-react"
import React, { useState } from "react"
import { toast } from "react-toastify"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                toast.success("Message sent successfully!")
            } else {
                const errorData = await response.json()
                toast.error(errorData.error || "Failed to send message")
            }
        } catch (error) { 
            console.error("Failed to send message:", error)
            toast.error("Failed to send message. Please try again.")
        }
    }

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
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        We&apos;d love to hear from you! Reach out to us for any inquiries or feedback.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left Side - Blue Section */}
                            <div className="bg-cyan-600 p-10 text-white relative overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute -left-[20%] top-[20%] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-2xl"></div>
                                    <div className="absolute -right-[20%] bottom-[20%] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-2xl"></div>
                                </div>

                                <div className="relative">
                                    <div className="mb-12 flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-3xl font-bold">Your Shipping Questions Answered</h3>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-semibold mb-1">Visit Us</h4>
                                                <p>123 Shipping Lane, Boulder, Colorado</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-semibold mb-1">Email Support</h4>
                                                <p>support@gocourier.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-semibold mb-1">Call Our Team</h4>
                                                <p>(720) 588-8452</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="p-10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Your First Name"
                                                className="w-full px-4 py-3 border-b border-gray-300 focus:border-cyan-400 focus:outline-none"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Your Last Name"
                                                className="w-full px-4 py-3 border-b border-gray-300 focus:border-cyan-400 focus:outline-none"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                className="w-full px-4 py-3 border-b border-gray-300 focus:border-cyan-400 focus:outline-none"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                placeholder="Your Phone Number"
                                                className="w-full px-4 py-3 border-b border-gray-300 focus:border-cyan-400 focus:outline-none"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            placeholder="Your Message"
                                            rows={4}
                                            className="w-full px-4 py-3 border-b border-gray-300 focus:border-cyan-400 focus:outline-none resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-auto px-8 py-3 bg-cyan-400 text-navy-900 font-semibold rounded-md hover:bg-cyan-300 transition-colors duration-300"
                                        >
                                            SEND YOUR MESSAGE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}