"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RoleEnum } from "../models/user";
import Image from "next/image";

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    accountType: "buyer" | "seller";
    role?: RoleEnum
}

export default function SignupPage() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        accountType: "buyer",
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: "user" }),
            });

            const data = await res.json();

            if (res.status === 409) {
                toast.error("User with this email already exists.");
            } else if (res.ok) {
                toast.success("Signed up successfully! Please sign in.");
                router.replace("/signin");
            } else {
                toast.error(data.error ?? "Sign up failed. Please try again.");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message ?? "Login failed. Please try again.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

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
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">Create an Account</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Join us and become part of our community. Choose your account type and get started.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left Side - Blue Section */}
                            <div className="bg-cyan-600 relative overflow-hidden flex-1">
                                {/* Full-cover background image */}
                                <div className="absolute inset-0 w-full h-full">
                                    {/* <img
                                        src="https://img.freepik.com/free-vector/courier-delivery-concept-illustration_114360-7832.jpg?w=740&t=st=1698155890~exp=1698156490~hmac=7b9d3a4c12f8e40c3a2eacf3c8d8f7f894a681202d2154144352d519c7893187"
                                        alt="Courier Service"
                                        className="w-full h-full object-cover opacity-70" // Adjusted opacity for better readability
                                    /> */}
                                    <Image
                                        src="https://img.freepik.com/free-vector/courier-delivery-concept-illustration_114360-7832.jpg?w=740&t=st=1698155890~exp=1698156490~hmac=7b9d3a4c12f8e40c3a2eacf3c8d8f7f894a681202d2154144352d519c7893187"
                                        alt="Courier Service"
                                        layout="fill"
                                        objectFit="cover"
                                        className="w-full h-full object-cover opacity-70" 
                                    />
                                </div>
                                {/* Blue section accents */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute -left-[20%] top-[20%] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-2xl"></div>
                                    <div className="absolute -right-[20%] bottom-[20%] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-2xl"></div>
                                </div>
                                {/* Text overlay at the bottom-left */}
                                <div className="absolute bottom-8 left-8 text-white z-10 space-y-4 max-w-sm">
                                    <h3 className="text-3xl font-bold">Create Your Account</h3>
                                    <div>
                                        <h4 className="text-xl font-semibold">Easy Registration</h4>
                                        <p>Sign up in a few steps and join us in no time.</p>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="text-xl font-semibold">Quick Access</h4>
                                        <p>Get immediate access to your account after registering.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="p-10">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="accountType">Account Type</Label>
                                        <select
                                            id="accountType"
                                            name="accountType"
                                            value={formData.accountType}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
                                        >
                                            <option value="buyer">Buyer</option>
                                            <option value="seller">Seller</option>
                                        </select>
                                    </div>

                                    {/* <div className="space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            required
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div> */}

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-auto px-8 py-3 bg-cyan-400 text-navy-900 font-semibold rounded-md hover:bg-cyan-300 transition-colors duration-300"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}