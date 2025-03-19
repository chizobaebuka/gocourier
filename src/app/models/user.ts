import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    role: RoleEnum;
    accountType: UserType;
    name: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export enum UserType {
    BUYER = "buyer",
    SELLER = "seller",
}

export enum RoleEnum {
    ADMIN = "admin",
    USER = "user",
}

const userSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.USER, required: true }, 
        accountType: { type: String, enum: Object.values(UserType) },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        if (error instanceof Error) {
            next(error);
        } else {
            next(new Error("An unknown error occurred during password hashing"));
        }
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// ✅ Fix: Use global cache to prevent model overwrite in Next.js
const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { UserModel as User };