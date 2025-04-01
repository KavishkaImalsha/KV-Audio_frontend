import { useEffect, useState } from "react"
import BackendApi from '../api/BackendApi.jsx'
import toast from "react-hot-toast"
import GridLoader from "react-spinners/GridLoader"
import ProductCard from "../components/cards/ProductCard.jsx"
const Items = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        await BackendApi.get('/products').then((response) => {
            if(response.status == 200){
                setProducts(response.data)
                setLoading(false)
                return
            }
            toast.error(response.data?.message || "Internal server error")
        }).catch((error) => {

            toast.error(error?.response?.data?.message || "Error occured")
        }) 
    }
    
    return(
        <>
        {loading ? (<div className="flex justify-center items-center"><GridLoader color="#2563eb" /></div>) : (
            <div className="w-full overflow-hidden">
            <div className="bg-[url('item-page-banner-image.jpeg')] bg-no-repeat bg-cover bg-center h-[400px]"></div>
            <div className="bg-gray-300 rounded-sm border-gray-500 max-w-[90%] mx-auto grid grid-cols-3 gap-y-3 p-3 gap-5">
                    <ProductCard products={products}/>
            </div>
        </div>
        )}
            
        </>
    ) 
}

export default Items