import JobApplication from "../models/jobApplication.js";
import { v2 as cloudinary} from "cloudinary";
import User from "../models/User.js";
import Job from "../models/job.js";

// Get user data
export const getUserData = (req, res) => {
    try {
        const userData = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            image: req.user.image,
            resume: req.user.resume
        }
        res.json({
            success: true,
            userData
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


// Apply for a job
export const ApplyForJob = async (req, res) => {

    const {jobId, userId} = req.body;

    try {

        const isAlreadyApplied = await JobApplication.find({jobId, userId})
        
        if (isAlreadyApplied.length > 0) {
            return res.json({
                success: false,
                message: "Already Applied"
            })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({
                success: false,
                message: "Job Not Found"
            })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({
            success: true,
            message: 'Applied Successfully'
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


// Get user applied applications
export const getUserJobApplications = async (req, res) => {

    try {
        
        const {userId} = req.body

        const applications = await JobApplication.find(userId)
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec()

        if (!applications) {
            return res.json({
                success: false,
                message: "No job applications found for this user."
            })
        }

        return res.json({
            success: true,
            applications
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


// Get user profile (resume)
export const updateUserResume = async (req, res) => {
    try {
        const {userId} = req.body
        
        const resumeFile = req.file

        const userData = await User.findById(userId)

        if (resumeFile) {
            
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({
            success: true,
            message: "Resume Updated"
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
