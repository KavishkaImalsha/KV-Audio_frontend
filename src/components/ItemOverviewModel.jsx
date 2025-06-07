import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GridLoader from "react-spinners/GridLoader"
import { addToCart } from "../actions/CartActions";

const ItemOverviewModal = ({setIsVisible, selectedItemId, setSelectedItemId}) => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState({quantity: 1})
    const [error, setError] = useState(false)
    const [selectedImage, setSelectedImage] = useState(0)
    
    useEffect(() => {
        fetchItemDetails()
    },[selectedItemId])
    

    const fetchItemDetails = async() => {
        try{
            const productResponse = await axios.get(`http://localhost:3000/api/products/${selectedItemId}`)

            if(productResponse.status != 200){
                setError(true)
                toast.error("Somthing went wrong")
            }

            setProduct(productResponse.data)
            
            setLoading(false)
        }catch(error){
            setError(true)
            toast.error(error)
        }
        
    }

    const changeInput = (event) => {
        setOrderDetails((prevState) => (
            {...prevState, [event.target.id] : event.target.value}
        ))
        
    }
    
    return (
        <>
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg"
                    >
                {loading ? (<div className="flex justify-center items-center"><GridLoader color="#2563eb" /></div>) : (
                    <div>
                        {/* Modal Content */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[95vh] p-6">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                                <h3 className="text-3xl pl-2 font-semibold text-gray-900 dark:text-white">
                                    {product.name}
                                </h3>
                                <button 
                                    onClick={() => {
                                        setIsVisible(false)
                                        setSelectedItemId(null)
                                        setLoading(true)
                                        setProduct(null)
                                    }} 
                                    className="text-gray-500 hover:bg-gray-200 rounded-lg p-2 dark:hover:bg-gray-700"
                                >
                                    ✖
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="max-h-[85vh] overflow-y-auto flex">
                                <div className="max-w-[40%]">
                                    <div className="m-1 max-w-full h-[290px] border-1 border-gray-200 rounded bg-cover bg-no-repeat bg-center flex justify-center items-center">
                                        <img src={product.image[selectedImage]} className="rounded"/>
                                    </div>

                                    <div className="grid grid-cols-5">
                                        {product.image.map((url, index) => (
                                            <div key={index} className="m-2  max-h-[300px] border-1 border-gray-200 rounded bg-cover bg-no-repeat bg-center flex justify-center items-center">
                                                <img src={url} onClick={() => {setSelectedImage(index)}} className="hover:cursor-pointer rounded"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="max-w-[60%]">
                                    <div className="w-full pl-5 h-[85%] overflow-y-auto">
                                        <ul>
                                            <li className="text-lg font-semibold pt-2">Status: <span className={`${product.availability ? "text-green-500 bg-green-200 border-0 rounded" : "text-red-500 bg-red-200 border-0 rounded"} p-1`}>{product.availability ? "Available" : "Out of stock"}</span></li>
                                            <li><span className="text-lg font-semibold">Dimension: </span>{product.dimension}</li>
                                            {/* <li><span className="text-lg font-semibold">No. Days:</span><input id="days" className="ml-6 border border-gray-300 rounded pl-3 w-12" type="number" value={orderDetails.days} onChange={(event) => {changeInput(event)}}></input></li> */}
                                            <li><span className="text-lg font-semibold">Quantity:</span><input id="quantity" className="ml-6 border border-gray-300 rounded pl-3 w-12" type="number" value={orderDetails.quantity} onChange={(event) => {changeInput(event)}}></input></li>
                                            <li className={`text-2xl font-semibold ${product.availability ? "text-green-500" : "text-red-500"}`}>Rs: {parseFloat(product.price).toFixed(2)} <span className="text-black text-lg">/day</span></li>
                                        </ul>
                                        <div>
                                            <h1 className="text-center border-b-1 border-b-gray-200 text-xl">Discription</h1>
                                            <p className="p-3 font-medium">{product.discription}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-3">
                                        <button className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[200px] hover:cursor-pointer" onClick={() => {addToCart(selectedItemId, orderDetails.quantity)}}>Add Cart</button>
                                        <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[200px] hover:cursor-pointer">Order Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
        </>
    );
}

export default ItemOverviewModal;
