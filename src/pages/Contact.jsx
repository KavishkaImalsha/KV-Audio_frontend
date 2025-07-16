import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import MapLocation from "../components/map/MapLocation"
import { useState } from "react"
import handleInputData from "../actions/handleInputData"
import BackendApi from "../api/BackendApi"
import toast from "react-hot-toast"

const Contact = () => {
    const [formData, setFormData] = useState({name: "", email: "", phone: "", subject: "", message: ""})
    const navigate = useNavigate()
    
    const sendMessage = async(event) => {
        event.preventDefault()

        try{
            const token = localStorage.getItem("token")
        
            if(token){
                const inquiryRes = await BackendApi.post("/inquiries", formData)
                toast.success(inquiryRes.data.message)
                navigate('/items')
            }else{
                navigate('/signup')
            }
        }catch(error){
            toast.error(error?.response?.data?.message || "Error Occured")
        }

        
        
    }
    return(
        <>
            <div>
                <MapLocation/>
                <div className="grid grid-cols-2 my-3 mx-15">
                    <div className="mx-5">
                        <h1 className="text-3xl font-quicksand my-2">Contact Us</h1>
                        <form onSubmit={(event) => {sendMessage(event)}}>
                            <div className="grid grid-cols-2 gap-2 mb-5">
                                <div>
                                    <label htmlForfor="name" className="block">Your Name</label>
                                    <input onChange={(event) => {handleInputData(event, setFormData)}} type="text" name="name" className="w-full h-10 px-3 border border-gray-300 focus:outline-0" required/>
                                </div>
                                <div>
                                    <label htmlForfor="email" className="block">Your Email</label>
                                    <input onChange={(event) => {handleInputData(event, setFormData)}} type="text" name="email" className="w-full h-10 px-3 border border-gray-300 focus:outline-0" required/>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlForfor="phone" className="block">Mobile number</label>
                                <input onChange={(event) => {handleInputData(event, setFormData)}} type="number" name="phone" className="w-[50%] h-10 px-3 border border-gray-300 focus:outline-0" required/>
                            </div>
                            <div className="mb-5">
                                <label htmlForfor="subject" className="block">Subject</label>
                                <select onChange={(event) => {handleInputData(event, setFormData)}} name="subject" className="w-full h-10 px-3 border border-gray-300 focus:outline-0">
                                    <option>Select Subject</option>
                                    <option>General Support</option>
                                    <option>Thecnical Support</option>
                                    <option>Sale Support</option>
                                </select>
                            </div>
                            <div>
                                <label htmlForfor="message" className="block">Message</label>
                                <textarea onChange={(event) => {handleInputData(event, setFormData)}} name="message" className="w-full h-56 py-3 px-3 border border-gray-300 focus:outline-0" required/>
                            </div>
                            <button type="submit" className="bg-black text-white p-3 my-2 hover:bg-gray-900 hover:cursor-pointer">Send Message</button>
                        </form>
                    </div>
                    <div>
                        <div>
                            <h1 className="text-3xl font-quicksand">The Office</h1>
                            <ul className="my-2 leading-10">
                                <li><span className="font-bold">Address:</span> AudioPro Rentals, 123 Music Avenue, Colombo 07, Sri Lanka</li>
                                <li><span className="font-bold">Telephone:</span> +94 11 456 7890</li>
                                <li><span className="font-bold">Email:</span> support@audiopro.lk</li>
                            </ul>
                        </div>
                        <hr className="w-full text-gray-400"/>
                        <div>
                            <h1 className="text-3xl font-quicksand">Business Hours</h1>
                            <p className="my-2 leading-8">
                                <span className="block">Mon - Fri: 9:00 AM - 6:00 PM</span>
                                <span className="block">Saturday: 10:00 AM - 4:00 PM</span>
                                <span className="block">Sunday: Closed</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center my-5 text-lg flex items-center m-1">
                    <hr className="w-[40%] text-gray-400"/>
                    <Link to="/items" className="hover:cursor-pointer hover:text-gray-700 mx-3">Browser our products</Link>
                    <hr className="w-[45%] text-gray-400"/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Contact