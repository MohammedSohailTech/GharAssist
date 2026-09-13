import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//create account
export const registerUser = async (req, res) => {

    try {
        const { name, email, phone, password } = req.body;

        if (name == "" || email == "" || phone == "" || password == "") {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ message: "This email already registerd!.." })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        })
        // console.log(name)
        // console.log(email)
        // console.log(phone)
        // console.log(password)
        // console.log(req.body)
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

//login to account
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log("Backend received:", email)
        if (email == "" || password == "") {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        let user = await User.findOne({
            $or: [
                { email: email },
                { phone: email }
            ]
        })
        if (!user) {
            return res.json({ message: "user not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: "1d" })
        // console.log(req.body)
        res.json({
            message: `Welcome to GharAssist ${user.name}`,
            token
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}