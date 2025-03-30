import Job from "../models/job.js"


// Get all jobs
export const getJobs = async (req, res) => {
    try {
        
        const jobs = await Job.find({visible: true})
        .populate({path: 'companyId', select: '-password'})

        res.json({
            success: true,
            jobs
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Get a single job by ID
export const getJobById = async (req, res) => {

    const jobId = req.params.id

    try {

        const job = await Job.findById(jobId).populate({path: 'companyId', select: '-password'})

        if (job) {
            res.json({
                success: true,
                job
            })
        }else{
            res.json({
                success: false,
                message: "Job Details not found"
            })
        }
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}