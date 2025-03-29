import express from 'express'
import { ApplyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import ensureAuthenticated from '../middlewares/authUser.js'

const router = express.Router()

// Get user Data
router.get('/user', ensureAuthenticated, getUserData)

// Apply for a job
router.post('/apply', ensureAuthenticated, ApplyForJob)

// Get applied jobs data
router.get('/applications', ensureAuthenticated, getUserJobApplications)

// Update user profile (resume)
router.post('/update-resume', ensureAuthenticated, upload.single('resume'), updateUserResume)



export default router;