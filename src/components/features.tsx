import { Package, Shield, MapPin } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import React from "react"

export function Features() {
    const features = [
        {
            id: 1,
            icon: <Package className="h-6 w-6 text-blue-500" />,
            title: "Swift & speedy delivery",
            description: "We will deliver your products in the next day at your order. Deliver it to you.",
        },
        {
            id: 2,
            icon: <Shield className="h-6 w-6 text-orange-500" />,
            title: "Safe and secure",
            description: "We use secure storage for a friendly courier to collect your parcel.",
        },
        {
            id: 3,
            icon: <MapPin className="h-6 w-6 text-blue-500" />,
            title: "Drop off any parcel/ship",
            description: "We offer drop a parcel but let us know where you'll like your parcel shipping.",
        },
    ]

    return (
        <section className="py-24 bg-navy-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500 rounded-full opacity-20 -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500 rounded-full opacity-20 translate-x-16 translate-y-16" />
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 text-white">What we provide</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.id} className="bg-white">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

