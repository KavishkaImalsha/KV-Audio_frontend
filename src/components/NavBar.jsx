import { useEffect, useState } from "react"
import { NavLink,Link, useNavigate } from "react-router-dom";
import NavFeatures from "./NavBarParts/NavFeatures"
import { Menu, X } from "lucide-react"

const NavBar = () => {
    const [isLoged, setIsLoged] = useState(false)
    const [user, setUser] = useState({ firstName: "", role: "" })
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const firstName = localStorage.getItem('firstName')
            const role = localStorage.getItem('role')
            setIsLoged(true)
            setUser({ firstName: firstName, role: role })
        }
    }, [])

    
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/items", label: "Items" },
        { path: "/gallery", label: "Gallery" },
        { path: "/contact", label: "Contact" },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
                        onClick={() => {navigate('/')}}
                    >
                        <img src="company_logo.png" alt="Logo" className="w-[150px] h-[150px] object-contain" />
                        <span className="text-white font-bold text-xl font-quicksand tracking-wider hidden sm:block">
                            AUDIO<span className="text-blue-600">SHOP</span>
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8 font-quicksand">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                                            isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            <span 
                                                className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${
                                                    isActive ? "w-full" : "w-0 group-hover:w-full"
                                                }`}
                                            ></span>
                                        </>
                                    )}
                                </NavLink>
                            ))}

                        </div>
                    </div>

                    <div className="hidden md:block">
                        {isLoged ? (
                            <NavFeatures firstName={user.firstName} role={user.role} />
                        ) : (
                            <Link 
                                to="/login" 
                                className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/items" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Items</Link>
                        <Link to="/gallery" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Gallery</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
                        
                        <div className="mt-4 w-full flex justify-center border-t border-gray-700 pt-4">
                            {isLoged ? (
                                <NavFeatures firstName={user.firstName} role={user.role} />
                            ) : (
                                <Link to="/login" className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar