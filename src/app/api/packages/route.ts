import { Package } from "@/app/models/package";
import { connectDB } from "@/lib/db";
import { generateTrackingNumber, getCoordinatesFromAddress } from "@/lib/utils";
import { createPackageSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const body = await req.json();

        // Validate the request body using Zod
        const validatedData = createPackageSchema.parse(body);

        // Generate a unique tracking number
        const trackingNumber = generateTrackingNumber(validatedData.details.description);

        // Fetch coordinates for sender's and recipient's addresses
        const senderCoordinates = await getCoordinatesFromAddress(validatedData.sender.address);
        const recipientCoordinates = await getCoordinatesFromAddress(validatedData.recipient.address);

        // Ensure coordinates are valid or provide defaults
        const currentLocation = senderCoordinates && senderCoordinates.lat !== undefined && senderCoordinates.lng !== undefined
            ? senderCoordinates
            : undefined;

        const destinationLocation = recipientCoordinates && recipientCoordinates.lat !== undefined && recipientCoordinates.lng !== undefined
            ? recipientCoordinates
            : undefined;

        // Create a new package instance
        const newPackage = new Package({
            ...validatedData,
            trackingNumber,
            ...(currentLocation ? { currentLocation } : {}), // Only add if defined
            ...(destinationLocation ? { destinationLocation } : {}), // Only add if defined
        });

        // Save to DB
        await newPackage.save();

        return NextResponse.json(
            { success: true, data: newPackage },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors.map((issue) => issue.message).join(", ") },
                { status: 400 }
            );
        }

        console.error("Error creating package:", error);
        return NextResponse.json(
            { error: "Failed to create package" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const url = new URL(req.url);
        const trackingNumber = url.searchParams.get("trackingNumber");

        let packages;
        if (trackingNumber) {
            // Fetch a single package by tracking number
            packages = await Package.findOne({ trackingNumber });

            if (!packages) {
                return NextResponse.json({ error: "Package not found" }, { status: 404 });
            }
        } else {
            // Fetch all packages if no tracking number is provided
            packages = await Package.find();
        }

        return NextResponse.json({ success: true, packages }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving package(s):", error);
        return NextResponse.json({ error: "Failed to retrieve package(s)" }, { status: 500 });
    }
}