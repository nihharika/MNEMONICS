import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        default: "STUDENT",
        enum: ["STUDENT", "TEACHER", "STAFF", "GUARDS"],
    },
    profilePicture: {
        type: String,
        default: "",
    },
    userDescription: {
        type: String,
        default: "Hello there! I'm using SecureUni",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
