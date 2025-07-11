import { useEffect, useState } from "react"
import BackendApi from "../../../api/BackendApi"
import toast from "react-hot-toast"
import GridLoader from "react-spinners/GridLoader"
import { Link, Routes, Route, NavLink, Navigate } from "react-router-dom"
import PendingBookings from "./booking page components/PendingBookings"
import ConfirmedBookings from "./booking page components/ConfirmedBookings"

const Bookings = () => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [pendingOrders, setPendingOrders] = useState([])
    const [confirmedOrders, setConfirmedOrders] = useState([])

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
                return
            }
            toast.error("Somthing went Wrong")
        }catch(error){
            toast.error("Somthing went Wrong")
        }
    }
    return(<>
        <h1 className="font-bold text-2xl m-3">Booking Details</h1>
        <div className="text-lg my-8">
            <NavLink to={'/admin/bookings/pendingOrders'} className={({isActive}) => (
                `p-2 mx-3 ${isActive ?  "bg-blue-600 text-white rounded-lg font-semibold" : "text-black"}`
            )}>Pending Orders
            </NavLink>
            <NavLink to={'/admin/bookings/confirmedOrders'} className={({isActive}) => (
                `p-2 mx-3 ${isActive ?  "bg-blue-600 text-white rounded-lg font-semibold" : "text-black"}`
            )}>Confirmed Orders
            </NavLink>
        </div>

        {loading ? (<div className="flex justify-center"><GridLoader color="#2563eb" /></div>) : 
        (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                <table className="table-auto w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-2 py-2">Order Id</th>
                        <th scope="col" className="px-2 py-2">Order Items</th>
                        <th scope="col" className="px-2 py-2">Customer Email</th>
                        <th scope="col" className="px-2 py-2">Total Price</th>
                        <th scope="col" className="px-2 py-2">Action</th>
                        </tr>
                    </thead>
                    <Routes>
                        <Route index element={<Navigate to={'pendingOrders'} replace/>}/>
                        <Route path='/pendingOrders' element={<PendingBookings orders={pendingOrders} refreshTrigger={setRefreshTrigger}/>}/>
                        <Route path="/confirmedOrders" element={<ConfirmedBookings orders={confirmedOrders}/>}/>
                    </Routes>
                </table>
            </div>
        )}
    </>)
}

export default Bookings