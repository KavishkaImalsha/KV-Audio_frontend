import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900 font-quicksand">
            <div className="max-w-7xl mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">AUDIO<span className="text-blue-600">PRO</span></h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Sri Lanka's premier audio equipment rental service. We provide professional sound systems for weddings, concerts, and corporate events.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-blue-500 hover:pl-2 transition-all duration-300">Home</Link></li>
                            <li><Link to="/items" className="hover:text-blue-500 hover:pl-2 transition-all duration-300">Browse Items</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-500 hover:pl-2 transition-all duration-300">Terms & Conditions</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-500 hover:pl-2 transition-all duration-300">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex gap-3 items-start">
                                <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                                <span>123 Music Avenue,<br/>Colombo 07, Sri Lanka</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone size={20} className="text-blue-600 flex-shrink-0" />
                                <span>+94 77 123 4567</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone size={20} className="text-blue-600 flex-shrink-0" />
                                <span>+94 11 456 7890</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail size={20} className="text-blue-600 flex-shrink-0" />
                                <span>support@audiopro.lk</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6">Business Hours</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex gap-3 items-start">
                                <Clock size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-white font-semibold">Mon - Fri</p>
                                    <p>9:00 AM - 6:00 PM</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <Clock size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-white font-semibold">Saturday</p>
                                    <p>10:00 AM - 4:00 PM</p>
                                </div>
                            </li>
                            <li className="mt-4 pt-4 border-t border-gray-800">
                                <span className="text-red-500 font-semibold">Sunday: Closed</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 text-center md:text-left">
                        &copy; {currentYear} AudioPro Rentals. All rights reserved.
                    </p>
                    
                    <div className="flex gap-4 items-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                        <img className="h-8" src="https://www.svgrepo.com/show/328121/mastercard.svg" alt="Mastercard"/>
                        <img className="h-8" src="https://www.svgrepo.com/show/328127/visa.svg" alt="Visa"/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;