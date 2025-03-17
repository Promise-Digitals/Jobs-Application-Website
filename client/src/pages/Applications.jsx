import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Applications = () => {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <>
        <Navbar />

        <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
            <h2 className='text-xl font-semibold'>Your Resume</h2>
            <div className='flex gap-2 mb-6 mt-3'>
                {
                    isEdit
                    ? <></>
                    : <div className='flex gap-2'>
                        <a href="" className='bg-teal-100 text-teal-800 px-4 py-2 rounded-lg'>Resume</a>
                        <button onClick={() => setIsEdit(true)} className='text-gray-600 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
                    </div>
                }
            </div>
        </div>
        </>
    )
}

export default Applications
