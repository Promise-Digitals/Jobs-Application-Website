import "./config/instrument.js";
import express from "express";
import session from 'express-session'
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import passport from "passport";
import ensureAuthenticated from "./middlewares/authUser.js";

import "./controllers/UserAuth.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"

// Initialize Express
const app = express();

// Connect to database
await connectDB();
await connectCloudinary()

// Middlewares
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});


// Google Authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: false }), (req, res) => {
    res.redirect('http://localhost:5173')
})

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

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);


// Port
const PORT = process.env.PORt || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});
