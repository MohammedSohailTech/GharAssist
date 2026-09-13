import express from "express"
import { registerUser, loginUser } from "../controllers/userController.js"
import  authMiddleware from "../middleware/authMiddleware.js"

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


//@api routes
//@api dsc :- get user profile
//@api method :- get
//@api endpoint :- /api/users/profle
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});

    export default router