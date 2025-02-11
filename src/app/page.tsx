import React from 'react'
import { Hero } from '../components/hero'
import { Features } from '../components/features'
import { Services } from '../components/services'
import { AppPreview } from '../components/app-preview'
import { Testimonial } from '../components/testimonial'
import { Newsletter } from '../components/newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <AppPreview />
      <Testimonial />
      <Newsletter />
    </>
  )
}

// export default function Home() {
//   return (
//     <>
//       <section id="hero">
//         <Hero />
//       </section>

//       {/* Features Section */}
//       <section id="features">
//         <Features />
//       </section>

//       {/* Services Section */}
//       <section id="services">
//         <Services />
//       </section>

//       {/* App Preview Section */}
//       <section id="app-preview">
//         <AppPreview />
//       </section>

//       {/* Testimonial Section */}
//       <section id="testimonial">
//         <Testimonial />
//       </section>

//       {/* Newsletter Section */}
//       <section id="newsletter">
//         <Newsletter />
//       </section>
//     </>
//   )
// }