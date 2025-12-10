import { Link, useNavigate } from "react-router-dom"
import profilePic from "../../assets/profilePic.jpg"
import { useContext, useEffect, useRef, useState } from "react"
import { ShoppingCart, User, Package, LayoutDashboard , LogOut, ChevronDown } from "lucide-react"
import CartContext from "../../context/CartContext.jsx"

const NavFeatures = ({ firstName, role }) => {
    const [showModel, setShowModel] = useState(false)
    const { cartCount } = useContext(CartContext)
    const navigate = useNavigate()
    const modelRef = useRef(null)

    useEffect(() => {
        const handleClickedOutside = (event) => {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                setShowModel(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickedOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickedOutside)
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login'); 
        window.location.reload();
    }

    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "U";

    return (
        <div className="relative flex items-center gap-6" ref={modelRef}>
            {role === "customer" && (
                <Link to="/cart" className="relative group text-gray-300 hover:text-white transition-colors">
                    <ShoppingCart size={24} />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                        {cartCount}
                    </span>
                </Link>
            )}

            <button 
                onClick={() => setShowModel(!showModel)}
                className="flex items-center gap-2 group focus:outline-none"
            >
                <div className="hidden lg:block text-right mx-3">
                    <p className="text-xs text-gray-400 font-medium">Hello,</p>
                    <p className="text-sm text-white font-bold font-quicksand group-hover:text-blue-500 transition-colors">
                        {firstName}
                    </p>
                </div>

                <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-600 transition-all">
                        {profilePic ? (
                            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                {getInitials(firstName)}
                            </div>
                        )}
                    </div>
                </div>
                
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${showModel ? "rotate-180" : ""}`}/>
            </button>

            {showModel && (
                <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 animate-fadeIn origin-top-right z-50 text-gray-800">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{firstName}</p>
                        <p className="text-xs text-gray-500 capitalize">{role} Account</p>
                    </div>

                    <div className="py-2">
                        {role === 'customer' && (
                            <Link 
                                to="/user/orders" 
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={() => setShowModel(false)}
                            >
                                <Package size={18} />
                                My Orders
                            </Link>
                        )}

                        {role === 'admin' && (
                            <Link 
                                to="/admin/dashboard" 
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={() => setShowModel(false)}
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                        )}
                        
                        <Link 
                            to="/user/profile" 
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setShowModel(false)}
                        >
                            <User size={18} />
                            My Profile
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavFeatures