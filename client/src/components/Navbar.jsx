import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img className='w-26' src={assets.logo} alt="" />
                {
                    isLoggedIn
                        ? <div className='flex items-center gap-3'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p>|</p>
                            <p className='max-sm:hidden'>Hi, Promise</p>
                            {/* User profile picture */}
                            <div className='border border-teal-600 rounded-full w-8 h-8 flex items-center justify-center bg-teal-50'>P</div>
                        </div>
                        :
                        <div className='flex gap-4 max-sm:text-sm'>
                            <button className='text-gray-600'>Recruiter Login</button>
                            <button onClick={() => setIsLoggedIn(true)} className='bg-teal-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar
