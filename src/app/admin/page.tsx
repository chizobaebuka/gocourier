'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createPackageSchema, updatePackageSchema } from "@/lib/validators";

interface PackageData {
    sender: { fullName: string; address: string; email?: string };
    recipient: { fullName: string; address: string; email?: string };
    details: {
        description: string;
        weight: number;
        dimensions: { length: number; width: number; height: number };
        value: number;
    };
    status: "created" | "in-transit" | "delivered";
    currentLocation?: { lat: number; lng: number };
    destinationLocation?: { lat: number; lng: number };
}

const initialCreateFormData: PackageData = {
    sender: { fullName: "", address: "", email: "" },
    recipient: { fullName: "", address: "", email: "" },
    details: {
        description: "",
        weight: 0,
        dimensions: { length: 0, width: 0, height: 0 },
        value: 0,
    },
    status: "created",
    currentLocation: { lat: 0, lng: 0 },
    destinationLocation: { lat: 0, lng: 0 },
};

const initialUpdateFormData: Partial<PackageData> = {};

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"send" | "edit">("send");
    const [formData, setFormData] = useState<Partial<PackageData>>(
        activeTab === "send" ? initialCreateFormData : initialUpdateFormData
    );
    const [trackingNumber, setTrackingNumber] = useState("");

    // Handle input changes
    const handleInputChange = (
        section: keyof PackageData,
        field: string,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...(prev[section] as object || {}),
                [field]: value,
            },
        }));
    };

    const handleTabChange = (tab: "send" | "edit") => {
        setActiveTab(tab);
        setFormData(tab === "send" ? initialCreateFormData : initialUpdateFormData);
        setTrackingNumber("");
    };

    // Handle nested input changes (e.g., dimensions)
    const handleNestedInputChange = <
        S extends keyof PackageData,
        SS extends keyof NonNullable<PackageData[S]>
    >(
        section: S,
        subSection: SS,
        field: keyof NonNullable<PackageData[S] extends object ? PackageData[S][SS] : never>,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...(typeof prev[section] === 'object' ? prev[section] : {}),
                [subSection]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ...(prev[section] as Record<SS, any>)[subSection],
                    [field]: value,
                },
            },
        }));
    };

    // Handle sending a new package
    const handleSendPackage = async () => {
        console.log("handleSendPackage triggered"); // Debugging
        try {
            const validatedData = createPackageSchema.parse(formData);
            console.log("Validation passed", validatedData); // Debugging

            const response = await fetch("/api/packages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData),
            });

            console.log("Response received", response); // Debugging

            if (response.ok === true) {
                toast.success("Package created successfully!");
                setFormData({
                    sender: { fullName: "", address: "", email: "" },
                    recipient: { fullName: "", address: "", email: "" },
                    details: {
                        description: "",
                        weight: 0,
                        dimensions: { length: 0, width: 0, height: 0 },
                        value: 0,
                    },
                    status: "created",
                });
            } else {
                const errorMessage = await response.text();
                console.error("Error from server:", errorMessage);
                toast.error(errorMessage || "Failed to create package.");
            }
        } catch (error) {
            console.error("Error caught:", error);

            if (error instanceof z.ZodError) {
                toast.error(error.errors.map((issue) => issue.message).join(", "));
            } else {
                toast.error("Failed to create package. Please try again.");
            }
        }
    };

    // Handle updating an existing package
    const handleUpdatePackage = async () => {
        console.log("handleUpdatePackage triggered");
    
        if (!trackingNumber) {
            toast.error("Please enter a tracking number.");
            return;
        }
    
        try {
            const validatedData = updatePackageSchema.parse(formData);
            console.log("Validation passed", validatedData);
    
            const response = await fetch(`/api/packages/${trackingNumber}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData),
            });
    
            if (response.ok) {
                toast.success("Package updated successfully!");
                setFormData({
                    sender: { fullName: "", address: "", email: "" },
                    recipient: { fullName: "", address: "", email: "" },
                    details: {
                        description: "",
                        weight: 0,
                        dimensions: { length: 0, width: 0, height: 0 },
                        value: 0,
                    },
                    status: "created",
                });
            } else {
                const errorMessage = response.statusText;
                console.error("Error from server:", errorMessage);
                toast.error(errorMessage || "Failed to update package.");
            }
        } catch (error) {
            console.error("Error caught:", error);
    
            if (error instanceof z.ZodError) {
                toast.error(error.errors.map((issue) => issue.message).join(", "));
            } else {
                toast.error("Failed to update package. Please try again.");
            }
        }
    };

    // Helper function to parse numeric inputs
    const parseNumericInput = (value: string) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    return (
        <div className="flex h-screen bg-gray-100 mt-14">
            {/* Sidebar */}
            <div className="w-64 bg-navy-900 text-white p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
                    <Button
                        onClick={() => handleTabChange("send")}
                        className={`w-full justify-start ${activeTab === "send" ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        Send Package
                    </Button>
                    <Button
                        onClick={() => handleTabChange("edit")}
                        className={`w-full justify-start mt-2 ${activeTab === "edit" ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        Edit Package
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === "send" && (
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <h2 className="text-2xl font-bold">Send Package</h2>

                        {/* Sender Information */}
                        <div>
                            <Label htmlFor="sender-fullName">Sender Full Name</Label>
                            <Input
                                id="sender-fullName"
                                name="senderFullName"
                                value={formData.sender?.fullName ?? ""}
                                onChange={(e) => handleInputChange("sender", "fullName", e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="sender-address">Sender Address</Label>
                            <Input
                                id="sender-address"
                                name="senderAddress"
                                value={formData.sender?.address ?? ""}
                                onChange={(e) => handleInputChange("sender", "address", e.target.value)}
                                autoComplete="street-address"
                            />
                        </div>
                        <div>
                            <Label htmlFor="sender-email">Sender Email (Optional)</Label>
                            <Input
                                id="sender-email"
                                name="senderEmail"
                                type="email"
                                value={formData.sender?.email ?? ""}
                                onChange={(e) => handleInputChange("sender", "email", e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        {/* Recipient Information */}
                        <div>
                            <Label htmlFor="recipient-fullName">Recipient Full Name</Label>
                            <Input
                                id="recipient-fullName"
                                name="recipientFullName"
                                value={formData.recipient?.fullName ?? ""}
                                onChange={(e) => handleInputChange("recipient", "fullName", e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="recipient-address">Recipient Address</Label>
                            <Input
                                id="recipient-address"
                                name="recipientAddress"
                                value={formData.recipient?.address ?? ""}
                                onChange={(e) => handleInputChange("recipient", "address", e.target.value)}
                                autoComplete="street-address"
                            />
                        </div>
                        <div>
                            <Label htmlFor="recipient-email">Recipient Email (Optional)</Label>
                            <Input
                                id="recipient-email"
                                name="recipientEmail"
                                type="email"
                                value={formData.recipient?.email ?? ""}
                                onChange={(e) => handleInputChange("recipient", "email", e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        {/* Package Details */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="packageDescription"
                                value={formData.details?.description ?? ""}
                                onChange={(e) => handleInputChange("details", "description", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                name="packageWeight"
                                type="number"
                                value={formData.details?.weight ?? 0}
                                onChange={(e) => handleInputChange("details", "weight", parseNumericInput(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Label htmlFor="length">Length (cm)</Label>
                                <Input
                                    id="length"
                                    name="packageLength"
                                    type="number"
                                    value={formData.details?.dimensions?.length ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "length", parseNumericInput(e.target.value))}
                                />
                                <Label htmlFor="width">Width (cm)</Label>
                                <Input
                                    id="width"
                                    name="packageWidth"
                                    type="number"
                                    value={formData.details?.dimensions?.width ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "width", parseNumericInput(e.target.value))}
                                />
                                <Label htmlFor="height">Height (cm)</Label>
                                <Input
                                    id="height"
                                    name="packageHeight"
                                    type="number"
                                    value={formData.details?.dimensions?.height ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "height", parseNumericInput(e.target.value))}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="value">Value ($)</Label>
                            <Input
                                id="value"
                                name="packageValue"
                                type="number"
                                value={formData.details?.value ?? 0}
                                onChange={(e) => handleInputChange("details", "value", parseNumericInput(e.target.value))}
                            />
                        </div>

                        <Button type="button" onClick={handleSendPackage}>Send Package</Button>
                    </form>
                )}

                {activeTab === "edit" && (
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <h2 className="text-2xl font-bold">Edit Package</h2>

                        <div>
                            <Label htmlFor="tracking-number">Tracking Number</Label>
                            <Input
                                id="tracking-number"
                                name="tracking-number"
                                type="text"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                            />
                        </div>

                        {/* Sender Information */}
                        <div>
                            <Label htmlFor="edit-sender-fullName">Sender Full Name</Label>
                            <Input
                                id="edit-sender-fullName"
                                name="edit-sender-fullName"
                                type="text"
                                autoComplete="name"
                                value={formData.sender?.fullName ?? ""}
                                onChange={(e) => handleInputChange("sender", "fullName", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-sender-address">Sender Address</Label>
                            <Input
                                id="edit-sender-address"
                                name="edit-sender-address"
                                type="text"
                                autoComplete="street-address"
                                value={formData.sender?.address ?? ""}
                                onChange={(e) => handleInputChange("sender", "address", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-sender-email">Sender Email (Optional)</Label>
                            <Input
                                id="edit-sender-email"
                                name="edit-sender-email"
                                autoComplete="email"
                                type="email"
                                value={formData.sender?.email ?? ""}
                                onChange={(e) => handleInputChange("sender", "email", e.target.value)}
                            />
                        </div>

                        {/* Recipient Information */}
                        <div>
                            <Label htmlFor="edit-recipient-fullName">Recipient Full Name</Label>
                            <Input
                                id="edit-recipient-fullName"
                                name="edit-recipient-fullName"
                                type="text"
                                autoComplete="name"
                                value={formData.recipient?.fullName ?? ""}
                                onChange={(e) => handleInputChange("recipient", "fullName", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-recipient-address">Recipient Address</Label>
                            <Input
                                id="edit-recipient-address"
                                name="edit-recipient-address"
                                type="text"
                                autoComplete="street-address"
                                value={formData.recipient?.address ?? ""}
                                onChange={(e) => handleInputChange("recipient", "address", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-recipient-email">Recipient Email (Optional)</Label>
                            <Input
                                id="edit-recipient-email"
                                name="edit-recipient-email"
                                type="email"
                                autoComplete="email"
                                value={formData.recipient?.email ?? ""}
                                onChange={(e) => handleInputChange("recipient", "email", e.target.value)}
                            />
                        </div>

                        {/* Package Details */}
                        <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Input
                                id="edit-description"
                                name="edit-description"
                                autoComplete="description"
                                type="text"
                                value={formData.details?.description ?? ""}
                                onChange={(e) => handleInputChange("details", "description", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-weight">Weight (kg)</Label>
                            <Input
                                id="edit-weight"
                                name="edit-weight"
                                autoComplete="weight"
                                type="number"
                                value={formData.details?.weight ?? 0}
                                onChange={(e) => handleInputChange("details", "weight", parseNumericInput(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Label htmlFor="edit-length">Length (cm)</Label>
                                <Input
                                    id="edit-length"
                                    name="edit-length"
                                    autoComplete="length"
                                    placeholder="Length"
                                    type="number"
                                    value={formData.details?.dimensions?.length ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "length", parseNumericInput(e.target.value))}
                                />
                                <Label htmlFor="edit-width">Width (cm)</Label>
                                <Input
                                    id="edit-width"
                                    name="edit-width"
                                    autoComplete="width"
                                    placeholder="Width"
                                    type="number"
                                    value={formData.details?.dimensions?.width ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "width", parseNumericInput(e.target.value))}
                                />
                                <Input
                                    id="edit-height"
                                    name="edit-height"
                                    autoComplete="height"
                                    placeholder="Height"
                                    type="number"
                                    value={formData.details?.dimensions?.height ?? 0}
                                    onChange={(e) => handleNestedInputChange("details", "dimensions", "height", parseNumericInput(e.target.value))}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="edit-value">Value ($)</Label>
                            <Input
                                id="edit-value"
                                name="edit-value"
                                autoComplete="value"
                                type="number"
                                value={formData.details?.value ?? 0}
                                onChange={(e) => handleInputChange("details", "value", parseNumericInput(e.target.value))}
                            />
                        </div>

                        <Button type="button" onClick={handleUpdatePackage}>Update Package</Button>
                    </form>
                )}
            </div>
        </div>
    );
}

// 'use client';
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { z } from "zod";
// import { toast } from "react-hot-toast";
// import { createPackageSchema, updatePackageSchema } from "@/lib/validators";
// interface PackageData {
//     sender: { fullName: string; address: string; email?: string };
//     recipient: { fullName: string; address: string; email?: string };
//     details: {
//         description: string;
//         weight: number;
//         dimensions: { length: number; width: number; height: number };
//         value: number;
//     };
//     status: "created" | "in-transit" | "delivered";
//     currentLocation?: { lat: number; lng: number };
//     destinationLocation?: { lat: number; lng: number };
// }

// export default function AdminPage() {
//     const [activeTab, setActiveTab] = useState<"send" | "edit">("send");
//     const [formData, setFormData] = useState<Partial<PackageData>>({
//         sender: { fullName: "", address: "", email: "" },
//         recipient: { fullName: "", address: "", email: "" },
//         details: {
//             description: "",
//             weight: 0,
//             dimensions: { length: 0, width: 0, height: 0 },
//             value: 0,
//         },
//         status: "created",
//     });
//     const [trackingNumber, setTrackingNumber] = useState("");

//     // Handle input changes
//     const handleInputChange = (
//         section: keyof PackageData,
//         field: string,
//         value: string | number
//     ) => {
//         setFormData((prev) => ({
//             ...prev,
//             [section]: {
//                 ...(typeof prev[section] === 'object' ? prev[section] : {}),
//                 [field]: value,
//             },
//         }));
//     };

//     // Handle nested input changes (e.g., dimensions)
//     const handleNestedInputChange = <
//         S extends keyof PackageData,
//         SS extends keyof NonNullable<PackageData[S]>
//     >(
//         section: S,
//         subSection: SS,
//         field: keyof NonNullable<PackageData[S] extends object ? PackageData[S][SS] : never>,
//         value: string | number
//     ) => {
//         setFormData((prev) => ({
//             ...prev,
//             [section]: {
//                 ...(typeof prev[section] === 'object' ? prev[section] : {}),
//                 [subSection]: {
//                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                     ...(prev[section] as Record<SS, any>)[subSection],
//                     [field]: value,
//                 },
//             },
//         }));
//     };

//     // Handle sending a new package
//     const handleSendPackage = async () => {
//         try {
//             const validatedData = createPackageSchema.parse(formData);
//             const response = await fetch("/api/packages", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(validatedData),
//             });
//             console.log({ response })

//             if (response.ok) {
//                 toast.success("Package created successfully!");
//                 setFormData({
//                     sender: { fullName: "", address: "", email: "" },
//                     recipient: { fullName: "", address: "", email: "" },
//                     details: {
//                         description: "",
//                         weight: 0,
//                         dimensions: { length: 0, width: 0, height: 0 },
//                         value: 0,
//                     },
//                     status: "created",
//                 });
//             } else {
//                 const errorMessage = await response.text();
//                 toast.error(errorMessage || "Failed to create package.");
//             }
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 toast.error(error.errors.map((issue) => issue.message).join(", "));
//             } else {
//                 toast.error("Failed to create package. Please try again.");
//             }
//         }
//     };

//     // Handle updating an existing package
//     const handleUpdatePackage = async () => {
//         try {
//             const validatedData = updatePackageSchema.parse({
//                 trackingNumber,
//                 sender: formData.sender?.fullName ? formData.sender : undefined,
//                 recipient: formData.recipient?.fullName ? formData.recipient : undefined,
//                 details: formData.details?.description
//                     ? {
//                         ...formData.details,
//                         dimensions: formData.details.dimensions?.length
//                             ? formData.details.dimensions
//                             : undefined,
//                     }
//                     : undefined,
//                 status: formData.status,
//                 currentLocation: formData.currentLocation,
//                 destinationLocation: formData.destinationLocation,
//             });

//             const response = await fetch(`/api/packages/${trackingNumber}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(validatedData),
//             });

//             if (response.ok) {
//                 toast.success("Package updated successfully!");
//                 setTrackingNumber("");
//                 setFormData({
//                     sender: { fullName: "", address: "", email: "" },
//                     recipient: { fullName: "", address: "", email: "" },
//                     details: {
//                         description: "",
//                         weight: 0,
//                         dimensions: { length: 0, width: 0, height: 0 },
//                         value: 0,
//                     },
//                     status: "created",
//                 });
//             } else {
//                 const errorMessage = await response.text();
//                 toast.error(errorMessage ?? "Failed to update package.");
//             }
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 toast.error(error.errors.map((issue) => issue.message).join(", "));
//             } else {
//                 toast.error("Failed to update package. Please try again.");
//             }
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100 mt-14">
//             {/* Sidebar */}
//             <div className="w-64 bg-navy-900 text-white p-4 flex flex-col justify-between">
//                 <div>
//                     <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
//                     <Button
//                         onClick={() => setActiveTab("send")}
//                         className={`w-full justify-start ${activeTab === "send" ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-700"
//                             }`}
//                     >
//                         Send Package
//                     </Button>
//                     <Button
//                         onClick={() => setActiveTab("edit")}
//                         className={`w-full justify-start mt-2 ${activeTab === "edit" ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-700"
//                             }`}
//                     >
//                         Edit Package
//                     </Button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-6 overflow-y-auto">
//                 {activeTab === "send" && (
//                     <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//                         <h2 className="text-2xl font-bold">Send Package</h2>

//                         {/* Sender Information */}
//                         <div>
//                             <Label htmlFor="sender-fullName">Sender Full Name</Label>
//                             <Input
//                                 id="sender-fullName"
//                                 value={formData.sender?.fullName ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "fullName", e.target.value)}
//                                 autoComplete="name"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="sender-address">Sender Address</Label>
//                             <Input
//                                 id="sender-address"
//                                 value={formData.sender?.address ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "address", e.target.value)}
//                                 autoComplete="street-address"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="sender-email">Sender Email (Optional)</Label>
//                             <Input
//                                 id="sender-email"
//                                 type="email"
//                                 value={formData.sender?.email ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "email", e.target.value)}
//                                 autoComplete="email"
//                             />
//                         </div>

//                         {/* Recipient Information */}
//                         <div>
//                             <Label htmlFor="recipient-fullName">Recipient Full Name</Label>
//                             <Input
//                                 id="recipient-fullName"
//                                 name="fullName"
//                                 type="text"
//                                 value={formData.recipient?.fullName ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "fullName", e.target.value)}
//                                 autoComplete="name"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="recipient-address">Recipient Address</Label>
//                             <Input
//                                 id="recipient-address"
//                                 name="address"
//                                 type="text"
//                                 value={formData.recipient?.address ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "address", e.target.value)}
//                                 autoComplete="street-address"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="recipient-email">Recipient Email (Optional)</Label>
//                             <Input
//                                 id="recipient-email"
//                                 type="email"
//                                 value={formData.recipient?.email ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "email", e.target.value)}
//                                 autoComplete="email"
//                             />
//                         </div>

//                         {/* Package Details */}
//                         <div>
//                             <Label htmlFor="description">Description</Label>
//                             <Input
//                                 id="description"
//                                 name="description"
//                                 type="text"
//                                 value={formData.details?.description ?? ""}
//                                 onChange={(e) => handleInputChange("details", "description", e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="weight">Weight (kg)</Label>
//                             <Input
//                                 id="weight"
//                                 name="weight"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.weight ?? 0}
//                                 onChange={(e) => handleInputChange("details", "weight", parseFloat(e.target.value))}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="dimensions">Dimensions (cm)</Label>
//                             <Input
//                                 id="length"
//                                 name="length"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.dimensions?.length ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "length", parseFloat(e.target.value))}
//                             />
//                             <Input
//                                 id="width"
//                                 name="width"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.dimensions?.width ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "width", parseFloat(e.target.value))}
//                             />
//                             <Input
//                                 id="height"
//                                 name="height"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.dimensions?.height ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "height", parseFloat(e.target.value))}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="value">Value ($)</Label>
//                             <Input
//                                 id="value"
//                                 name="value"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.value ?? 0}
//                                 onChange={(e) => handleInputChange("details", "value", parseFloat(e.target.value))}
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <Button onClick={handleSendPackage}>Send Package</Button>
//                     </form>
//                 )}

//                 {activeTab === "edit" && (
//                     <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//                         <h2 className="text-2xl font-bold">Edit Package</h2>

//                         {/* Tracking Number */}
//                         <div>
//                             <Label htmlFor="tracking-number">Tracking Number</Label>
//                             <Input
//                                 id="tracking-number"
//                                 name="trackingNumber"
//                                 type="text"
//                                 value={trackingNumber}
//                                 onChange={(e) => setTrackingNumber(e.target.value)}
//                             />
//                         </div>

//                         {/* Sender Information */}
//                         <div>
//                             <Label htmlFor="sender-fullName">Sender Full Name</Label>
//                             <Input
//                                 id="sender-fullName"
//                                 name="fullName"
//                                 type="text"
//                                 value={formData.sender?.fullName ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "fullName", e.target.value)}
//                                 autoComplete="name"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="sender-address">Sender Address</Label>
//                             <Input
//                                 id="sender-address"
//                                 name="address"
//                                 type="text"
//                                 value={formData.sender?.address ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "address", e.target.value)}
//                                 autoComplete="street-address"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="sender-email">Sender Email (Optional)</Label>
//                             <Input
//                                 id="sender-email"
//                                 name="email"
//                                 type="email"
//                                 value={formData.sender?.email ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "email", e.target.value)}
//                                 autoComplete="email"
//                             />
//                         </div>

//                         {/* Recipient Information */}
//                         <div>
//                             <Label htmlFor="recipient-fullName">Recipient Full Name</Label>
//                             <Input
//                                 id="recipient-fullName"
//                                 name="fullName"
//                                 type="text"
//                                 value={formData.recipient?.fullName ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "fullName", e.target.value)}
//                                 autoComplete="name"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="recipient-address">Recipient Address</Label>
//                             <Input
//                                 id="recipient-address"
//                                 name="address"
//                                 type="text"
//                                 value={formData.recipient?.address ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "address", e.target.value)}
//                                 autoComplete="street-address"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="recipient-email">Recipient Email (Optional)</Label>
//                             <Input
//                                 id="recipient-email"
//                                 name="email"
//                                 type="email"
//                                 value={formData.recipient?.email ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "email", e.target.value)}
//                                 autoComplete="email"
//                             />
//                         </div>

//                         {/* Package Details */}
//                         <div>
//                             <Label htmlFor="description">Description</Label>
//                             <Input
//                                 id="description"
//                                 name="description"
//                                 type="text"
//                                 value={formData.details?.description ?? ""}
//                                 onChange={(e) => handleInputChange("details", "description", e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="weight">Weight (kg)</Label>
//                             <Input
//                                 id="weight"
//                                 name="weight"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.weight ?? 0}
//                                 onChange={(e) => handleInputChange("details", "weight", parseFloat(e.target.value))}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="dimensions">Dimensions (cm)</Label>
//                             <Input
//                                 id="length"
//                                 name="length"
//                                 type="number"
//                                 placeholder="Length"
//                                 value={formData.details?.dimensions?.length ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "length", parseFloat(e.target.value))}
//                             />
//                             <Input
//                                 id="width"
//                                 name="width"
//                                 type="number"
//                                 placeholder="Width"
//                                 value={formData.details?.dimensions?.width ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "width", parseFloat(e.target.value))}
//                             />
//                             <Input
//                                 id="height"
//                                 name="height"
//                                 type="number"
//                                 placeholder="Height"
//                                 value={formData.details?.dimensions?.height ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "height", parseFloat(e.target.value))}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="value">Value ($)</Label>
//                             <Input
//                                 id="value"
//                                 name="value"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.value ?? 0}
//                                 onChange={(e) => handleInputChange("details", "value", parseFloat(e.target.value))}
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <Button onClick={handleUpdatePackage}>Update Package</Button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// }

// 'use client';
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { z } from "zod";
// import { toast } from "react-hot-toast";
// import { updatePackageSchema } from "@/lib/validators";

// // Define the interface for package data
// interface PackageData {
//     sender: { fullName: string; address: string; email?: string };
//     recipient: { fullName: string; address: string; email?: string };
//     details: {
//         description: string;
//         weight: number;
//         dimensions: { length: number; width: number; height: number };
//         value: number;
//     };
//     status: "created" | "in-transit" | "delivered";
//     currentLocation?: { lat: number; lng: number };
//     destinationLocation?: { lat: number; lng: number };
// }

// export default function AdminPage() {
//     const [activeTab, setActiveTab] = useState<"send" | "edit">("send");
//     const [formData, setFormData] = useState<Partial<PackageData>>({
//         sender: { fullName: "", address: "", email: "" },
//         recipient: { fullName: "", address: "", email: "" },
//         details: {
//             description: "",
//             weight: 0,
//             dimensions: { length: 0, width: 0, height: 0 },
//             value: 0,
//         },
//         status: "created",
//     });
//     const [trackingNumber, setTrackingNumber] = useState("");

//     // Handle input changes
//     const handleInputChange = (
//         section: keyof PackageData,
//         field: string,
//         value: string | number
//     ) => {
//         setFormData((prev) => ({
//             ...prev,
//             [section]: {
//                 ...(typeof prev[section] === 'object' ? prev[section] : {}),
//                 [field]: value,
//             },
//         }));
//     };

//     // Handle nested input changes (e.g., dimensions)
//     const handleNestedInputChange = <
//         S extends keyof PackageData,
//         SS extends keyof NonNullable<PackageData[S]>
//     >(
//         section: S,
//         subSection: SS,
//         field: keyof NonNullable<PackageData[S] extends object ? PackageData[S][SS] : never>,
//         value: string | number
//     ) => {
//         setFormData((prev) => ({
//             ...prev,
//             [section]: {
//                 ...(typeof prev[section] === 'object' ? prev[section] : {}),
//                 [subSection]: {
//                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                     ...(prev[section] as Record<SS, any>)[subSection],
//                     [field]: value,
//                 },
//             },
//         }));
//     };

//     // Handle updating an existing package
//     const handleUpdatePackage = async () => {
//         try {
//             const validatedData = updatePackageSchema.parse({
//                 trackingNumber,
//                 sender: formData.sender?.fullName ? formData.sender : undefined,
//                 recipient: formData.recipient?.fullName ? formData.recipient : undefined,
//                 details: formData.details?.description
//                     ? {
//                         ...formData.details,
//                         dimensions: formData.details.dimensions?.length
//                             ? formData.details.dimensions
//                             : undefined,
//                     }
//                     : undefined,
//                 status: formData.status,
//                 currentLocation: formData.currentLocation,
//                 destinationLocation: formData.destinationLocation,
//             });

//             const response = await fetch(`/api/packages/${trackingNumber}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(validatedData),
//             });

//             if (response.ok) {
//                 toast.success("Package updated successfully!");
//                 setTrackingNumber("");
//                 setFormData({
//                     sender: { fullName: "", address: "", email: "" },
//                     recipient: { fullName: "", address: "", email: "" },
//                     details: {
//                         description: "",
//                         weight: 0,
//                         dimensions: { length: 0, width: 0, height: 0 },
//                         value: 0,
//                     },
//                     status: "created",
//                 });
//             } else {
//                 const errorMessage = await response.text();
//                 toast.error(errorMessage ?? "Failed to update package.");
//             }
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 toast.error(error.errors.map((issue) => issue.message).join(", "));
//             } else {
//                 toast.error("Failed to update package. Please try again.");
//             }
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100 mt-14">
//             {/* Sidebar */}
//             <div className="w-64 bg-navy-900 text-white p-4 flex flex-col justify-between">
//                 <div>
//                     <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
//                     <Button
//                         onClick={() => setActiveTab("send")}
//                         className={`w-full justify-start ${activeTab === "send" ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-700"
//                             }`}
//                     >
//                         Send Package
//                     </Button>
//                     <Button
//                         onClick={() => setActiveTab("edit")}
//                         className={`w-full justify-start mt-2 ${activeTab === "edit" ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-700"
//                             }`}
//                     >
//                         Edit Package
//                     </Button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-6 overflow-y-auto">
//                 {activeTab === "edit" && (
//                     <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//                         <h2 className="text-2xl font-bold">Edit Package</h2>

//                         {/* Tracking Number */}
//                         <div>
//                             <Label htmlFor="tracking-number">Tracking Number</Label>
//                             <Input
//                                 id="tracking-number"
//                                 name="trackingNumber"
//                                 type="text"
//                                 value={trackingNumber}
//                                 onChange={(e) => setTrackingNumber(e.target.value)}
//                             />
//                         </div>

//                         {/* Sender Information */}
//                         <div>
//                             <Label htmlFor="sender-fullName">Sender Full Name</Label>
//                             <Input
//                                 id="sender-fullName"
//                                 name="fullName"
//                                 type="text"
//                                 value={formData.sender?.fullName ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "fullName", e.target.value)}
//                                 autoComplete="name"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="sender-address">Sender Address</Label>
//                             <Input
//                                 id="sender-address"
//                                 name="address"
//                                 type="text"
//                                 value={formData.sender?.address ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "address", e.target.value)}
//                                 autoComplete="street-address"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="sender-email">Sender Email (Optional)</Label>
//                             <Input
//                                 id="sender-email"
//                                 name="email"
//                                 type="email"
//                                 value={formData.sender?.email ?? ""}
//                                 onChange={(e) => handleInputChange("sender", "email", e.target.value)}
//                                 autoComplete="email"
//                             />
//                         </div>

//                         {/* Recipient Information */}
//                         <div>
//                             <Label htmlFor="recipient-fullName">Recipient Full Name</Label>
//                             <Input
//                                 id="recipient-fullName"
//                                 name="fullName"
//                                 type="text"
//                                 value={formData.recipient?.fullName ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "fullName", e.target.value)}
//                                 autoComplete="name"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="recipient-address">Recipient Address</Label>
//                             <Input
//                                 id="recipient-address"
//                                 name="address"
//                                 type="text"
//                                 value={formData.recipient?.address ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "address", e.target.value)}
//                                 autoComplete="street-address"
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="recipient-email">Recipient Email (Optional)</Label>
//                             <Input
//                                 id="recipient-email"
//                                 name="email"
//                                 type="email"
//                                 value={formData.recipient?.email ?? ""}
//                                 onChange={(e) => handleInputChange("recipient", "email", e.target.value)}
//                                 autoComplete="email"
//                             />
//                         </div>

//                         {/* Package Details */}
//                         <div>
//                             <Label htmlFor="description">Description</Label>
//                             <Input
//                                 id="description"
//                                 name="description"
//                                 type="text"
//                                 value={formData.details?.description ?? ""}
//                                 onChange={(e) => handleInputChange("details", "description", e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="weight">Weight (kg)</Label>
//                             <Input
//                                 id="weight"
//                                 name="weight"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.weight ?? 0}
//                                 onChange={(e) => handleInputChange("details", "weight", parseFloat(e.target.value))}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="dimensions">Dimensions (cm)</Label>
//                             <Input
//                                 id="length"
//                                 name="length"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.dimensions?.length ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "length", parseFloat(e.target.value))}
//                             />
//                             <Input
//                                 id="width"
//                                 name="width"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.dimensions?.width ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "width", parseFloat(e.target.value))}
//                             />
//                             <Input
//                                 id="height"
//                                 name="height"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.dimensions?.height ?? 0}
//                                 onChange={(e) => handleNestedInputChange("details", "dimensions", "height", parseFloat(e.target.value))}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="value">Value ($)</Label>
//                             <Input
//                                 id="value"
//                                 name="value"
//                                 type="number"
//                                 step="any"
//                                 value={formData.details?.value ?? 0}
//                                 onChange={(e) => handleInputChange("details", "value", parseFloat(e.target.value))}
//                             />
//                         </div>

//                         {/* Status */}
//                         <div>
//                             <Label>Status</Label>
//                             <div className="flex space-x-2">
//                                 <Button
//                                     onClick={() => setFormData((prev) => ({ ...prev, status: "created" }))}
//                                     className={`px-3 py-1 rounded ${formData.status === "created" ? "bg-cyan-400 text-black" : "bg-gray-700 hover:bg-cyan-500"
//                                         }`}
//                                 >
//                                     Created
//                                 </Button>
//                                 <Button
//                                     onClick={() => setFormData((prev) => ({ ...prev, status: "in-transit" }))}
//                                     className={`px-3 py-1 rounded ${formData.status === "in-transit" ? "bg-cyan-400 text-black" : "bg-gray-700 hover:bg-cyan-500"
//                                         }`}
//                                 >
//                                     In Transit
//                                 </Button>
//                                 <Button
//                                     onClick={() => setFormData((prev) => ({ ...prev, status: "delivered" }))}
//                                     className={`px-3 py-1 rounded ${formData.status === "delivered" ? "bg-cyan-400 text-black" : "bg-gray-700 hover:bg-cyan-500"
//                                         }`}
//                                 >
//                                     Delivered
//                                 </Button>
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <Button onClick={handleUpdatePackage}>Update Package</Button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// }