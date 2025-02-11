import React from "react"
import Link from "next/link"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-navy-900 text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-cyan-400 text-xl font-bold mb-4">GOCourier</h3>
                        <p className="text-gray-400 mb-6">Track your courier anywhere and anytime with our tracking system.</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">PRODUCT</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    Security
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    Navigation
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    API
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">RESOURCES</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    User Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    Talk to Sales
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">COMPANY</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    About Data
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-cyan-400">
                                    We are hiring!
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

