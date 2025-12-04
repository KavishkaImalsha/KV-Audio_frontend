import { useContext, useEffect, useState } from "react"
import CartTable from "../../components/tables/CartTable"
import backendApi from "../../api/BackendApi"
import {toast} from 'react-hot-toast'
import GridLoader from "react-spinners/GridLoader"
import {Link, useNavigate} from "react-router-dom"
import BackendApi from "../../api/BackendApi"
import emptyCartImg from "../../../public/empty_cart.png"
import CartContext from "../../context/CartContext"

const Cart = () => {
    const [cartItems, setCartItems] = useState(null)
    const [cartItemsDetails, setCartItemsDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [noOfDays, setNoOfDays] = useState(1)
    const [subTotal, setSubTotal] = useState(0)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const { removeAllFormCart } = useContext(CartContext)
    
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            setCartItems(cart)
        }
    }, [])

    useEffect(() => {
        if(cartItems && cartItemsDetails.length === 0){
            getCartItemsDetails()
        }
        if(cartItems?.startingDate && cartItems?.endingDate){
            setFromDate(cartItems.startingDate)
            setToDate(cartItems.endingDate)
        }
        
    }, [cartItems])

    useEffect(() => {
        if(fromDate && toDate){
            const start = new Date(fromDate)
            const end = new Date(toDate)

            const differentInTime = end - start
            const differentInDays = Math.ceil(differentInTime / (1000 * 60 * 60 * 24)) + 1

            if(differentInDays <= 0){
                toast.error("Enter valid dates")
                return
            }

            setNoOfDays(differentInDays)
            const updateCart = {
                ...cartItems,
                startingDate: fromDate,
                endingDate: toDate,
                days: differentInDays
            }
            setCartItems(updateCart)
            localStorage.setItem('cart', JSON.stringify(updateCart))
        }
    }, [fromDate, toDate])

    // const getOrders = async() => {
    //     try{
    //         const orderRes = await BackendApi.get("/orders")
    //         console.log(orderRes.data);
            
    //     }catch(error){
    //         console.log(error);
            
    //     }
    // }

    const getCartItemsDetails = async() => {
        setLoading(true)
        try{
            const productDetailsPromises = cartItems.products.map(async (itemDetails) => {
                const response = await backendApi.get(`/products/${itemDetails.productId}`)
                if (response.status === 200) {
                    return response.data
                }else{
                    toast.error("No product available")
                    return null
                }
            })
            const result = await Promise.all(productDetailsPromises)
            const filteredItems = result.filter((item) => (item != null))
            setCartItemsDetails(filteredItems)
        }catch(error){
            toast.error("Fail to get cart items details")
        }finally{
            setLoading(false)
        }
    }
    
    const changeDate = (event) => {
        if(event.target.name === 'fromDate'){
            setFromDate(event.target.value)
        }else if(event.target.name === 'toDate'){
            setToDate(event.target.value)
        }
    }

    const placeOrder = async (event) => {
        event.preventDefault()

        try{
            if(cartItems.startingDate === null || cartItems.endingDate === null){
                toast.error("Please enter order dates")
                return
            }

            await BackendApi.post('/orders', cartItems).then((response) => {
                removeAllFormCart()
                toast.success(response.data.message)
                navigate("/user/orders")
                return
            }).catch((error) => {
                toast.error("Order not placed")
                return
            })

        }catch(error){
            toast.error("Error occured! Place order again")
            return
        }
        
    }
    return(
        <>
        <div className="bg-gray-100 h-screen">
            <div className="bg-white w-[85%] m-auto h-full">
                <div>
                    <h1 className="font-bold text-3xl p-5">Shopping Cart</h1>
                    {!cartItems ? <div>
                        <div>
                            <img src={emptyCartImg} className="m-auto w-[300px] h-[300px]"/>
                            <div>
                                <p className="text-center text-2xl font-semibold mt-3">Your cart is empty</p>
                                <p className="text-lg text-center px-85 text-gray-500 font-semibold ">Look like you have not added anything to your cart.Go ahead & explore top products</p>
                                <div className="flex justify-center">
                                    {orders && <Link to="/user/orders" className="text-center hover:underline hover:text-blue-400 py-4">View Orders</Link>}
                            </div>
                                </div>
                        </div>
                    </div> : 
                        <div>
                            <div className="p-5">
                                <p className="text-gray-600 font-sans">You have {cartItems.products.length} products in your cart</p>
                            </div>
                            {loading ? <div className="flex items-center justify-center"><GridLoader color="#2563eb"/></div> : <CartTable products={cartItemsDetails} cartItems={cartItems} setCartItems={setCartItems} setSubTotal={setSubTotal}/>}

                            <form className="my-5 flex flex-col items-end mx-5 gap-2" onSubmit={(event) => {placeOrder(event)}}>
                                <div className="flex flex-row">
                                    <div>
                                        <label className="font-semibold mx-2">From: </label>
                                        <input type="date" name="fromDate" value={cartItems?.startingDate} onChange={(event) => {changeDate(event)}}/>
                                    </div>

                                    <div>
                                        <label className="font-semibold mx-2">To: </label>
                                        <input type="date" name="toDate"  value={cartItems?.endingDate} onChange={(event) => {changeDate(event)}}/>
                                    </div>
                                </div>
                                <div className="flex my-3 flex-col items-end">
                                    <p className="text-xl font-semibold">Sub Total: {subTotal.toFixed(2)}</p>
                                    <p className="text-gray-500">For {noOfDays} days (Excl. Tax and delivery charges)</p>
                                </div>
                            
                                <div className="flex flex-row-reverse items-end my-3">
                                    <button type="submit" class="inline-block w-50 px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center hover:cursor-pointer">Book Now</button>
                                    <Link to="../items" className="my-auto mx-10 hover:underline font-semibold text-lg">Continue Order</Link>
                                </div>
                            </form>
                        </div>
                    }
                    </div>
            </div>
        </div>
        </>
    )
}

export default Cart