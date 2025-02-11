"use client"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import React from "react"

export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center"
            style={{
                // backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-10%20at%2013.10.52-TKz72a1T64u70yQUr9V7mPbnzTkfA6.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/70" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl space-y-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                        Swift & Secure
                        <br />
                        <span className="text-blue-500">Courier</span> services
                        <br />
                        on the <span className="text-blue-500">GO</span>
                    </h1>
                    <p className="text-xl text-white/90">Your trusted courier every step of the way.</p>
                    <div className="max-w-xl space-y-4">
                        <div className="flex gap-2">
                            <Input type="text" placeholder="Enter your tracking number" className="bg-white/90 h-12" />
                            <Button className="bg-blue-500 hover:bg-blue-600 h-12 px-8">Track</Button>
                        </div>
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <Checkbox />
                            <span>Track your package easily</span>
                        </label>
                    </div>
                </div>
            </div>
        </section>
    )
}

