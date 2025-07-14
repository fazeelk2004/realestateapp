import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/1200x/ce/7a/c3/ce7ac3f6a631fa435b569d16eaa60a49.jpg",
    },
    gender: {
        type: String,
        default: "N/A",
    },
    country: {
        type: String,
        default: "N/A",
    },
    phoneNo: {
        type: String,
        default: "N/A",
    },


}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;