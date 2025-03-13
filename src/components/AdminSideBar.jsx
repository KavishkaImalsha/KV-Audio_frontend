import { Link } from "react-router-dom"
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { BsSpeakerFill } from "react-icons/bs"
import { IoBookmarksOutline } from "react-icons/io5"
import { PiUsersThreeFill } from "react-icons/pi"


const AdminSideBar = () => {
    return(
        <>
            <div id="default-sidebar" className="w-[250px]" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/admin/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <TbLayoutDashboardFilled className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/items" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BsSpeakerFill className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Items</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/bookings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IoBookmarksOutline className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Bookings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <PiUsersThreeFill className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminSideBar