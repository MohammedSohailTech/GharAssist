import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import bookingRoutes from "./routes/bookingRoute.js"
import contactRoutes from "./routes/contactRoutes.js"
import cors from "cors"
import transporter from "./config/email.js";

const app = express()

app.use(cors({
  origin: [
    "http://127.0.0.1:5501",
    "http://127.0.0.1:3001",
    "https://gharassist-1.onrender.com",
    "https://gharassist.com"
  ]
}))
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// app.get("/test", (req, res) => {
//   res.send("SERVER TEST WORKING");
// });

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

