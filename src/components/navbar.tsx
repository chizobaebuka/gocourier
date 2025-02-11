"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { IoMenu, IoClose } from "react-icons/io5"; 

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-navy-900 shadow-lg z-50">
            <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-cyan-400">
                    GOCourier
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/services" className="text-white hover:text-cyan-400">
                        Services
                    </Link>
                    <Link href="/about" className="text-white hover:text-cyan-400">
                        About Us
                    </Link>
                    <Link href="/features" className="text-white hover:text-cyan-400">
                        Features
                    </Link>
                    <Link href="/contact" className="text-white hover:text-cyan-400">
                        Contact Us
                    </Link>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/signin">
                        <Button variant="ghost" className="text-white hover:text-cyan-400">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-cyan-400 hover:bg-cyan-500 text-white">
                            Sign Up
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-navy-900 shadow-md py-4 flex flex-col items-center space-y-4 transition-all">
                    <Link
                        href="/services"
                        className="text-white hover:text-cyan-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Services
                    </Link>
                    <Link
                        href="/about"
                        className="text-white hover:text-cyan-400"
                        onClick={() => setIsOpen(false)}
                    >
                        About Us
                    </Link>
                    <Link
                        href="/features"
                        className="text-white hover:text-cyan-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        href="/contact"
                        className="text-white hover:text-cyan-400"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact Us
                    </Link>

                    {/* Mobile Auth Buttons */}
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="text-white hover:text-cyan-400">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="bg-cyan-400 hover:bg-cyan-500 text-white">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    );
}