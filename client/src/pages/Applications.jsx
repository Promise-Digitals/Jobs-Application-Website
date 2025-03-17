import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

const Applications = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [resume, setResume] = useState(null)

    return (
        <>
        <Navbar />

        <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
            <h2 className='text-xl font-semibold'>Your Resume</h2>
            <div className='flex gap-2 mb-6 mt-3'>
                {
                    isEdit
                    ? <>
                        <label className='flex items-center' htmlFor="resumeUpload">
                            <p className='bg-teal-100 text-teal-800 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
                            <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                            <img src={assets.profile_upload_icon} alt="" />
                        </label>
                        <button onClick={e => setIsEdit(false)} className='bg-teal-100 border border-teal-400 rounded-lg py-2 px-4 text-black'>Save</button>
                    </>
                    : <div className='flex gap-2'>
                        <a href="" className='bg-teal-100 text-teal-800 px-4 py-2 rounded-lg'>Resume</a>
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
                    {jobsApplied.map((job, index) => true ? (
                        <tr className='border-b border-gray-500'>
                            <td className='py-3 px-4 flex items-center gap-2 '>
                                <img className='w-8 h-8' src={job.logo} alt="" />
                                {job.company}
                            </td>
                            <td className='py-2 px-4'>
                                {job.title}
                            </td>
                            <td className='py-2 px-4'>
                                {job.location}
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
