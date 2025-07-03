import { useEffect, useState } from "react"
import customApi from "../../api/BackendApi"
import {toast} from "react-hot-toast"
import GridLoader from "react-spinners/GridLoader"
import Product from "../../../../Audio Shop Project Backend/model/Product"
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
        <div className="bg-gray-100 h-full">
            <div className="bg-white w-[85%] m-auto h-full">
                <h1 className="font-bold text-3xl px-5 pt-5">Orders History</h1>
                <h2 className="px-5 text-gray-400 ">Check the status of recent orders and manage orders</h2>
                {loading ? <div className="flex items-center justify-center"><GridLoader color="#2563eb"/></div> : !orders ? <div>No orders placed</div>
                :
                    <OrderOverview orders={orders}/>
                }
            </div>
        </div>
    </>)
}

export default Orders