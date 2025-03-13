import { Link } from "react-router-dom"
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { BsSpeakerFill } from "react-icons/bs"
import { IoBookmarksOutline } from "react-icons/io5"
import { PiUsersThreeFill } from "react-icons/pi";


const AdminSideBar = () => {
    return(
        <>
            <aside id="default-sidebar" class="fixed left-0 z-40 w-[250px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link to={"#"} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <TbLayoutDashboardFilled className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span class="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BsSpeakerFill className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span class="flex-1 ms-3 whitespace-nowrap">Items</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IoBookmarksOutline className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span class="flex-1 ms-3 whitespace-nowrap">Bookings</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <PiUsersThreeFill className="text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"/>
                            <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default AdminSideBar