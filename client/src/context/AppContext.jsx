import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";

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

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [companyToken, setCompanyToken] = useState(null)

    const [companyData, setCompanyData] = useState(null)

    const [userApplications, setUserApplications] = useState(null)


    // function to fetch job data
    const fetchJobs = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + "/api/jobs")

            if (data.success) {
                setJobs(data.jobs)
                console.log(data.jobs)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {

            const {data} = await axios.get(backendUrl + "/api/company/company", {headers: {token: companyToken}})

            if (data.success) {
                setCompanyData(data.company)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
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
            toast.error(error.message)
        }
    }


    // Function to fetch user's applications data
    const fetchUserApplications = async () => {
        
        try {

            const {data} = await axios.get(backendUrl + "/api/users/applications", { withCredentials: true })

            if (data.success) {
                setUserApplications(data.applications)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            // toast.error(error.message)
            console.log(error)
        }
    }



    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
    }, [])

    useEffect(() => {
        fetchAuthenticatedUser()
        fetchUserApplications()
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        backendUrl,
        setShowRecruiterLogin, showRecruiterLogin,
        userData, setUserData,
        isLoggedIn, setIsLoggedIn,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        userApplications, setUserApplications,
        fetchAuthenticatedUser,
        fetchUserApplications
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}