import { NextResponse } from "next/server";
import { User } from "@/app/models/user";  
import { connectDB } from "../../../../lib/db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password, name, accountType, role = "user" } = await req.json(); 

        // Validate required fields
        if (!email || !password || !name || !accountType) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 }); // Use 409 Conflict
        }

        const user = await User.create({
            email,
            password,
            name,
            role,
            accountType, 
        });

        try {
            await transporter.sendMail({
                from: process.env.SMTP_FROM_EMAIL,
                to: email,
                subject: 'Welcome to GoCourier!',
                text: `
                    Hi ${name},
                    
                    Welcome to GoCourier! We're excited to have you on board.
                    
                    You've successfully created a ${accountType} account.
                    
                    You can now log in and start using our services.
                    
                    Best regards,
                    The GoCourier Team
                `,
                html: `
                    <h2>Welcome to GoCourier!</h2>
                    <p>Hi ${name},</p>
                    <p>Welcome to GoCourier! We're excited to have you on board.</p>
                    <p>You've successfully created a <strong>${accountType}</strong> account.</p>
                    <p>You can now log in and start using our services.</p>
                    <br>
                    <p>Best regards,</p>
                    <p>The GoCourier Team</p>
                `
            });
        } catch (emailError) {
            console.error("Email sending error:", emailError);
        }

        return NextResponse.json({ message: "User created successfully", role: user.role, type: user.type }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}