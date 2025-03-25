import passport from "passport"
import GoogleStrategy from 'passport-google-oauth20';
import User from "../models/User.js";


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ _id: profile.id })

        if (user) {
            return done(null, user)
        }

        const newUser = await User.create({
            _id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            resume: '',
            image: profile.photos[0].value
        })  

        done(null, newUser)

    } catch (error) {
        done(error)
    }
}))


passport.serializeUser((newUser, done) => {
    done(null, newUser._id)
})

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            return done(new Error('User not found'))
        }
        done(null, user)

    } catch (error) {
        done(error)
    }
})