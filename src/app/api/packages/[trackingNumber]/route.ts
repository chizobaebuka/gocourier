import { IPackage, Package } from "@/app/models/package";
import { connectDB } from "@/lib/db";
import { getCoordinatesFromAddress } from "@/lib/utils";
import { updatePackageSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(req: NextRequest) {
    await connectDB();

    try {
        const body = await req.json();
        const trackingNumber = req.nextUrl.pathname.split("/").pop();
        console.log({ trackingNumber });

        if (!trackingNumber) {
            return NextResponse.json({ error: "Tracking number missing" }, { status: 400 });
        }

        console.log("Received Tracking Number:", trackingNumber);
        console.log("Received Data:", body); // Debugging

        // Validate input data
        const validatedData = updatePackageSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json(
                { error: validatedData.error.errors.map(e => e.message).join(", ") },
                { status: 400 }
            );
        }

        // Find package by tracking number
        const existingPackage = await Package.findOne({ trackingNumber });
        if (!existingPackage) {
            return NextResponse.json({ error: "Package not found" }, { status: 404 });
        }

        console.log("Existing Package Found:", existingPackage);

        // Prepare update fields
        const updateFields: Partial<IPackage> = {};

        if (validatedData.data.recipient) {
            updateFields.recipient = {
                ...existingPackage.recipient.toObject(),
                ...validatedData.data.recipient,
            };
        }

        if (validatedData.data.sender) {
            updateFields.sender = {
                ...existingPackage.sender.toObject(),
                ...validatedData.data.sender,
            };
        }

        if (validatedData.data.details) {
            updateFields.details = {
                ...existingPackage.details.toObject(),
                ...validatedData.data.details,
            };
        }

        if (validatedData.data.status) {
            updateFields.status = validatedData.data.status;
        }

        if (validatedData.data.recipient?.address) {
            const newDestinationCoordinates = await getCoordinatesFromAddress(validatedData.data.recipient.address);

            if (newDestinationCoordinates && existingPackage.destinationLocation !== newDestinationCoordinates) {
                updateFields.destinationLocation = newDestinationCoordinates;
            }
        }

        console.log("Updating with Fields:", updateFields); // Debugging

        // Update package
        const updatedPackage = await Package.findOneAndUpdate(
            { trackingNumber },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedPackage) {
            return NextResponse.json({ error: "Package update failed" }, { status: 500 });
        }

        await updatedPackage.save();
        
        console.log("Updated Package:", updatedPackage);

        return NextResponse.json({ success: true, package: updatedPackage }, { status: 200 });

    } catch (error) {
        console.error("Update Package Error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors.map((issue) => issue.message).join(", ") },
                { status: 400 }
            );
        }

        return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await connectDB();
    try {
        // Extract trackingNumber from URL
        const trackingNumber = req.nextUrl.pathname.split("/").pop();

        if (!trackingNumber) {
            return NextResponse.json({ error: "Tracking number missing" }, { status: 400 });
        }

        const pkg = await Package.findOne({ trackingNumber });
        if(!pkg) {
            return NextResponse.json({ error: "Package not found" }, { status: 404 });
        }

        // Find and delete package
        const deletedPackage = await Package.findOneAndDelete({ _id: pkg._id });

        if (!deletedPackage) {
            return NextResponse.json({ error: "Package not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Package deleted successfully" }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors.map((issue) => issue.message).join(", ") },
                { status: 400 }
            );
        }
    
        console.error("Error updating package:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: `Failed to update package: ${errorMessage}` }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const trackingNumber = searchParams.get("trackingNumber");
        const status = searchParams.get("status");

        const allowedStatuses: IPackage["status"][] = ["created", "in-transit", "delivered"];

        const query: Partial<Pick<IPackage, "trackingNumber" | "status">> = {};
        if (trackingNumber) query.trackingNumber = trackingNumber;
        if (status && allowedStatuses.includes(status as IPackage["status"])) {
            query.status = status as IPackage["status"];
        }

        const packages = await Package.find(query);

        if (!packages.length) {
            return NextResponse.json({ error: "No packages found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, packages }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving package(s):", error);
        return NextResponse.json({ error: "Failed to retrieve package(s)" }, { status: 500 });
    }
}