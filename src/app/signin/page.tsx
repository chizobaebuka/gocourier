"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";

interface FormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Logged in successfully!");

                // Check the role of the user
                if (data.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/track-package");
                }
            } else {
                toast.error(data.message ?? "Login failed. Please try again.");
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
                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">Login to Your Account</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Welcome back! Please enter your credentials to access your account.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left Side - Blue Section */}
                            <div className="bg-cyan-600 relative overflow-hidden flex-1 flex flex-col justify-center items-center">
                                {/* Full-cover background image */}
                                <div className="absolute inset-0 w-full h-full">
                                    {/* <img
                                        src="https://img.freepik.com/premium-photo/man-writes-screen-welcome-our-team-text_220873-143.jpg?w=1800"
                                        alt="Courier Service"
                                        className="w-full h-full object-fit opacity-100"
                                    /> */}
                                    <Image
                                        src="https://img.freepik.com/premium-photo/man-writes-screen-welcome-our-team-text_220873-143.jpg?w=1800"
                                        alt="Courier Service"
                                        layout="fill"
                                        objectFit="fit"
                                        className="w-full h-full object-fit opacity-70"
                                    />
                                    {/* Blue section accents */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute -left-[20%] top-[20%] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-2xl"></div>
                                        <div className="absolute -right-[20%] bottom-[20%] w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-2xl"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Right Side - Form */}
                            <div className="p-10">
                                <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-auto px-8 py-3 bg-cyan-400 text-navy-900 font-semibold rounded-md hover:bg-cyan-300 transition-colors duration-300"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Logging in..." : "Log In"}
                                        </button>
                                    </div>
                                    <div className="text-center text-sm text-muted-foreground">
                                        Don&apos;t have an account?{" "}
                                        <Link href="/signup" className="text-cyan-400 underline-offset-4 hover:underline">
                                            Sign up
                                        </Link>
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