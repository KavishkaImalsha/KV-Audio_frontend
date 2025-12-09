import { useEffect, useState } from "react"
import { Routes, Route, NavLink, Navigate } from "react-router-dom"
import BackendApi from "../../../api/BackendApi"
import toast from "react-hot-toast"
import GridLoader from "react-spinners/GridLoader"
import { Package, Clock, CheckCircle, TrendingUp } from "lucide-react"
import PendingBookings from "./booking page components/PendingBookings"
import ConfirmedBookings from "./booking page components/ConfirmedBookings"

const Bookings = () => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [pendingOrders, setPendingOrders] = useState([])
    const [confirmedOrders, setConfirmedOrders] = useState([])
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    useEffect(() => {
        fetchOrders()
    }, [refreshTrigger])

    useEffect(() => {
        const pendings = orders.filter((order) => (!order.isApproval))
        const confirmed = orders.filter((order) => (order.isApproval))
        
        setPendingOrders(pendings)
        setConfirmedOrders(confirmed)
        setLoading(false)
    }, [orders])
    
    const fetchOrders = async() => {
        try{
            const ordersResponse = await BackendApi.get('/orders')
            if(ordersResponse.status === 200){
                setOrders(ordersResponse.data.orders)
            } else {
                toast.error("Something went wrong")
            }
        } catch(error){
            toast.error("Failed to fetch orders")
        }
    }

    const getTabStyle = (isActive) => `
        flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all duration-200
        ${isActive 
            ? "border-blue-600 text-blue-600 bg-blue-50/50" 
            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
    `;

    if (loading) return (
        <div className="h-[80vh] flex items-center justify-center">
            <GridLoader color="#2563eb" />
        </div>
    )

    return(
        <div className="p-6 max-w-7xl mx-auto font-quicksand">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Booking Management</h1>
                <p className="text-gray-500 mt-1">Manage and track all customer orders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Package size={24}/></div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800">{orders.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><Clock size={24}/></div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Pending</p>
                        <h3 className="text-2xl font-bold text-gray-800">{pendingOrders.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={24}/></div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Confirmed</p>
                        <h3 className="text-2xl font-bold text-gray-800">{confirmedOrders.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp size={24}/></div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Total Value</p>
                        <h3 className="text-2xl font-bold text-gray-800">Rs:{totalRevenue.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-t-xl border-b border-gray-200 flex mb-0">
                <NavLink to={'/admin/bookings/pendingOrders'} className={({isActive}) => getTabStyle(isActive)}>
                    <Clock size={16}/> Pending Orders
                    <span className="ml-2 bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full">{pendingOrders.length}</span>
                </NavLink>
                <NavLink to={'/admin/bookings/confirmedOrders'} className={({isActive}) => getTabStyle(isActive)}>
                    <CheckCircle size={16}/> Confirmed Orders
                    <span className="ml-2 bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full">{confirmedOrders.length}</span>
                </NavLink>
            </div>

            <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0 min-h-[400px]">
                <Routes>
                    <Route index element={<Navigate to={'pendingOrders'} replace/>}/>
                    <Route path='/pendingOrders' element={<PendingBookings orders={pendingOrders} refreshTrigger={setRefreshTrigger}/>}/>
                    <Route path="/confirmedOrders" element={<ConfirmedBookings orders={confirmedOrders} refreshTrigger={setRefreshTrigger}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Bookings