import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import handleInputData from "../actions/handleInputData"
import BackendApi from "../api/BackendApi"
import toast from "react-hot-toast"
import Footer from "../components/Footer"
import MapLocation from "../components/map/MapLocation"
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react"

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const sendMessage = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            const token = localStorage.getItem("token")

            if (token) {
                const inquiryRes = await BackendApi.post("/inquiries", formData)
                toast.success(inquiryRes.data.message)
                navigate('/items')
            } else {
                toast.error("Please login to send a message")
                navigate('/login')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen font-quicksand">
            <div className="w-full h-[400px] shadow-md relative z-0">
                <MapLocation />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-10 pt-[300px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
                        <p className="text-gray-500 mb-8">Have a question about our gear? Send us a message.</p>

                        <form onSubmit={sendMessage} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                    <input 
                                        onChange={(e) => handleInputData(e, setFormData)} 
                                        type="text" name="name" 
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                                        placeholder="John Doe"
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                                    <input 
                                        onChange={(e) => handleInputData(e, setFormData)} 
                                        type="email" name="email" 
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                                        placeholder="john@example.com"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                                    <input 
                                        onChange={(e) => handleInputData(e, setFormData)} 
                                        type="number" name="phone" 
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none" 
                                        placeholder="077 123 4567"
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                    <div className="relative">
                                        <select 
                                            onChange={(e) => handleInputData(e, setFormData)} 
                                            name="subject" 
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none"
                                        >
                                            <option>Select Subject</option>
                                            <option>General Support</option>
                                            <option>Technical Support</option>
                                            <option>Sales Inquiry</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea 
                                    onChange={(e) => handleInputData(e, setFormData)} 
                                    name="message" 
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none h-40 resize-none" 
                                    placeholder="How can we help you?"
                                    required 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                            >
                                {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
                            </button>
                        </form>
                    </div>


                    <div className="flex flex-col gap-6 lg:mt-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-5">
                            <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Our Office</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    AudioPro Rentals, <br/>
                                    123 Music Avenue, <br/>
                                    Colombo 07, Sri Lanka
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-5">
                            <div className="bg-green-50 p-3 rounded-full text-green-600">
                                <Phone size={28} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Info</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone size={18} className="text-gray-400"/>
                                        <span>+94 11 456 7890</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail size={18} className="text-gray-400"/>
                                        <span>support@audiopro.lk</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-5">
                            <div className="bg-orange-50 p-3 rounded-full text-orange-600">
                                <Clock size={28} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3>
                                <div className="space-y-2 mt-3 text-sm">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Monday - Friday</span>
                                        <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Saturday</span>
                                        <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                        <span className="text-gray-600">Sunday</span>
                                        <span className="font-bold text-red-500">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-16 bg-blue-600 rounded-2xl p-10 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Not sure what you need?</h2>
                        <p className="mb-6 text-blue-100">Browse our extensive catalog of premium audio equipment.</p>
                        <Link 
                            to="/items" 
                            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            Browse Products <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white opacity-10 rounded-full"></div>
                </div>

            </div>
            
            <Footer />
        </div>
    )
}

export default Contact