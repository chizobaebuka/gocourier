import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../models/user";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET ?? "your-secret-key";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = sign(
            { userId: user._id, role: user.role, type: user.type },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set HTTP-only cookie
        const response = NextResponse.json({ message: "Login successful", role: user.role, type: user.type });
        response.headers.set(
            "Set-Cookie",
            serialize("token", token, {
                httpOnly: true,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, 
            })
        );

        return response;
    } catch (error) {
        console.error("Signin error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}