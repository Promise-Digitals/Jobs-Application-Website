
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

}


// Get user applied applications
export const getUserJobApplications = async (req, res) => {

}


// Get user profile (resume)
export const updateUserResume = async (req, res) => {

}