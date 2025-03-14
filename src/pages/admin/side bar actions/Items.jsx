import { IoAddCircleSharp } from "react-icons/io5"
import { useEffect, useState } from "react"
import AddItemModel from "../../../components/admin/AddItemModel"
import axios from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import GridLoader from "react-spinners/GridLoader"
import Swal from 'sweetalert2'

const Items = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [itemDetails, setItemDetails] = useState({productId: "", name: "", price: 0, category: "", dimension: "", discription: "", availability: "", quantity: "", image: [null]})
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [itemsLoading, setItemsLoading] = useState(false)
    
    useEffect(() => {
        if(!itemsLoading){
            fetchAllProducts()
        }
    }, [itemsLoading])

    const fetchAllProducts = async() => {
        await axios.get('http://localhost:3000/api/products', {
            headers: {
                Authorization:'Bearer ' + token
            }
        }).then((response) => {
            setProducts(response.data)
            setItemsLoading(true)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }

    const deleteItem = (itemId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/api/products/${itemId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    toast.success(response.data.message)
                    setItemsLoading(false)
                }).catch((error) => {
                    toast.error(error.response.data.message)
                })
            }
          })
    }
    

    const handelSubmit = async(event) => {
        event.preventDefault()
        await axios.post('http://localhost:3000/api/products', itemDetails, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            toast.success(response.data.message)
            setIsModalVisible(false)
            setItemsLoading(false)
            navigate('/admin/items')
        }).catch((error) => {
            toast.error(error.response.data.error)
        })
    }
    
    return(
    <>
        <div className={`w-full h-full relative`}>
            <button onClick={() => {setIsModalVisible(true)}}>
                <IoAddCircleSharp className="text-7xl text-blue-600 fixed right-4 bottom-4 hover:text-blue-700 hover:cursor-pointer"/>
            </button>
            {isModalVisible && <AddItemModel showModel={setIsModalVisible} setItem={setItemDetails} submitForm={handelSubmit}/>}
            {itemsLoading ? (
                <div class="shadow-md sm:rounded-lg w-full">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Unit Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                dimension
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Availability
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            return(
                                <tr key={index} class="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.productId}
                                    </th>
                                    <td class="px-6 py-4">
                                        {product.name}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.category}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.dimension}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.discription}
                                    </td>
                                    <td class={`px-6 py-4 ${product.availability ? "text-green-600" : "text-red-600"}`}>
                                        {product.availability ? "Yes" : "No"}
                                    </td>
                                    <td class="px-6 py-4">
                                        {product.quantity}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="hover:cursor-pointer font-medium text-blue-600 hover:underline">Edit</button>|
                                        <button onClick={() => {deleteItem(product._id)}} class="hover:cursor-pointer font-medium text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            ) : (<div className="flex justify-center"><GridLoader color="#2563eb" /></div>)}
        </div>
    </>
 )
}
export default Items