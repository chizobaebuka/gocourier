"use client"

import React from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export function Newsletter() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6 text-center max-w-2xl">
                <h2 className="text-3xl font-bold mb-8">Want to know about exciting and awesome Offer?</h2>
                <div className="flex gap-4">
                    <Input type="email" placeholder="Enter email address..." className="h-12" />
                    <Button className="bg-blue-500 hover:bg-blue-600 h-12 px-8">Subscribe</Button>
                </div>
            </div>
        </section>
    )
}

