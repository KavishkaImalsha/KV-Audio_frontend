import { useEffect, useState } from "react"
import CartTable from "../../components/tables/CartTable"
import backendApi from "../../api/BackendApi"
import {toast} from 'react-toastify'
import GridLoader from "react-spinners/GridLoader"
import {Link} from "react-router-dom"

const Cart = () => {
    const [cartItems, setCartItems] = useState(null)
    const [cartItemsDetails, setCartItemsDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [noOfDays, setNoOfDays] = useState(1)
    const [subTotal, setSubTotal] = useState(0)
    
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
    return(
        <>
        <div className="bg-gray-100 h-full">
            <div className="bg-white w-[85%] m-auto h-full">
                <h1 className="font-bold text-3xl p-5">Shopping Cart</h1>
                {!cartItems ? <div>Nothing to show</div> : 
                    <div>
                        <div className="p-5">
                            <p className="text-gray-600 font-sans">You have {cartItems.products.length} products in your cart</p>
                        </div>
                        {loading ? <div className="flex items-center justify-center"><GridLoader color="#2563eb"/></div> : <CartTable products={cartItemsDetails} cartItems={cartItems} setCartItems={setCartItems} setSubTotal={setSubTotal}/>}

                        <div className="my-5 flex justify-end mx-5 gap-2">
                            <div>
                                <label className="font-semibold mx-2">From: </label>
                                <input type="date" name="fromDate" value={cartItems.startingDate ? cartItems.startingDate : ""} onChange={(event) => {changeDate(event)}}/>
                            </div>

                            <div>
                                <label className="font-semibold mx-2">To: </label>
                                <input type="date" name="toDate"  value={cartItems.endingDate ? cartItems.endingDate : ""} onChange={(event) => {changeDate(event)}}/>
                            </div>
                        </div>

                        <div className="flex m-5 flex-col items-end">
                            <p className="text-xl font-semibold">Sub Total: {subTotal.toFixed(2)}</p>
                            <p className="text-gray-500">For {noOfDays} days (Excl. Tax and delivery charges)</p>
                        </div>
                        
                        <div className="flex flex-row-reverse items-end m-5">
                            <button type="button" class="inline-block w-50 px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center hover:cursor-pointer">Book Now</button>
                            <Link to="../items" className="my-auto mx-10 hover:underline font-semibold text-lg">Continue Order</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
        </>
    )
}

export default Cart