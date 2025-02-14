import React from "react"
import Image from "next/image"

export function Testimonial() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="bg-black rounded-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image src="https://s3-alpha-sig.figma.com/img/ef73/9572/480c1fe6c4386ae8c34d9b9299ebdbd5?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HdyYBfh5VvbtosTOEGP92PV8eCg7BwWx2~n5Gkc9Sxk-5LwWJmaYMEjYD~s~yhnqsf3N9QdY2SM-hmDE3tijWx~YrpnhXFG-ceZeKINUiKO4Tfrk4aRbcJbjj6nEPRhVZL0nfyzGz5AobTMXpT9k1YVOJDKsFZk8TtJ5wnjsFgfmn7atgoySBui4b~jAihDlOpjWp4C3rGQz3YfEgmTh6CNGdr1Q2GiRu6z9HfB4lGw-TXygmXAxaHCvepQwL8IitJAf4HXX1Q5DSvJn9OMJXl-4Ta4l2BzAd7QTiokPlxJj~z25ZVLGAm02aphwBbccIGvfNhPwmNKieV2w7QDhwQ__" alt="Samantha Kelly" fill className="object-cover" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Samantha Kelly</h3>
                        <p className="text-gray-400 text-sm">Founder</p>
                    </div>
                </div>
                <blockquote className="text-white text-lg">
                    &quot;I love the analytics that labor.design offers all in one place. I love the analytics that labor.design offers
                    all places.&quot;
                </blockquote>
            </div>
        </div>
    )
}