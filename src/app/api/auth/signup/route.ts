import { NextResponse } from "next/server";
import { User } from "@/app/models/user";  
import { connectDB } from "../../../../lib/db";

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

        // Create new user
        const user = await User.create({
            email,
            password,
            name,
            role,
            accountType, 
        });

        return NextResponse.json({ message: "User created successfully", role: user.role, type: user.type }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}