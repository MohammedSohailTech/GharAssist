import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import bookingRoutes from "./routes/bookingRoute.js"
import contactRoutes from "./routes/contactRoutes.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//USER ROUTES
app.use("/api/users", userRoutes)

//BOOKING ROUTES
app.use("/api/bookings", bookingRoutes)

//contact Routes
app.use("/api/contacts", contactRoutes)

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  })
})

