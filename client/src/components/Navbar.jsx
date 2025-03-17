import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const{setShowRecruiterLogin} = useContext(AppContext)

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='w-26 cursor-pointer' src={assets.logo} alt="" />
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
                            <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                            <button onClick={() => setIsLoggedIn(true)} className='bg-teal-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar
