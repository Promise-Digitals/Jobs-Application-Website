import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()

    const { setShowRecruiterLogin, userData, isLoggedIn, setIsLoggedIn, backendUrl } = useContext(AppContext)


    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/logout', { withCredentials: true })
            navigate('/')
            setIsLoggedIn(false)
            toast.success("You're successfully logged out")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='w-26 cursor-pointer' src={assets.logo} alt="" />
                <div>
                    {
                        isLoggedIn
                            ? <div className='flex items-center gap-3'>
                                <Link to={'/applications'}>Applied Jobs</Link>
                                <p>|</p>
                                <p className='max-sm:hidden'>Hi, {userData.name.split(' ')[0]}</p>
                                {/* User profile picture */}
                                <div className='relative group'>
                                    <div className='border-2 border-teal-600 rounded-full w-8 h-8 flex items-center justify-center bg-teal-50 uppercase'>{userData.image ? <img className='w-full h-full rounded-full' src={userData.image} alt="" /> : userData.name.slice(0, 1)}</div>
                                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                        <ul className='list-none m-0 p-2 bg-white rounded-md border border-gray-300 text-sm'>
                                            <li className='py-1 px-2 cursor-pointer pr-10' onClick={handleLogout}>Logout</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='flex gap-4 max-sm:text-sm'>
                                <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                                <a href='http://localhost:5000/auth/google' className='bg-teal-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</a>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
