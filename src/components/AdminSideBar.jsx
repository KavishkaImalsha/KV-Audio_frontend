import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Speaker, CalendarCheck, Users, LogOut, Settings } from "lucide-react";

const AdminSideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Define links in an array for cleaner code
    const menuItems = [
        { path: "/admin/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/admin/items", name: "Inventory", icon: <Speaker size={20} /> },
        { path: "/admin/bookings", name: "Bookings", icon: <CalendarCheck size={20} /> },
        { path: "/admin/users", name: "Customers", icon: <Users size={20} /> },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-100 font-quicksand flex flex-col justify-between shadow-xl shadow-blue-900/5">
            
            {/* 1. BRAND LOGO SECTION */}
            <div>
                <div className="h-20 flex items-center px-8 border-b border-gray-50">
                    <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                        AUDIO<span className="text-blue-600">PRO</span>
                        <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">ADMIN</span>
                    </h1>
                </div>

                {/* 2. NAVIGATION LINKS */}
                <div className="px-4 py-6 space-y-1">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
                    
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                                ${isActive 
                                    ? "bg-blue-50 text-blue-600 shadow-sm" 
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <span className={`${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                                    {item.icon}
                                </span>
                                {item.name}
                                
                                {/* Active Indicator Dot */}
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* 3. FOOTER / LOGOUT SECTION */}
            <div className="p-4 border-t border-gray-50">
                <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}

export default AdminSideBar;