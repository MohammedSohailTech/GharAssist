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
            .populate("providerId", "name email phone")
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
export const getAllBookings = async (req, res) => {
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

// @desc Get booking by ID
// @access Admin

export const getBookingById = async (req, res) => {

    try {

        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking fetched successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }
};

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
        const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true }
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

// @desc Delete booking by ID
// @access Admin    
export const deleteBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) {
            return res.status(404).json({
                message: "No Booking found"
            })

        }
        res.status(200).json({
            message: "Booking deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

//@desc Get provider bookings
//@access Provider
export const getProviderBookings = async (req, res) => {
    try {
        const providerId = req.user.userId
        const bookings = await Booking.find({ providerId })
        if (bookings.length === 0) {
            return res.status(404).json({
                message: "No bookings found"
            })
        }
        res.status(200).json({
            message: "Providers Bookings Fetched Successfully!", bookings
        })

    } catch (error) {
        console.error("PROVIDER BOOKINGS ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

// @desc Assign provider to booking
// @access Admin
export const assignProvider = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { providerId } = req.body;

        if (!providerId) {
            return res.status(400).json({
                message: "Provider ID is required"
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { providerId },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Provider assigned successfully",
            booking
        });

    } catch (error) {
        console.error("ASSIGN PROVIDER ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// @desc Update booking status by provider
// @access Provider
export const updateProviderBookingStatus = async (req, res) => {
    try {

        const { bookingId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Booking status required"
            });
        }

        const allowedStatus = [
            "accepted",
            "rejected",
            "completed"
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid booking status"
            });
        }

        const providerId = req.user.userId;

        const booking = await Booking.findOneAndUpdate(
            {
                _id: bookingId,
                providerId: providerId
            },
            {
                status: status
            },
            {
                new: true
            }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found or not assigned to you"
            });
        }

        res.status(200).json({
            message: "Booking status updated successfully",
            booking
        });

    } catch (error) {

        console.error("PROVIDER STATUS ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });

    }
};