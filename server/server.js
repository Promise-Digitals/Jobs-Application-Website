import express from "express";
import session from 'express-session'
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import passport from "passport";

import "./config/passport.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"

// Initialize Express
const app = express();

// Connect to database
await connectDB();
await connectCloudinary()

const allowedOrigins = ["https://jobs-application-portal.vercel.app", "http://localhost:5173"]

// Middlewares
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: allowedOrigins
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});


// Google Authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }), (req, res) => {
    res.redirect('https://jobs-application-portal.vercel.app')
})

app.get('/failure', (req, res) => res.send("Failed"))

// Logout User
app.get('/logout', (req, res) => {
    req.logout((error) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong' })
        }

        res.status(204).send()
    })
})

app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)



// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});
