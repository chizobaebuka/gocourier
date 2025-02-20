import mongoose from "mongoose";

export interface IPackage extends mongoose.Document {
    trackingNumber: string;
    sender: {
        fullName: string;
        email: string;
        address: string;
    };
    recipient: { fullName: string; email: string; address: string; };
    details: {
        description: string;
        weight: number;
        dimensions: { length: number; width: number; height: number };
        value: number;
    };
    status: "created" | "in-transit" | "delivered";
    currentLocation: { lat: number; lng: number };
    destinationLocation: { lat: number; lng: number };
}

const packageSchema = new mongoose.Schema<IPackage>(
    {
        trackingNumber: { type: String, required: true, unique: true },
        sender: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            address: { type: String, required: true },
        },
        recipient: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            address: { type: String, required: true },
        },
        details: {
            description: { type: String },
            weight: { type: Number },
            dimensions: {
                length: { type: Number },
                width: { type: Number },
                height: { type: Number },
            },
            value: { type: Number },
        },
        status: { type: String, enum: ["created", "in-transit", "delivered"], default: "created" },
        currentLocation: {
            lat: { type: Number },
            lng: { type: Number },
        },
        destinationLocation: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
    { timestamps: true }
);

// Model export
const PackageModel = mongoose.models.Package || mongoose.model<IPackage>("Package", packageSchema);
export { PackageModel as Package };