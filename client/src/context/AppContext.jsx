import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from 'axios'

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [userData, setUserData] = useState(false)

    const backendUrl = 'http://localhost:5000'


    // function to fetch job data
    const fetchJobs = async () => {
        setJobs(jobsData)
    }


    const fetchAuthenticatedUser = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/users/user', { withCredentials: true })
            if (data.success) {
                setUserData(data.userData)
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
            setIsLoggedIn(false)
        }
    }



    useEffect(() => {
        fetchJobs()
    }, [])

    useEffect(() => {
        fetchAuthenticatedUser()
    }, [])


    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        backendUrl,
        setShowRecruiterLogin, showRecruiterLogin,
        userData, setUserData,
        isLoggedIn, setIsLoggedIn
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}