import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true,match:/^[6-9]\d{9}$/},
    password:{type:String,required:true},
    role: {
        type: String,
        enum: ["customer", "admin", "provider"],
        default: "customer"
    }
})
export default mongoose.model("User",userSchema)