import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Applications = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [resume, setResume] = useState(null)

    const {backendUrl, userData, userApplications, fetchAuthenticatedUser, fetchUserApplications} = useContext(AppContext)

    const updateResume = async () => {
        try {
            const userId = userData.id

            const formData = new FormData()

            formData.append('resume', resume)
            formData.append('userId', userId)

            const {data} = await axios.post(backendUrl + "/api/users/update-resume", formData)

            if (data.success) {
                toast.success(data.message)
                await fetchAuthenticatedUser()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }

        setIsEdit(false)
        setResume(null)
    }


    useEffect(() => {
        if (userData) {
            fetchUserApplications()
        }
    }, [userData])

    return (
        <>
        <Navbar />

        <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
            <h2 className='text-xl font-semibold'>Your Resume</h2>
            <div className='flex gap-2 mb-6 mt-3'>
                {
                    isEdit || userData && userData.resume === ""
                    ? <>
                        <label className='flex items-center' htmlFor="resumeUpload">
                            <p className='bg-teal-100 text-teal-800 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select resume"}</p>
                            <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                            <img src={assets.profile_upload_icon} alt="" />
                        </label>
                        <button onClick={updateResume} className='bg-teal-100 border border-teal-400 rounded-lg py-2 px-4 text-black'>Save</button>
                    </>
                    : <div className='flex gap-2'>
                        <a href={userData.resume} target='_blank' className='bg-teal-100 text-teal-800 px-4 py-2 rounded-lg'>Resume</a>
                        <button onClick={() => setIsEdit(true)} className='text-gray-600 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
                    </div>
                }
            </div>
            <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
            <table className='min-w-full bg-white border border-gray-500 rounded-lg'>
                <thead>
                    <tr className='border-b border-gray-500'>
                        <th className='py-3 px-4 text-left'>Company</th>
                        <th className='py-3 px-4 text-left'>Job Title</th>
                        <th className='py-3 px-4 text-left max-sm:hidden'>Location</th>
                        <th className='py-3 px-4 text-left max-sm:hidden'>Date</th>
                        <th className='py-3 px-4 text-left'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userApplications.map((job, index) => true ? (
                        <tr key={index} className='border-b border-gray-500'>
                            <td className='py-3 px-4 flex items-center gap-2 '>
                                <img className='w-8 h-8' src={job.companyId.image} alt="" />
                                {job.companyId.name}
                            </td>
                            <td className='py-2 px-4'>
                                {job.jobId.title}
                            </td>
                            <td className='py-2 px-4'>
                                {job.jobId.location}
                            </td>
                            <td className='py-2 px-4'>{moment(job.date).format('ll')}</td>
                            <td className='py-2 px-4'>
                                <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                                    {job.status}
                                </span>
                            </td>
                        </tr>

                    ) : (null))}
                </tbody>
            </table>
        </div>

        <Footer />
        </>
    )
}

export default Applications
