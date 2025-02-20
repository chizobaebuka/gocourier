import { z } from "zod";

// Define the Zod schema for package creation
export const createPackageSchema = z.object({
    recipient: z.object({
        fullName: z.string().min(1, "Full name is required").max(255),
        address: z.string().min(1, "Address is required").max(255),
        email: z.string().email("Invalid email format").optional(),
    }),
    sender: z.object({
        fullName: z.string().min(1, "Full name is required").max(255),
        address: z.string().min(1, "Address is required").max(255),
        email: z.string().email("Invalid email format").optional(),
    }),
    details: z.object({
        description: z.string().min(1, "Description is required").max(255),
        weight: z.number().positive("Weight must be a positive number"),
        dimensions: z.object({
            length: z.number().positive("Length must be a positive number"),
            width: z.number().positive("Width must be a positive number"),
            height: z.number().positive("Height must be a positive number"),
        }),
        value: z.number().positive("Value must be a positive number"),
    }),
    currentLocation: z.object({
        lat: z.number().refine((val) => !isNaN(val), "Latitude must be a valid number"),
        lng: z.number().refine((val) => !isNaN(val), "Longitude must be a valid number"),
    }).optional(),
    destinationLocation: z.object({
        lat: z.number().refine((val) => !isNaN(val), "Latitude must be a valid number"),
        lng: z.number().refine((val) => !isNaN(val), "Longitude must be a valid number"),
    }).optional(),
    status: z.enum(["created", "in-transit", "delivered"]).optional(),
});

export const updatePackageSchema = z.object({
    sender: z
        .object({
            fullName: z.string().min(1, "Sender's full name is required").optional(),
            address: z.string().min(1, "Sender's address is required").optional(),
            email: z.string().email("Invalid email").optional(),
        })
        .optional(),

    recipient: z
        .object({
            fullName: z.string().min(1, "Recipient's full name is required").optional(),
            address: z.string().min(1, "Recipient's address is required").optional(),
            email: z.string().email("Invalid email").optional(),
        })
        .optional(),

    details: z
        .object({
            description: z.string().optional(),
            weight: z.number().positive("Weight must be greater than 0").optional(),
            dimensions: z
                .object({
                    length: z.number().positive("Length must be greater than 0").optional(),
                    width: z.number().positive("Width must be greater than 0").optional(),
                    height: z.number().positive("Height must be greater than 0").optional(),
                })
                .optional(),
            value: z.number().positive("Value must be greater than 0").optional(),
        })
        .optional(),

    status: z.enum(["created", "in-transit", "delivered"]).optional(),
    currentLocation: z
        .object({
            lat: z.number().optional(),
            lng: z.number().optional(),
        })
        .optional(),

    destinationLocation: z
        .object({
            lat: z.number().optional(),
            lng: z.number().optional(),
        })
        .optional(),
});

export type PackageData = z.infer<typeof createPackageSchema>;
export type UpdatePackageData = z.infer<typeof updatePackageSchema>;