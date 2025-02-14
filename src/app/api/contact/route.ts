import { NextResponse } from "next/server"

// You might want to use a library like Zod for more robust validation
function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { firstName, lastName, email, phone, message } = body

        // Validate the input
        if (!firstName || !lastName || !email || !phone || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        if (!validateEmail(email)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        // Here you would typically integrate with your email service or database
        // For this example, we'll just log the data
        console.log("Contact form submission:", { firstName, lastName, email, phone, message })

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real-world scenario, you might do something like this:
        // await sendEmail({
        //   to: 'support@gocourier.com',
        //   subject: 'New Contact Form Submission',
        //   body: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        // })

        return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error processing contact form:", error)
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }
}

