"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        } else {
            setError(data.message);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center bg-navy-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-navy-900 text-center mb-6">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-cyan-400"
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="w-full bg-cyan-400 text-white py-3 rounded-lg font-bold hover:bg-cyan-300 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-600 text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-cyan-400 font-bold">Sign Up</a>
                </p>
            </div>
        </section>
    );
}