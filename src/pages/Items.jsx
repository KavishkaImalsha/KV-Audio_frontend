import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import GridLoader from "react-spinners/GridLoader"
import ProductCard from "../components/cards/ProductCard.jsx"
import ItemOverviewModal from "../components/ItemOverviewModel.jsx"
const Items = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null)
    console.log(selectedItemId);
    

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        await axios.get('http://localhost:3000/api/products').then((response) => {
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
        {isVisible && <ItemOverviewModal setIsVisible={setIsVisible} selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}/>}
        {loading ? (<div className="flex justify-center items-center"><GridLoader color="#2563eb" /></div>) : (
            <div className="w-full overflow-hidden">
            <div className="bg-[url('item-page-banner-image.jpeg')] bg-no-repeat bg-cover bg-center h-[400px]"></div>
            <div className="bg-gray-100 rounded-sm border-gray-500 max-w-[90%] mx-auto grid grid-cols-3 gap-y-3 p-3 gap-5">
                    <ProductCard products={products} setIsVisible={setIsVisible} setSelectedItemId={setSelectedItemId}/>
            </div>
        </div>
        )}
            
        </>
    ) 
}

export default Items