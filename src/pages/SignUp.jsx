import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import handleInputData from "../actions/handleInputData"
import toast from "react-hot-toast"
import axios from "axios"
import BackendApi from "../api/BackendApi"

const SignUp = () => {
    const [userData, setUserData] = useState({firstName: "", lastName: "", email: "", password: "", phoneNumber: ""})
    const [confirmPassword, setConfirmPassword] = useState({confirmPassword: ""})
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if(userData.password !== confirmPassword.confirmPassword){
            toast.error("Password is wrong!")
            return
        }

        await BackendApi.post(`/user`, userData).then((response) => {
            toast.success(response.data.message)
            navigate('/login') 
        }).catch((error) => {
            console.log(error);
            
            toast.error(error?.response?.data?.message || "Error Occured")
        })
    }
    


    return(
        <>
        <div className="bg-[url('/sign_up_bg.jpeg')] bg-cover bg-center h-screen bg-no-repeat grid grid-cols-2">
            <div className="p-10 m-auto ">
                <h1 className="text-white text-5xl font-bold"><span className="text-blue-700 text-7xl">Join</span> the rhythm of seamless rentals! 🎸✨ </h1>
                <p className="font-semibold text-white mt-4">Create your account now and access a world of premium audio equipment. Whether you're a musician, DJ, or event planner, we’ve got the perfect gear to bring your sound to life. Sign up and start your musical journey today!</p>
            </div>
            <div className="w-[600px] h-[500px] bg-white right-0 translate-x-[-5%] rounded-lg m-auto">
                <h1 className="text-3xl font-bold p-5"><span className="text-5xl text-blue-600">Create</span> an account</h1>

                <form className="px-5" onSubmit={(event) => {handleSubmit(event)}}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-3">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name<span className="text-red-500">*</span></label>
                            <input type="text" name="firstName" onChange={(event) => {handleInputData(event,setUserData)}} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="First Name" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name<span className="text-red-500">*</span></label>
                            <input type="text" name="lastName" onChange={(event) => {handleInputData(event,setUserData)}} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Last Name" required/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email<span className="text-red-500">*</span></label>
                        <input type="email" name="email" onChange={(event) => {handleInputData(event,setUserData)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] p-2.5" placeholder="name@example.com" required/>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="mb-3">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password<span className="text-red-500">*</span></label>
                            <input type="password" name="password" onChange={(event) => {handleInputData(event,setUserData)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="*********" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password<span className="text-red-500">*</span></label>
                            <input type="password" name="confirmPassword" onChange={(event) => {handleInputData(event,setConfirmPassword)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="*********" required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number<span className="text-red-500">*</span></label>
                        <input type="number" name="phoneNumber" onChange={(event) => {handleInputData(event,setUserData)}} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="07********" required/>
                    </div>

                    <div className="flex justify-center items-center">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer w-[70%]">Create Account</button>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">Already have an account. <Link to='/login' className="font-medium text-blue-600">Login</Link></p>
                </form>
            </div>
        </div>
        </>
    )
}

export default SignUp