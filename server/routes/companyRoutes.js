import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()


// Register a company
router.post('/register', upload.single('image'), registerCompany)

// company login
router.post('/login', loginCompany)

// Get company data
router.get('/company', getCompanyData)

// Post a job
router.post('/post-job', postJob)

// Get applicants data of company
router.get('/applicants', getCompanyJobApplicants)

// Get company jobs list
router.get('/list-jobs', getCompanyPostedJobs)

// Change application status
router.post('/change-status', changeJobApplicationsStatus)

// Change application visibility
router.post('/change-visibility', changeVisibility)


export default router;