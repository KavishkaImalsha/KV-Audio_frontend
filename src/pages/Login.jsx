import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {

    return(
    <>
        <div className="bg-[url('/loginbg.jpeg')] bg-cover bg-center h-screen bg-no-repeat flex justify-center items-center flex-col">
            <div className="p-5 w-[1000px] h-[300px] relative bg-black border-black rounded-xl text-white flex flex-col justify-center">
                <h1 className="mt-5 text-2xl">Dont have an account?</h1>
                <p className="w-[50%] mt-5"> Join us today! Discover premium products, seamless shopping, and exclusive deals tailored just for you.</p>
                <Link className="w-[400px] h-[50px] mt-8 ml-8 border-4 border-white rounded-lg hover:cursor-pointer hover:bg-white hover:text-black hover:font-medium flex items-center justify-center">SignUp</Link>
            </div>
            <div className="w-[400px] h-[500px] bg-white absolute right-0 translate-x-[-60%] border rounded-lg border-white">
                <div className="flex justify-center items-center">
                    <img src="company_logo.png" className="w-45 h-45"/>
                </div>
                <h1 className="font-medium text-center"><span className="font-bold text-3xl text-blue-600">Login</span> to your account.</h1>
                
                <form class="max-w-sm mx-auto p-5">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@example.com" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="*********" required />
                    </div>
                    <div class="flex justify-between items-center">
                        <Link className="text-sm font-medium text-gray-500 hover:text-blue-600">Forget password?</Link>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[150px] px-5 py-2.5 text-center translate-x-[-20px] hover:cursor-pointer">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </>
)
}

export default Login