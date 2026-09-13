import express from "express"
import {createBooking,getMyBookings,getAllBookngs,updateBookingStatus} from "../controllers/bookingControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
const router = express.Router()

//@api routes
//@api dsc :- create Booking
//@api method :- post
//@api endpoint :- /api/bookings
router.post("/create",authMiddleware,createBooking)

//@api routes
//@api dsc :- Get my Bookings
//@api method :- GET
//@api endpoint :- /api/bookings/my-bookings
router.get("/my-bookings",authMiddleware,getMyBookings)

//@api routes
//@api dsc :- Get ALL Bookings
//@api method :- GET
//@api endpoint :- /api/bookings/all
router.get("/all",authMiddleware,adminMiddleware,getAllBookngs)

//@api routes
//@api dsc :- Get  Booking by id
//@api method :- GET
//@api endpoint :-/api/bookings/status/:bookingId
router.patch("/status/:bookingId",authMiddleware,adminMiddleware,updateBookingStatus)


export default router