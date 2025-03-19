import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { to, subject, text, html } = body;

        // Send email
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to,
            subject,
            text,
            html,
        });

        return NextResponse.json({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
} 