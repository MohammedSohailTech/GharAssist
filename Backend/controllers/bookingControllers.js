import Booking from "../models/Booking.js";

//@desc Create a new booking
export const createBooking = async (req, res) => {

    try {

        const {
            service,
            name,
            email,
            phone,
            location,
            date
        } = req.body;

        const userId = req.user.userId;

        if (!service || !name || !email || !phone || !location || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isExistBooking = await Booking.findOne({
            email,
            date
        });

        if (isExistBooking) {
            return res.status(400).json({
                message: "You have already booked a service for this email and date"
            });
        }

        const booking = await Booking.create({
            userId,
            service,
            name,
            email,
            phone,
            location,
            date
        });

        res.status(201).json({
            message: "Booking Successful",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }
};

//@desc Get my bookings
export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.userId
        const bookings = await Booking.find({ userId })
        if (bookings.length === 0) {
            return res.status(404).json({
                message: "No bookings found"
            });
        }
        res.status(200).json({
            message: "Bookings fetched successfully",
            bookings
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

//@desc Get all bookings
export const getAllBookngs = async (req, res) => {
    try {
        const bookings = await Booking.find()
        if (bookings.length === 0) {
            return res.status(404).json({
                message: "No bookings found"
            });

        }
        res.status(200).json({
            message: "All Booking Fetched", bookings
        },)
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

// @desc Update booking status
// @access Admin

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.json({ message: "Booking status required" })

        }
        const allowedStatus = ["accepted", "pending", "rejected", "completed"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid booking status"
            })
        }
        const booking = await Booking.findByIdAndUpdate(bookingId,{ status },{ new: true }
        );
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking status updated successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}