import Image from "next/image"
import React from "react"

export function Services() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <div className="relative w-80 h-80 mx-auto">
                            <div className="absolute inset-0 bg-black rounded-full">
                                <Image
                                    src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/682a4f3f-1c89-4cb9-74bd-a45b5012c900/public"
                                    alt="Shipping boxes illustration"
                                    fill
                                    className="object-cover rounded-full" // Use object-cover and rounded-full
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">Keeping everything safe and giving quality services to you.</h2>
                        <p className="text-gray-600 mb-8">
                            If you want lots of parcels you can sort it at separate places and we will deliver it to you. You can also
                            upload it to the Amazon&apos;s center!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}