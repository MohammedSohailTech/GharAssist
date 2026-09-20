import express from "express"
import User from "../models/User.js";
import { registerUser, loginUser, getAllUsers, getUserById, deleteUseerById, getAllServiceProvider,forgotPassword,verifyOTP, resetPassword, resendOTP } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

const router = express.Router();

//@api routes
//@api dsc :- create new account
//@api method :- post
//@api endpoint :- /api/users/register
router.post("/register", registerUser)

//@api routes
//@api dsc :- login to account
//@api method :- post
//@api endpoint :- /api/users/login
router.post("/login", loginUser)

// router.post("/register", registerUser);
// router.post("/login", loginUser);

//@api dsc :- forgot password
//@api method :- post
//@api endpoint :- /api/users/forgot-password
router.post("/forgot-password", forgotPassword)

//@api dsc :- resebd forgot password
//@api method :- post
//@api endpoint :- /api/users/resend-otp
router.post("/resend-otp",resendOTP)

//@api dsc :- verify OTP
//@api method :- post
//@api endpoint :- /api/users/verify-otp
router.post("/verify-otp", verifyOTP)

//@api dsc :- reset password
//@api method :- patch
//@api endpoint :- /api/users/reset-password
router.patch("/reset-password",resetPassword)

//@api routes
//@api dsc :- get all users
//@api method :- get
//@api endpoint :- /api/users/all
router.get("/all", authMiddleware,
    adminMiddleware, getAllUsers)

//@api routes
//@api dsc :- get all service providers
//@api method :- get
//@api endpoint :- /api/users/providers
router.get("/providers", authMiddleware, adminMiddleware, getAllServiceProvider)

//@api routes
//@api dsc :- get user profile
//@api method :- get
//@api endpoint :- /api/users/profle
router.get("/profile", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {

        console.error("PROFILE ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});

//@api routes
//@api dsc :- get user by id
//@api method :- get
//@api endpoint :- /api/users/:id
router.get("/:id", authMiddleware, adminMiddleware, getUserById)

//@api routes
//@api dsc :-DELETE user by id
//@api method :- DELETE
//@api endpoint :- /api/users/:id
router.delete("/:id", authMiddleware, adminMiddleware, deleteUseerById)






export default router