import { useEffect, useState } from "react"
import customApi from "../../api/BackendApi"
import {toast} from "react-hot-toast"
import GridLoader from "react-spinners/GridLoader"
import OrderOverview from "./OrderOverview"

const Orders = () => {
    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState()

    useEffect(() => {
        getOrders()
    },[])

    const getOrders = async() => {
        try{
            const orderRes = await customApi.get('/orders')
            if(orderRes.status === 200){
                setOrders(orderRes.data.orders)
                setLoading(false)
            }
        }catch(error){
            toast.error("Error occured!")
            return
        }
    }
    return(<>
        <div className="bg-gray-100 min-h-screen pt-20">
            <div className="bg-white w-[85%] m-auto h-full py-2">
                <h1 className="text-3xl font-bold text-gray-800 px-5">Orders History</h1>
                <h2 className="px-5 text-gray-500 ">Check the status of recent orders and manage orders</h2>
                {loading ? <div className="flex items-center justify-center"><GridLoader color="#2563eb"/></div> : !orders ? <div>No orders placed</div>
                :
                    <OrderOverview orders={orders}/>
                }
            </div>
        </div>
    </>)
}

export default Orders