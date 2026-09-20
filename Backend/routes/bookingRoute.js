import express from "express"
import {
    createBooking, getMyBookings, getAllBookings, getBookingById, updateBookingStatus, deleteBookingById,
    getProviderBookings,
    assignProvider,updateProviderBookingStatus
} from "../controllers/bookingControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
import providerMiddleware from "../middleware/providerMiddleware.js"
console.log("BOOKING ROUTE FILE LOADED");
const router = express.Router()
// router.get("/test", (req, res) => {
//     res.send("TEST ROUTE WORKING");
// });

//@api routes
//@api dsc :- create Booking
//@api method :- post
//@api endpoint :- /api/bookings
router.post("/create", authMiddleware, createBooking)

//@api routes
//@api dsc :- Get my Bookings
//@api method :- GET
//@api endpoint :- /api/bookings/my-bookings
router.get("/my-bookings", authMiddleware, getMyBookings)

//@api routes
//@api dsc :- Get provider Bookings
//@api method :- GET
//@api endpoint :- /api/bookings/provider-bookings
router.get("/provider-bookings", authMiddleware, providerMiddleware, getProviderBookings)

//@api routes
//@api dsc :- Update booking status by provider
//@api method :- PATCH
//@api endpoint :- /api/bookings/provider-status/:bookingId
router.patch("/provider-status/:bookingId", authMiddleware, providerMiddleware, updateProviderBookingStatus)

//@api routes
//@api dsc :- Assign provider 
//@api method :- PATCH
//@api endpoint :- /api/bookings/assign-provider/:bookingId
router.patch("/assign-provider/:bookingId",authMiddleware,adminMiddleware,assignProvider)

//@api routes
//@api dsc :- Get ALL Bookings
//@api method :- GET
//@api endpoint :- /api/bookings/all
router.get("/all", authMiddleware, adminMiddleware, getAllBookings)

//@api routes
//@api dsc :- Get  Bookings by id
//@api method :- GET
//@api endpoint :- /api/bookings/:bookingId
router.get("/:bookingId", authMiddleware, adminMiddleware, getBookingById)

//@api routes
//@api dsc :- Get  Booking by id
//@api method :- GET
//@api endpoint :-/api/bookings/status/:bookingId
router.patch("/status/:bookingId", authMiddleware, adminMiddleware, updateBookingStatus)

//@api routes
//@api dsc :- DELETE  Booking by id
//@api method :- DELETE
//@api endpoint :-/api/bookings/:bookingId
router.delete("/:bookingId", authMiddleware, adminMiddleware, deleteBookingById)



// console.log("BOOKING ROUTES:", router.stack.map(route => route.route?.path));
export default router