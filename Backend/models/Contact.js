import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/
    },
    message: { type: String, required: true }
})
export default mongoose.model("Contact", contactSchema)