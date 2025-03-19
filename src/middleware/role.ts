import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RoleEnum } from "@/app/models/user";

export function roleAuthMiddleware(allowedRoles: RoleEnum[]) {
    return (req: NextRequest) => {
        const token = req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "secret") as JwtPayload;

            if (!decoded.role || !allowedRoles.includes(decoded.role as RoleEnum)) {
                return NextResponse.json({ error: "Access Denied" }, { status: 403 });
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Role Middleware Error:", error);
            return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
        }
    };
}