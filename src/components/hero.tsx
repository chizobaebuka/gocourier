"use client";

import { Button } from "../components/ui/button";
import Link from "next/link";

export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: `url('https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/a476cef3-de08-4daa-fb63-73b8f09c4f00/public')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content Wrapper */}
            <div className="relative z-10 text-center md:text-left max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                    Swift & Secure
                    <br />
                    <span className="text-blue-500">Courier</span> services
                    <br />
                    on the <span className="text-blue-500">GO</span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 mt-4">
                    Your trusted courier every step of the way.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <Link href="/track" passHref>
                        <Button className="bg-blue-500 hover:bg-blue-600 h-12 px-8 w-full sm:w-auto">
                            Track
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}