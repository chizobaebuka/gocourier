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
                                    src="https://img.freepik.com/free-photo/vehicles-boxes-supply-chain-representation_23-2149853155.jpg?t=st=1739229532~exp=1739233132~hmac=433f27fcfd8ebaab4806219b9fad6e6c9c82d943c4c89334ca8598a39b703428&w=826"
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
                            upload it to the Amazon and Shopify. You can also upload it to the Amazon's center!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

