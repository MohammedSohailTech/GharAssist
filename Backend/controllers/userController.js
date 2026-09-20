import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import OTP from "../models/otpModel.js";
import transporter from "../config/email.js";

//create account
export const registerUser = async (req, res) => {

    try {
        const { name, email, phone, password, role } = req.body;

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
            password: hashedPassword,
            role
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
        // console.log("Backend received:", email)
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
            token,
            role: user.role
        });
    } catch (error) {
        // console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (users.length === 0) {
            return res.status(404).json({
                message: "no users found"
            })
        }
        res.status(200).json({
            message: "All users fetched", users
        })

    } catch (error) {
        // console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

//get user by id

export const getUserById = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "No user found"
            });

        }

        res.status(200).json({
            message: "Fetched user successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

}

//delete user by id

export const deleteUseerById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "user deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}


//get all service providers
export const getAllServiceProvider = async (req, res) => {
    try {
        const providers = await User.find({
            role: "provider"
        }).select("-password")
        if (providers.length === 0) {
            return res.status(404).json({
                message: "No service provider found"
            })
        }
        res.status(200).json({
            message: "All service provider found", providers
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

//forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({
                message: "If an account exists with this email, an OTP has been sent"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await OTP.deleteMany({ email });

        await OTP.create({
            email,
            otp,
            expiresAt
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "GharAssist Password Reset OTP",
            text: `Your GharAssist password reset OTP is ${otp}. This OTP is valid for 5 minutes.`
        });

        res.status(200).json({
            message: "If an account exists with this email, an OTP has been sent"
        });

    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

//verify otp   
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (otpRecord.expiresAt < new Date()) {
            await OTP.deleteOne({ _id: otpRecord._id });

            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        const resetToken = jwt.sign(
            {
                email: email,
                purpose: "password-reset"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m"
            }
        );

        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({
            message: "OTP verified successfully",
            resetToken
        });

    } catch (error) {
        console.error("VERIFY OTP ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

//reset password
export const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            return res.status(400).json({
                message: "Reset token and new password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const decoded = jwt.verify(
            resetToken,
            process.env.JWT_SECRET
        );

        if (decoded.purpose !== "password-reset") {
            return res.status(401).json({
                message: "Invalid reset token"
            });
        }

        const user = await User.findOne({
            email: decoded.email
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Reset token has expired"
            });
        }

        res.status(401).json({
            message: "Invalid or expired reset token"
        });
    }
};

// resend OTP
export const resendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({
                message: "If an account exists with this email, an OTP has been sent"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await OTP.deleteMany({ email });

        await OTP.create({
            email,
            otp,
            expiresAt
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "GharAssist Password Reset OTP",
            text: `Your new GharAssist password reset OTP is ${otp}. This OTP is valid for 5 minutes.`
        });

        res.status(200).json({
            message: "A new OTP has been sent"
        });

    } catch (error) {

        console.error("RESEND OTP ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};