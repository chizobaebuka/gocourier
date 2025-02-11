"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "react-hot-toast";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "buyer", // Default role
    });

    const router = useRouter();

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle role selection
    const handleRoleChange = (role: "buyer" | "seller") => {
        setFormData({ ...formData, role });
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Signup successful!");
                router.push("/signin"); // Redirect to sign-in page
            } else {
                toast.error(data.message || "Signup failed");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-navy-900 px-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-navy-900">Create an Account</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    <Input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                    {/* Buyer/Seller Selection */}
                    <div className="flex justify-center space-x-4">
                        <Button
                            type="button"
                            className={`px-4 py-2 rounded-md text-white ${formData.role === "buyer" ? "bg-cyan-500" : "bg-gray-300"
                                }`}
                            onClick={() => handleRoleChange("buyer")}
                        >
                            Buyer
                        </Button>
                        <Button
                            type="button"
                            className={`px-4 py-2 rounded-md text-white ${formData.role === "seller" ? "bg-cyan-500" : "bg-gray-300"
                                }`}
                            onClick={() => handleRoleChange("seller")}
                        >
                            Seller
                        </Button>
                    </div>

                    <Button type="submit" className="w-full bg-cyan-400 hover:bg-cyan-500 text-white">
                        Sign Up
                    </Button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-cyan-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}