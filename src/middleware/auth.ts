import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/app/models/user";

export interface AuthRequest extends NextRequest {
    user?: JwtPayload & { _id: string; email: string; role: string, type: string };
}

export async function authMiddleware(req: NextRequest) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "secret") as JwtPayload & { _id: string };

        // Fetch the user from the database
        const user = await User.findById(decoded._id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Attach user info to the request
        (req as AuthRequest).user = {
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
            type: user.type
        };

        return NextResponse.next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }
}