import passport from 'passport'
// creating require in ES6 module
import {createRequire} from "module"
const require = createRequire(import.meta.url)
const GoogleStrategy = require('passport-google-oauth20').Strategy
import User from "../models/User.js";


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://jobs-application-server.vercel.app/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value})

        if (user) {
            return done(null, user)
        }

        const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            resume: '',
            image: profile.photos[0].value
        })  

        await newUser.save()

        done(null, newUser)

    } catch (error) {
        done(error)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findOne({ _id: userId })

        if (!user) {
            return done(new Error('User not found'))
        }

        return done(null, user)
    } catch (error) {
        done(error)
    }
})
