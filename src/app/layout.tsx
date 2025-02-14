import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'
import React from 'react'; // Import React
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GOCourier - Swift & Secure Courier Services',
  description: 'Your trusted courier every step of the way',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastContainer /> 
      </body>
    </html>
  )
}