import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    providerId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null

    },
    service: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
})
export default mongoose.model("Booking", bookingSchema)